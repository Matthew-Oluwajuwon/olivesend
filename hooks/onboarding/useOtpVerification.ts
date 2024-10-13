import { AppPayload } from "@/models/application/payload";
import { API } from "@/models/client/response";
import { useMutateUnsecureDataMutation } from "@/store/api.config";
import { endpoints } from "@/store/endpoints";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAuthState } from "@/store/slice";
import { router } from "expo-router";
import { FormikErrors, FormikTouched, useFormik } from "formik";
import { useCallback } from "react";
import * as Yup from "yup";
import useToast from "../useToast";

// Type definition for the OTP verification form state and handlers
export interface EmailVerificationFunction {
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  errors: FormikErrors<{ otp: string }>;
  disabled?: boolean;
  values: {
    otp: string;
  };
  touched: FormikTouched<{
    otp: string;
  }>;
  setFieldTouched: (
    field: string,
    touched?: boolean,
    shouldValidate?: boolean
  ) => Promise<void> | Promise<FormikErrors<{ otp: string }>>;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

// Custom hook for OTP verification
const useOtpVerification = (): EmailVerificationFunction => {
  const dispatch = useAppDispatch(); // Access Redux dispatch function to update global state
  const state = useAppSelector((state) => state.auth); // Get auth state from Redux store
  const [verifyOtp, response] = useMutateUnsecureDataMutation(); // Custom hook to send API request for OTP verification
  const { showToast } = useToast(); // Custom hook to show toast notifications
  const validationSchema = Yup.object().shape({
    otp: Yup.string().min(6, "OTP must be more than six characters").required("OTP is required"), // Validation schema for OTP field
  });

  // Callback function to handle OTP verification when the form is submitted
  const onVerifyOtp = useCallback(async () => {
    try {
      // API call to verify OTP with the server
      const response: any = await verifyOtp({
        postUrl: endpoints.auth.otpVerification, // Endpoint to send OTP verification request
        formMethod: "POST", // Use POST method for submitting the form data
        request: {
          ...values, // Spread form values (otp)
          email: state.verifyEmailRequest.email, // Include the email from the Redux state
        },
      });

      // Extract the response from the API call
      const apiResponse: API<{ token: string }> = response.error?.data || response.data;

      // Check if the API response was successful
      if (apiResponse.responseCode === "00") {
        showToast("success", apiResponse.responseMessage, "OTP verification successful");

        // Update the auth state in Redux with the received token
        dispatch(setAuthState(new AppPayload("token", apiResponse.data?.token as string)));

        resetForm(); // Reset the form after successful submission
        router.navigate("/(onboarding)/createPassword"); // Navigate to the create password page
      } else {
        // If the response is unsuccessful, show an error toast with the message
        showToast("error", "Error occured", apiResponse.message || "An unknown error occurred");
      }
    } catch (error: any) {
      // If an error occurs during the request, show a generic error toast
      showToast("error", "Error occurred", error.message || "An unknown error occurred");
    }
  }, [showToast, verifyOtp, dispatch, state.verifyEmailRequest.email]); // Dependencies for the useCallback hook

  // Formik hook for managing form state and validation
  const {
    handleChange,
    errors,
    values,
    touched,
    setFieldTouched,
    resetForm,
    handleSubmit,
    isValid,
  } = useFormik({
    initialValues: {
      otp: "", // Initial OTP value is an empty string
    },
    onSubmit: onVerifyOtp, // Submit handler for the form
    validationSchema, // Apply the validation schema for OTP field
    validateOnMount: true, // Validate the form when it's mounted
  });

  return {
    handleChange, // Function to handle input changes
    setFieldTouched, // Function to set the touched state of fields
    handleSubmit, // Function to handle form submission
    touched, // Formik touched object (tracks which fields were interacted with)
    errors, // Formik errors object (holds validation errors for the fields)
    values, // Formik values object (holds current values of the form fields)
    disabled: !isValid, // Disable the form submission button if the form is not valid
    loading: response.isLoading, // Show loading state based on the API request status
  };
};

export default useOtpVerification; // Export the custom hook for use in other components
