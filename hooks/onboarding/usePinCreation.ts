import { AppPayload } from "@/models/application/payload";
import { useMutateUnsecureDataMutation } from "@/store/api.config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAuthState } from "@/store/slice";
import { router } from "expo-router";
import { useCallback } from "react";
import useToast from "../useToast";
import { endpoints } from "@/store/endpoints";
import { API, LoginResponse } from "@/models/client/response";
import { Auth } from "@/models/application/state";

interface PinCreationFunction {
  onContinue: (value: string) => void;
  onCreatePin: (value: string) => Promise<void>;
  loading: boolean;
  state: Auth
}

const usePinCreation = (): PinCreationFunction => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => {
    return state.auth;
  });

  // Mutation hook to update the user's profile details
  const [createPin, response] = useMutateUnsecureDataMutation();

  const { showToast } = useToast(); // Custom hook to show toast notifications

  // Callback function to handle form submission and update the profile
  const onCreatePin = useCallback(
    async (value: string) => {
      try {
        // Make an API call to update the profile details
        const response: any = await createPin({
          postUrl: endpoints.auth.createPin, // API endpoint to update profile details
          formMethod: "POST", // HTTP method (POST)
          request: { ...state.pinRequest, confirmPin: value }, // Form values and user's email
          headers: {
            Authorization: `Bearer ${state.token}`, // Authorization header with the user's token
          },
        });

        // Get the API response data
        const apiResponse: API<LoginResponse> = response.error?.data || response.data;

        // If the response code indicates success
        if (apiResponse.responseCode === "00") {
          // Show success toast and reset the form
          showToast("success", apiResponse.responseMessage, "PIN created successfully");

          dispatch(setAuthState(new AppPayload("showSuccessOnboarding", true)));
        } else {
          // Show error toast with the response message
          showToast(
            "error",
            "Error occurred",
            apiResponse.message || apiResponse.responseMessage || "An unknown error occurred"
          );
        }
      } catch (error: any) {
        // Show error toast if an exception occurs
        showToast("error", "Error occurred", error.message || "An unknown error occurred");
      }
    },
    [showToast, createPin, dispatch]
  ); // Memoized callback, dependencies: showToast, updateProfile, dispatch

  const onContinue = useCallback(
    (value: string) => {
      dispatch(setAuthState(new AppPayload("pinRequest", { ...state.pinRequest, pin: value })));
      router.navigate("/(onboarding)/confirmPIN");
    },
    [dispatch]
  );

  return {
    onContinue,
    onCreatePin,
    loading: response.isLoading,
    state
  };
};

export default usePinCreation;
