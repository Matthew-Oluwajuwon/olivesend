import { router } from "expo-router";
import { FormikErrors, FormikTouched, useFormik } from "formik";
import * as Yup from "yup";

export interface EmailVerificationFunction {
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  errors: FormikErrors<{ email: string }>;
  disabled?: boolean;
  values: {
    email: string;
  };
  touched: FormikTouched<{
    email: string;
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
        }>
      >;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
}

const useSendEmailVerification = (): EmailVerificationFunction => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address") // Checks if the email is valid
      .required("Email is required"), // Ensures the email is not empty
  });
  const { handleChange, errors, values, touched, setFieldTouched, handleSubmit, isValid } =
    useFormik({
      initialValues: {
        email: "",
      },
      onSubmit: () => router.replace("/(onboarding)/otpVerification"),
      validationSchema,
      validateOnMount: true,
    });

  return {
    handleChange,
    setFieldTouched,
    handleSubmit,
    touched,
    errors,
    values,
    disabled: !isValid,
  };
};

export default useSendEmailVerification;
