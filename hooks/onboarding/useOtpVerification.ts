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
  ) =>
    | Promise<void>
    | Promise<
        FormikErrors<{
            otp: string;
        }>
      >;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
}

const useOtpVerification = (): EmailVerificationFunction => {
  const validationSchema = Yup.object().shape({
    otp: Yup.string().min(6, "OTP must be more than six characters").required("OTP is required"), 
  });
  const { handleChange, errors, values, touched, setFieldTouched, handleSubmit, isValid } =
    useFormik({
      initialValues: {
        otp: "",
      },
      onSubmit: () => router.navigate("/(onboarding)/createPassword"),
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

export default useOtpVerification;
