import { View, Text, Image } from "react-native";
import React, { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
import WebView from "react-native-webview";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Loader from "@/components/Loader";
import { useMutateDataMutation } from "@/store/api.config";
import { endpoints } from "@/store/endpoints";
import { API, InitiatingPaymentResponse, TransactionReceipt } from "@/models/client/response";
import { setSendState } from "@/store/slice";
import { AppPayload } from "@/models/application/payload";
import { InitiateFundTransfer } from "@/models/client/request";
import { router } from "expo-router";
import ResponseScreen from "@/components/ResponseScreen";
import Flower from "@/components/Flower";
import Button from "@/components/Button";

const PaymentWebview = () => {
  const dispatch = useAppDispatch();
  const [showResponseScreen, setShowResponseScreen] = useState(false);
  const [confirmTransaction, result] = useMutateDataMutation();
  const [loading, setLoading] = useState(false);
  //   const [progress, setProgress] = useState(0);
  const state = useAppSelector((state) => {
    return state.send;
  });
  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleLoadProgress = ({ nativeEvent }: any) => {
    if (nativeEvent.progress === 1) {
      setLoading(false);
      //   setProgress(nativeEvent.progress);
    }
  };
  const handleNavigationStateChange = useCallback(
    async (navState: any) => {
      const { url } = navState;

      if (
        url.includes("status/success") ||
        url.includes("status/failure") ||
        url.includes("cancel")
      ) {
        setTimeout(async () => {
          const response: any = await confirmTransaction({
            postUrl: endpoints.transaction.confirmTransaction,
            formMethod: "POST",
            request: {
              reference: state.paymentInitiationResponse.transactionReference,
            },
          });
          const apiResponse: API<TransactionReceipt> = response.error?.data || response.data;

          dispatch(setSendState(new AppPayload("receipt", apiResponse?.data)));
          dispatch(
            setSendState(new AppPayload("initiateFundTransfer", new InitiateFundTransfer()))
          );
          dispatch(
            setSendState(
              new AppPayload("paymentInitiationResponse", new InitiatingPaymentResponse())
            )
          );
          setShowResponseScreen(true);
        }, 1000);
      }
    },
    [dispatch, state.paymentInitiationResponse.transactionReference]
  );

  if (showResponseScreen) {
    return (
      <View className="flex-1 px-5 items-center justify-center relative dark:bg-primary-dark">
        <Image source={require("@/assets/images/success-check.png")} />
        <Text className="font-InterBold text-2xl dark:text-white">Card payment inititated</Text>
        <Text className={`font-InterRegular mt-3 text-sm text-[#888888]`}>
          Your payment has been initiated successfully
        </Text>
        <Button type="primary" className="absolute bottom-7 w-full" onPress={() => router.push("/(protected)/receipt")}>
          View status
        </Button>
        <Flower />
      </View>
    );
  }

  return (
    <View className="px-5 flex-1">
      <StatusBar style="dark" />
      {(loading && !state.paymentInitiationResponse?.paymentURL) || result.isLoading ? (
        <Loader message="Processing, please wait..." />
      ) : (
        <WebView
          style={{ flex: 1 }}
          source={{ uri: state.paymentInitiationResponse?.paymentURL }}
          onNavigationStateChange={handleNavigationStateChange}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onLoadProgress={handleLoadProgress}
        />
      )}
    </View>
  );
};

export default PaymentWebview;
