// Import necessary modules and hooks
import { API } from "@/models/client/response"; // API response interface
import { useMutateUnsecureDataMutation } from "@/store/api.config"; // Hook to handle mutation requests
import { endpoints } from "@/store/endpoints"; // API endpoint configuration
import { router } from "expo-router"; // Router for navigation between screens
import { FormikErrors, FormikTouched, useFormik } from "formik"; // Formik hooks for form state management
import { useCallback } from "react"; // Hook for memoizing functions
import * as Yup from "yup"; // Validation library for form inputs
import useToast from "../useToast"; // Custom hook to display toast messages
import { useAppDispatch } from "@/store/hooks"; // Redux dispatch hook
import { setAuthState } from "@/store/slice"; // Action to update authentication state in Redux store
import { AppPayload } from "@/models/application/payload"; // Application-specific payload model

// Interface for the email verification form handling functions and state
export interface EmailVerificationFunction {
  handleChange: {
    (e: React.ChangeEvent<any>): void; // Handles form input change event
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any>
      ? void // If the parameter is an event, return void
      : (e: string | React.ChangeEvent<any>) => void; // Otherwise, return a function to handle string or event
  };
  errors: FormikErrors<{ email: string }>; // Form validation errors for email
  disabled?: boolean; // If true, disables the form submit button
  values: { email: string }; // Form values containing email
  touched: FormikTouched<{ email: string }>; // Tracks whether form fields have been touched
  setFieldTouched: (
    field: string, // The field to mark as touched
    touched?: boolean, // Indicates whether the field is touched or not
    shouldValidate?: boolean // Whether to trigger validation when setting touched
  ) => Promise<void> | Promise<FormikErrors<{ email: string }>>; // Marks a field as touched
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void; // Handles form submission
  loading: boolean; // Tracks loading state for form submission
}

// Custom hook to handle email verification functionality
const useSendEmailVerification = (): EmailVerificationFunction => {
  const dispatch = useAppDispatch(); // Get Redux dispatch function to update global state
  const [sendMail, response] = useMutateUnsecureDataMutation(); // Hook to send unsecure data (API request)
  const { showToast } = useToast(); // Custom hook to display toast messages

  // Validation schema for the email field using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string() // Define validation for email field
      .email("Invalid email address") // Checks if the email is in a valid format
      .required("Email is required"), // Ensures the email field is not empty
  });

  // Function to send verification email when the form is submitted
  const onSendMail = useCallback(async () => {
    try {
      // API call to send email verification
      const response: any = await sendMail({
        postUrl: endpoints.auth.verifyMail, // Endpoint to send email verification
        formMethod: "POST", // HTTP method (POST)
        request: values, // The form values (email)
      });

      // Handle the API response and display relevant messages
      const apiResponse: API<any> = response.error?.data || response.data; // Get the response data
      if (apiResponse.responseCode === "00") {
        // If the response code is "00", show success toast and navigate to the OTP verification screen
        showToast("success", apiResponse.responseMessage, "Mail sent successfully");
        // Dispatch an action to update auth state in Redux (mark email verification as requested)
        dispatch(setAuthState(new AppPayload("verifyEmailRequest", { email: values.email })));
        resetForm(); // Reset the form after successful submission
        router.navigate("/(onboarding)/otpVerification"); // Navigate to OTP verification screen
      } else {
        // If the response code is not "00", show an error toast with the response message
        showToast("error", "Error occured", apiResponse.message || apiResponse.responseMessage || "An unknown error occured");
      }
    } catch (error: any) {
      // If an error occurs during the request, show a generic error toast
      showToast("error", "Error occured", error.message || "An unknown error occured");
    }
  }, [showToast, sendMail, dispatch]); // Depend on showToast, sendMail, dispatch

  // Formik hook to manage form state, validation, and submission
  const {
    handleChange,
    errors,
    values,
    touched,
    setFieldTouched,
    handleSubmit,
    resetForm,
    isValid,
  } = useFormik({
    initialValues: {
      email: "", // Initial value for the email field
    },
    onSubmit: onSendMail, // Form submission handler
    validationSchema, // Form validation schema
    validateOnMount: true, // Validate the form as soon as it's mounted
  });

  // Return the necessary values and functions for handling the form state and submission
  return {
    handleChange, // Function to handle input change
    setFieldTouched, // Function to mark a field as touched
    handleSubmit, // Function to handle form submission
    touched, // Tracks touched fields
    errors, // Tracks validation errors
    values, // Form values
    disabled: !isValid, // Disable submit button if form is invalid
    loading: response.isLoading, // Loading state for the API request
  };
};

export default useSendEmailVerification; // Export the custom hook
