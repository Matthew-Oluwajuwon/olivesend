import { SelectProps } from "@/components/Select";
import { AppPayload } from "@/models/application/payload";
import { TransactingCountries } from "@/models/client/response";
import { useGetDataQuery } from "@/store/api.config";
import { endpoints } from "@/store/endpoints";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setBeneficiaryState } from "@/store/slice";
import { FormikErrors, FormikTouched, useFormik } from "formik";
import { useCallback, useEffect } from "react";
import * as Yup from "yup";
import useVerifyBeneficiary from "./useVerifyBeneficiary";

// Define the interface for the return type of the custom hook
interface CreateBeneficiaryFunction {
  onChangeDeliveryMethod: (method: "WALLET" | "BANK") => void;
  options: SelectProps["options"];
  institutionLoading: boolean;
  loading: boolean;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  setFieldTouched: (
    field: string,
    touched?: boolean,
    shouldValidate?: boolean
  ) =>
    | Promise<void>
    | Promise<
        FormikErrors<{
          countryShortName: string;
          walletType: string;
          bankName: string;
          accountNumber: string;
          accountName: string;
          walletAccountNumber: string;
          walletAccountName: string;
          deliveryMethod: "WALLET" | "BANK";
          bankProviderCode: string;
        }>
      >;
  errors: FormikErrors<{
    countryShortName: string;
    walletType: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
    walletAccountNumber: string;
    walletAccountName: string;
    deliveryMethod: "WALLET" | "BANK";
    bankProviderCode: string;
  }>;
  values: {
    countryShortName: string;
    walletType: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
    walletAccountNumber: string;
    walletAccountName: string;
    deliveryMethod: "WALLET" | "BANK";
    bankProviderCode: string;
  };
  touched: FormikTouched<{
    countryShortName: string;
    walletType: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
    walletAccountNumber: string;
    walletAccountName: string;
    deliveryMethod: "WALLET" | "BANK";
    bankProviderCode: string;
  }>;
}

// Custom hook to create and manage beneficiary form
const useBeneficiaryValidation = (): CreateBeneficiaryFunction => {
  const dispatch = useAppDispatch();

  // Fetch beneficiary-related state from the store
  const state = useAppSelector((state) => {
    return state.beneficiary;
  });

  // Query to get transacting countries
  const { data, isFetching, isLoading } = useGetDataQuery({
    getUrl: endpoints.transaction.getCountries,
  });

  // Yup validation schema for form validation
  const walletValidationSchema = Yup.object().shape({
    countryShortName: Yup.string().required("Country short name is required"),
    deliveryMethod: Yup.mixed()
      .oneOf(["WALLET", "BANK"], "Invalid delivery method")
      .required("Delivery method is required"),
    walletType: Yup.string().required("Wallet type is required"),
    walletAccountNumber: Yup.string().required("Wallet Number is required"),
    walletAccountName: Yup.string().required("Wallet Name is required"),
    bankProviderCode: Yup.string().nullable(),
  });
  const bankValidationSchema = Yup.object().shape({
    countryShortName: Yup.string().required("Country short name is required"),
    deliveryMethod: Yup.mixed()
      .oneOf(["WALLET", "BANK"], "Invalid delivery method")
      .required("Delivery method is required"),
    accountName: Yup.string().required("Account name is required"),
    accountNumber: Yup.string().required("Account number is required"),
    bankName: Yup.string().required("Bank is required"),
    bankProviderCode: Yup.string().nullable(),
  });

  const validationSchema = Yup.lazy((values) => {
    if (values.deliveryMethod === "BANK") {
      return bankValidationSchema;
    } else if (values.deliveryMethod === "WALLET") {
      return walletValidationSchema;
    }
    return Yup.object().shape({});
  });

  // Formik form management hook
  const {
    handleChange,
    errors,
    values,
    touched,
    setFieldTouched,
    handleSubmit,
    setFieldValue,
    validateForm,
    isValid,
  } = useFormik({
    initialValues: {
      countryShortName: "",
      bankName: "",
      accountNumber: "",
      accountName: "",
      deliveryMethod: state.deliveryMethod,
      bankProviderCode: "",
      walletType: "",
      walletAccountNumber: "",
      walletAccountName: "",
    },
    onSubmit: () => {}, // Placeholder for form submission handler
    validationSchema, // Validation schema for the form
    validateOnMount: true, // Validate form on mount
    validateOnChange: true
  });

  // Map the fetched data (countries) to the options for a dropdown select
  const options: SelectProps["options"] = Array.isArray(data)
    ? data.map((item: TransactingCountries) => ({
        label: item.name,
        image: item.flag,
        value: item.shortName,
      }))
    : [];

  // Determine the short name of the country based on form values
  const countryShortName =
    !values.countryShortName && options.length
      ? options[0].value
      : values.countryShortName === "USA"
      ? "US"
      : values.countryShortName;

  // Query to fetch institutions based on the selected country
  const {
    data: institutions,
    isFetching: isFetchingInstitution,
    isLoading: isLoadingIstitution,
    isError: isInstitutionError,
  } = useGetDataQuery({
    getUrl: endpoints.beneficiary.getInstitutions + `/${countryShortName}`,
  });

  const onChangeDeliveryMethod = useCallback(
    (method: "WALLET" | "BANK") => {
      dispatch(setBeneficiaryState(new AppPayload("deliveryMethod", method)));
    },
    [dispatch]
  );

  // Update the beneficiary state with banks and wallets from the fetched institutions
  useEffect(() => {
    dispatch(setBeneficiaryState(new AppPayload("banks", institutions?.banks || [])));
    dispatch(setBeneficiaryState(new AppPayload("disabled", !isValid)));
    dispatch(setBeneficiaryState(new AppPayload("request", values)));
    dispatch(setBeneficiaryState(new AppPayload("wallets", institutions?.wallets || [])));
  }, [institutions, isValid, values]);

  // Set country, bank, and wallet fields dynamically
  useEffect(() => {
    if (!values.countryShortName) {
      setFieldValue("countryShortName", countryShortName);
    }
    if (!values.walletType && state.wallets.length > 0) {
      setFieldValue("walletType", state.wallets[0]?.walletName);
    }
    if (!values.bankName && state.banks.length > 0) {
      setFieldValue("bankName", state.banks[0]?.bankName);
    }
    setFieldValue("deliveryMethod", state.deliveryMethod);
  }, [countryShortName, state.wallets, state.banks, state.deliveryMethod, setFieldValue]);

  // Validate form when delivery method changes
  useEffect(() => {
    validateForm();
  }, [values.deliveryMethod, validateForm]);

  return {
    onChangeDeliveryMethod,
    options, // Country options for the select dropdown
    loading: isFetching || isLoading, // Loading state for countries
    handleChange, // Handle form input changes
    setFieldTouched, // Mark fields as touched
    handleSubmit, // Submit form handler
    values, // Form values
    errors, // Form validation errors
    touched, // Fields that have been touched
    institutionLoading: isFetchingInstitution || isLoadingIstitution, // Loading state for institutions
  };
};

export default useBeneficiaryValidation;
