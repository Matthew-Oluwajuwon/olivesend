import { FormikErrors, FormikTouched, useFormik } from "formik";
import * as Yup from "yup";

export interface PersonalDetailsFunction {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  errors: FormikErrors<{
    firstName: string;
    middleName: string;
    lastName: string;
    country: {
      countryFlag: string;
      name: string;
    };
    address: string;
    phoneNumber: string;
  }>;
  disabled?: boolean;
  values: {
    firstName: string;
    middleName: string;
    lastName: string;
    country: {
      countryFlag: string;
      name: string;
    };
    address: string;
    phoneNumber: string;
  };
  touched: FormikTouched<{
    firstName: string;
    middleName: string;
    lastName: string;
    country: {
      countryFlag: string;
      name: string;
    };
    address: string;
    phoneNumber: string;
  }>;
  setFieldTouched: (
    field: string,
    touched?: boolean,
    shouldValidate?: boolean
  ) =>
    | Promise<void>
    | Promise<
        FormikErrors<{
          firstName: string;
          middleName: string;
          lastName: string;
          country: {
            countryFlag: string;
            name: string;
          };
          address: string;
          phoneNumber: string;
        }>
      >;
}

const usePersonalDetails = (): PersonalDetailsFunction => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[^0-9]*$/, "First name must not contain numbers")
      .min(2, "First name must be at least 2 characters")
      .required("First name is required"),
    middleName: Yup.string().matches(/^[^0-9]*$/, "Middle name must not contain numbers"),
    lastName: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .matches(/^[^0-9]*$/, "Last name must not contain numbers")
      .required("Last name is required"),
    country: Yup.object()
      .shape({
        image: Yup.string().required("Country image is required"),
        name: Yup.string().required("Country label is required"),
      })
      .required("Country is required"),
    address: Yup.string()
      .min(5, "Address must be at least 5 characters")
      .required("Address is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must contain only numbers")
      .min(9)
      .max(11)
      .required("Phone number is required"),
  });
  const { handleChange, errors, values, touched, setFieldTouched, handleSubmit, isValid } =
    useFormik({
      initialValues: {
        firstName: "",
        middleName: "",
        lastName: "",
        phoneNumber: "",
        country: {
          id: 0,
          name: "",
          countryCode: "",
          countryFlag: "",
          countryPhoneLength: 0,
          shortCode: "",
          currency: "",
          currencySymbol: "",
        },
        address: "",
        email: "",
      },
      onSubmit: () => {},
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

export default usePersonalDetails;
