import { router } from "expo-router";
import { FormikErrors, FormikTouched, useFormik } from "formik";
import * as Yup from "yup";
import { useAuthQuery } from "../useAuthQuery";

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
}

const useCreatePassword = (): PasswordFunction => {
  const { setPasswordField } = useAuthQuery();
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, " ")
      .max(20, " ")
      .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&.#^()-])[A-Za-z\d@$!%*?&.#^()-]{8,}$/, " "),
  });
  const { handleChange, errors, values, touched, setFieldTouched, handleSubmit, isValid } =
    useFormik({
      initialValues: {
        password: "",
      },
      onSubmit: () => router.navigate("/(onboarding)/personalDetails"),
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
  };
};

export default useCreatePassword;
