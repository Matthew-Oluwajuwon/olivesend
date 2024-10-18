import { AppPayload } from "@/models/application/payload";
import { InitiateFundTransfer } from "@/models/client/request";
import { useMutateDataMutation } from "@/store/api.config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSendState } from "@/store/slice";
import { router } from "expo-router";
import { useCallback } from "react";
import useToast from "../useToast";
import { endpoints } from "@/store/endpoints";
import { API, InitiatingPaymentResponse } from "@/models/client/response";

const useInitiateFundTransfer = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => {
    return state.send;
  });
  const [makePayment, result] = useMutateDataMutation();
  const { showToast } = useToast();

  const onInitiateFundsTransfer = useCallback(
    (payload: InitiateFundTransfer) => {
      dispatch(
        setSendState(
          new AppPayload("initiateFundTransfer", {
            ...state.initiateFundTransfer,
            ...payload,
          })
        )
      );
    },
    [dispatch]
  );

  const onNavigatingToPaymentGateway = useCallback(
    async (data: Array<any>, request: InitiateFundTransfer) => {
      if (data.length > 0) {
        router.navigate("/(protected)/paymentMethods");
      } else {
        try {
          const response: any = await makePayment({
            postUrl: endpoints.transaction.initiateTransfer,
            formMethod: "POST",
            request: {
              beneficiaryId: request.beneficiaryId,
              amount: request.amount,
              transferPurpose: request.transferPurpose,
              fundSource: request.fundSource,
              channel: request.channel,
            },
          });
          const apiResponse: API<InitiatingPaymentResponse> = response.error?.data || response.data;

          if (apiResponse.responseCode === "00") {
            router.navigate("/(protected)/paymentWebview");
            dispatch(setSendState(new AppPayload("paymentInitiationResponse", apiResponse.data)));
          } else {
            // If the response code is not "00", show an error toast with the response message
            showToast(
              "error",
              "Error occured",
              apiResponse.message || apiResponse.responseMessage || "An unknown error occured"
            );
          }
        } catch (error: any) {
          // Show error toast if an error occurred during the verification request
          showToast("error", "Error occurred", error.message || "An unknown error occurred");
        }
      }
    },
    [showToast, dispatch]
  );

  return {
    onInitiateFundsTransfer,
    onNavigatingToPaymentGateway,
    loading: result.isLoading,
  };
};

export default useInitiateFundTransfer;
