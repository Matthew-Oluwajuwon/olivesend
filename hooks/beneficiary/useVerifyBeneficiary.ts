import { useAppDispatch, useAppSelector } from "@/store/hooks"; // Import hooks for accessing Redux state and dispatch
import useToast from "../useToast"; // Import custom hook for showing toast notifications
import { useMutateDataMutation } from "@/store/api.config"; // Import mutation hook for API requests
import { useCallback, useMemo } from "react"; // Import React hooks
import { endpoints } from "@/store/endpoints"; // Import API endpoint configurations
import { API } from "@/models/client/response"; // Import API response type
import { setBeneficiaryState } from "@/store/slice"; // Import action to update beneficiary state
import { AppPayload } from "@/models/application/payload"; // Import AppPayload type for dispatching actions
import { BeneficiaryRequest } from "@/models/client/request"; // Import BeneficiaryRequest type
import { router } from "expo-router"; // Import router to navigate between screens

const useVerifyBeneficiary = () => {
  const dispatch = useAppDispatch(); // Get dispatch function to trigger state updates
  const state = useAppSelector((state) => {
    return state.beneficiary; // Select the beneficiary state from Redux store
  });
  const { showToast } = useToast(); // Get showToast function for notifications
  const [verify, result] = useMutateDataMutation(); // Mutation hook for verifying beneficiary
  const [createBeneficiary, createBeneficiaryResult] = useMutateDataMutation(); // Mutation hook for creating beneficiary

  // Memoized function to get the provider code based on delivery method (Wallet or Bank)
  const providerCode = useCallback(() => {
    if (state.deliveryMethod === "WALLET") {
      return state.wallets.find((x) => x.walletName === state.request?.walletType)?.providerCode;
    } else {
      return state.banks.find((x) => x.bankName === state.request?.bankName)?.providerCode;
    }
  }, [state.deliveryMethod, state.request?.bankName, state.request?.walletType]);

  // Callback function to handle the verification process
  const onVerify = useCallback(async () => {
    try {
      // Perform the verification API call with the request data
      const response: any = await verify({
        postUrl: endpoints.beneficiary.verifyBeneficiary,
        formMethod: "POST",
        request: {
          beneficiary_type: state.request?.deliveryMethod,
          beneficiary_country: state.request?.countryShortName,
          beneficiary_institution_code: providerCode(),
          bank_branch_code: "", // No bank branch code provided
          account_number: state.request?.accountNumber || state.request?.walletAccountNumber,
          beneficiary_name: state.request?.accountName || state.request?.walletAccountName,
        },
      });

      // Extract the API response
      const apiResponse: API<any> = response.error?.data || response.data;

      // If verification is successful (responseCode "00")
      if (apiResponse.responseCode === "00") {
        try {
          // Create the beneficiary by calling the creation API
          const creationResponse: any = await createBeneficiary({
            postUrl: endpoints.beneficiary.createBeneficiary,
            formMethod: "POST",
            request: { ...state.request, bankProviderCode: providerCode() },
          });

          // Extract the creation response
          const dataResponse: API<any> = creationResponse.error?.data || creationResponse.data;

          // If creation is successful (responseCode "00")
          if (dataResponse.responseCode === "00") {
            // Show success toast
            showToast(
              "success",
              "Successful",
              "Successfully created beneficiary."
            );
            // Dispatch actions to reset the beneficiary state and navigate back
            dispatch(setBeneficiaryState(new AppPayload("deliveryMethod", "WALLET")));
            dispatch(setBeneficiaryState(new AppPayload("request", new BeneficiaryRequest())));
            router.back(); // Go back to the previous screen
          } else {
            // Show error toast if creation failed
            showToast(
              "error",
              "Error occurred",
              dataResponse.message || dataResponse.responseMessage || "An unknown error occurred"
            );
          }
        } catch (error: any) {
          // Show error toast if an error occurred during beneficiary creation
          showToast("error", "Error occurred", error.message || "An unknown error occurred");
        }
      } else {
        // Show error toast if verification failed
        showToast(
          "error",
          "Error occurred",
          apiResponse.message || apiResponse.responseMessage || "An unknown error occurred"
        );
      }
    } catch (error: any) {
      // Show error toast if an error occurred during the verification request
      showToast("error", "Error occurred", error.message || "An unknown error occurred");
    }
  }, [state.request, providerCode]);

  // Return verification function and loading states
  return {
    onVerify, // Function to trigger verification
    verifying: result.isLoading || createBeneficiaryResult.isLoading, // Boolean indicating if verification is in progress
  };
};

export default useVerifyBeneficiary; // Export the custom hook for use in components
