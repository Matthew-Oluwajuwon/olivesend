import { router } from "expo-router";
import { FormikErrors, FormikTouched, useFormik } from "formik";
import * as Yup from "yup";
import { useAuthQuery } from "../useAuthQuery";
import { useMutateUnsecureDataMutation } from "@/store/api.config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import useToast from "../useToast";
import { AppPayload } from "@/models/application/payload";
import { API } from "@/models/client/response";
import { endpoints } from "@/store/endpoints";
import { setAuthState } from "@/store/slice";
import { useCallback } from "react";

export interface PasswordFunction {
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  errors: FormikErrors<{ password: string }>;
  disabled?: boolean;
  values: {
    password: string;
  };
  touched: FormikTouched<{
    password: string;
  }>;
  setFieldTouched: (
    field: string,
    touched?: boolean,
    shouldValidate?: boolean
  ) =>
    | Promise<void>
    | Promise<
        FormikErrors<{
          password: string;
        }>
      >;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

const useCreatePassword = (): PasswordFunction => {
  const dispatch = useAppDispatch(); // Access Redux dispatch function to update global state
  const state = useAppSelector((state) => state.auth); // Get auth state from Redux store
  const [createPassword, response] = useMutateUnsecureDataMutation(); // Custom hook to send API request for OTP verification
  const { showToast } = useToast(); // Custom hook to show toast notifications
  const { setPasswordField } = useAuthQuery();

  // Callback function to handle OTP verification when the form is submitted
  const onCreatePassword = useCallback(async () => {
    try {
      // API call to verify OTP with the server
      const response: any = await createPassword({
        postUrl: endpoints.auth.createPassword, // Endpoint to send OTP verification request
        formMethod: "POST", // Use POST method for submitting the form data
        request: values,
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      })

      // Extract the response from the API call
      const apiResponse: API<boolean> = response.error?.data || response.data;

      // Check if the API response was successful
      if (apiResponse.responseCode === "00") {
        showToast("success", apiResponse.responseMessage, "OTP verification successful");

        resetForm(); // Reset the form after successful submission
        router.navigate("/(onboarding)/personalDetails"); // Navigate to the create password page
      } else {
        // If the response is unsuccessful, show an error toast with the message
        showToast("error", "Error occured", apiResponse.message || apiResponse.responseMessage || "An unknown error occurred");
      }
    } catch (error: any) {
      // If an error occurs during the request, show a generic error toast
      showToast("error", "Error occurred", error.message || "An unknown error occurred");
    }
  }, [showToast, createPassword, dispatch]); // Dependencies for the useCallback hook

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, " ")
      .max(20, " ")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&.#^()-])[A-Za-z\d@$!%*?&.#^()-]{8,}$/, " "),
  });
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
      password: "",
    },
    onSubmit: onCreatePassword,
    validationSchema,
    validateOnMount: true,
    validate: (e) => setPasswordField(e.password),
  });

  return {
    handleChange,
    setFieldTouched,
    handleSubmit,
    touched,
    errors,
    values,
    disabled: !isValid,
    loading: response.isLoading
  };
};

export default useCreatePassword;
