import { useMutateUnsecureDataMutation } from "@/store/api.config"; // API hook to perform mutation on unsecured data (e.g., login)
import { useAppDispatch, useAppSelector } from "@/store/hooks"; // Hooks to access Redux store dispatch and state
import { FormikErrors, FormikTouched, useFormik } from "formik"; // Formik utilities for form management
import * as Yup from "yup"; // Validation schema library
import useToast from "./useToast"; // Custom hook for displaying toast notifications
import { useCallback } from "react"; // React hook to memoize functions
import { endpoints } from "@/store/endpoints"; // API endpoints configuration
import { router } from "expo-router"; // Expo router for screen navigation
import { AppPayload } from "@/models/application/payload"; // Custom model for payload management in the app
import { API, LoginResponse } from "@/models/client/response"; // API response models
import { setAuthState } from "@/store/slice"; // Redux action to set authentication state

// Interface defining the structure of the LoginFunction
export interface LoginFunction {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void; // Handles form submission
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void; // Handles form input changes
  };
  errors: FormikErrors<{ email: string; password: string }>; // Holds form validation errors
  disabled?: boolean; // Disables the form submission if validation fails
  values: {
    email: string;
    password: string; // Holds current form values
  };
  touched: FormikTouched<{
    email: string;
    password: string; // Tracks if form fields have been touched
  }>;
  setFieldTouched: (
    field: string,
    touched?: boolean,
    shouldValidate?: boolean
  ) =>
    | Promise<void>
    | Promise<
        FormikErrors<{
          email: string;
          password: string;
        }>
      >; // Function to manually set the touched state of a form field
  loading: boolean; // this is true when API is still making a request
}

// useLogin: Custom hook for managing login form behavior
const useLogin = (): LoginFunction => {
  const dispatch = useAppDispatch(); // Get Redux dispatch function to update global state
  const state = useAppSelector((state) => {
    return state.auth; // Access the authentication state from Redux store
  });

  const [login, response] = useMutateUnsecureDataMutation(); // Hook to make the login API call
  const { showToast } = useToast(); // Custom hook to show toast notifications

  // Callback function to handle the login process when the form is submitted
  const onLogin = useCallback(async () => {
    try {
      // Make an API call to login
      const response: any = await login({
        postUrl: endpoints.auth.login, // The login API endpoint
        formMethod: "POST", // The HTTP method (POST)
        request: { ...values, type: state.loginType }, // The form data (email, password, login type)
      });

      // Extract the API response data
      const apiResponse: API<LoginResponse> = response.error?.data || response.data;

      // If login is successful, handle redirection and state updates
      if (apiResponse.responseCode === "00") {
        showToast("success", apiResponse.responseMessage, "Login successful"); // Show success toast

        // Dispatch the authentication state to Redux store
        dispatch(setAuthState(new AppPayload("loginResponse", apiResponse.data)));
        dispatch(setAuthState(new AppPayload("token", apiResponse.data?.token)));
        dispatch(setAuthState(new AppPayload("verifyEmailRequest", { email: values.email })));
        resetForm(); // Reset the form fields

        // Check if the user has completed their profile, documents, and PIN setup
        if (!apiResponse.data?.isProfileCompleted) {
          return router.navigate("/(onboarding)/personalDetails"); // Navigate to personal details screen
        }
        if (!apiResponse.data?.isDocumentUploaded) {
          return router.navigate("/(onboarding)/identityVerification"); // Navigate to identity verification screen
        }
        if (!apiResponse.data?.isPinCreated) {
          return router.navigate("/(onboarding)/createPIN"); // Navigate to PIN creation screen
        }
      } else {
        // If login fails, show an error toast
        showToast(
          "error",
          "Error occurred",
          apiResponse.message || apiResponse.responseMessage || "An unknown error occurred"
        );
      }
    } catch (error: any) {
      // Handle any unexpected errors and show a generic error toast
      showToast("error", "Error occurred", error.message || "An unknown error occurred");
    }
  }, [showToast, login, dispatch]); // Memoize the callback and include dependencies

  // Validation schema for the login form fields using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address") // Ensure the email is a valid format
      .required("Email is required"), // Ensure the email field is not empty

    password: Yup.string().required("Password is required"), // Ensure the password field is not empty
  });

  // Initialize formik for form management (handling state, validation, etc.)
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
      email: "",
      password: "", // Initial form values
    },
    onSubmit: onLogin, // Form submission handler
    validationSchema, // Attach the validation schema
    validateOnMount: true, // Validate the form as soon as it mounts
  });

  // Return the necessary form utilities and values to the component using this hook
  return {
    handleChange, // Handle form input changes
    setFieldTouched, // Manually set the touched state for form fields
    handleSubmit, // Function to handle form submission
    touched, // Tracks if form fields have been touched
    errors, // Validation errors for form fields
    values, // Current form values
    disabled: !isValid, // Disable the form submit button if the form is invalid
    loading: response.isLoading,
  };
};

export default useLogin; // Export the useLogin hook for use in components
