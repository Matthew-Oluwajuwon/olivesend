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
import { Auth } from "@/models/application/state";

export interface PasswordFunction {
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  errors: FormikErrors<{ password: string; confirmPassword: string }>;
  disabled?: boolean;
  values: {
    password: string;
    confirmPassword: string;
  };
  touched: FormikTouched<{
    password: string;
    confirmPassword: string;
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
          confirmPassword: string;
        }>
      >;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  state: Auth;
}

const useResetPassword = (): PasswordFunction => {
  const dispatch = useAppDispatch(); // Access Redux dispatch function to update global state
  const state = useAppSelector((state) => state.auth); // Get auth state from Redux store
  const [resetPassword, response] = useMutateUnsecureDataMutation(); // Custom hook to send API request for OTP verification
  const { showToast } = useToast(); // Custom hook to show toast notifications
  const { setPasswordField } = useAuthQuery();

  // Callback function to handle OTP verification when the form is submitted
  const onCreatePassword = useCallback(async () => {
    try {
      // API call to verify OTP with the server
      const response: any = await resetPassword({
        postUrl: endpoints.forgotPassword.resetPassword, // Endpoint to send OTP verification request
        formMethod: "POST", // Use POST method for submitting the form data
        request: values,
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });

      // Extract the response from the API call
      const apiResponse: API<boolean> = response.error?.data || response.data;

      // Check if the API response was successful
      if (apiResponse.responseCode === "00") {
        showToast("success", apiResponse.responseMessage, "OTP verification successful");

        resetForm(); // Reset the form after successful submission

        dispatch(setAuthState(new AppPayload("showSuccessOnboarding", true)));
      } else {
        // If the response is unsuccessful, show an error toast with the message
        showToast(
          "error",
          "Error occured",
          apiResponse.message || apiResponse.responseMessage || "An unknown error occurred"
        );
      }
    } catch (error: any) {
      // If an error occurs during the request, show a generic error toast
      showToast("error", "Error occurred", error.message || "An unknown error occurred");
    }
  }, [showToast, resetPassword, dispatch]); // Dependencies for the useCallback hook

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, " ")
      .max(20, " ")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&.#^()-])[A-Za-z\d@$!%*?&.#^()-]{8,}$/, " "),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null as any], "Passwords do not match")
      .required("Confirm password is required"),
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
      confirmPassword: "",
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
    loading: response.isLoading,
    state,
  };
};

export default useResetPassword;
