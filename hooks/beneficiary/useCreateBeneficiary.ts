import { SelectProps } from "@/components/Select";
import { AppPayload } from "@/models/application/payload";
import { TransactingCountries } from "@/models/client/response";
import { useGetDataQuery } from "@/store/api.config";
import { endpoints } from "@/store/endpoints";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setBeneficiaryState } from "@/store/slice";
import { FormikErrors, FormikTouched, useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

// Define the interface for the return type of the custom hook
interface CreateBeneficiaryFunction {
  options: SelectProps["options"];
  deliveryMethod: "WALLET" | "BANK";
  institutionLoading: boolean;
  setDeliveryMethod: React.Dispatch<React.SetStateAction<"WALLET" | "BANK">>;
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
  isValid: boolean;
}

// Custom hook to create and manage beneficiary form
const useCreateBeneficiary = (): CreateBeneficiaryFunction => {
  const dispatch = useAppDispatch();

  // Fetch beneficiary-related state from the store
  const state = useAppSelector((state) => {
    return state.beneficiary;
  });

  // Query to get transacting countries
  const { data, isFetching, isLoading } = useGetDataQuery({
    getUrl: endpoints.transaction.getCountries,
  });

  // State for managing delivery method (WALLET or BANK)
  const [deliveryMethod, setDeliveryMethod] = useState<"WALLET" | "BANK">("WALLET");

  // Yup validation schema for form validation
  const validationSchema = Yup.object().shape({
    countryShortName: Yup.string().required("Country short name is required"),
    deliveryMethod: Yup.string()
      .oneOf(["WALLET", "BANK"], "Invalid delivery method")
      .required("Delivery method is required"),

    walletType:
      deliveryMethod === "WALLET"
        ? Yup.string().required("Wallet type is required")
        : Yup.string().nullable(),

    accountName:
      deliveryMethod === "BANK"
        ? Yup.string().required("Account name is required")
        : Yup.string().nullable(),
    accountNumber:
      deliveryMethod === "BANK"
        ? Yup.string().required("Account number is required")
        : Yup.string().nullable(),
    bankName:
      deliveryMethod === "BANK"
        ? Yup.object({}).required("Bank is required")
        : Yup.string().nullable(),
    walletAccountNumber:
      deliveryMethod === "WALLET"
        ? Yup.string().required("Wallet Number is required")
        : Yup.string().nullable(),
    walletAccountName:
      deliveryMethod === "WALLET"
        ? Yup.string().required("Wallet Name is required")
        : Yup.string().nullable(),
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
    resetForm,
    isValid,
  } = useFormik({
    initialValues: {
      countryShortName: "",
      walletType: "",
      bankName: "",
      accountNumber: "",
      accountName: "",
      walletAccountNumber: "",
      walletAccountName: "",
      deliveryMethod,
      bankProviderCode: "",
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
  const countryShortName = !values.countryShortName && options.length
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

  // Update the beneficiary state with banks and wallets from the fetched institutions
  useEffect(() => {
    dispatch(setBeneficiaryState(new AppPayload("banks", institutions?.banks || [])));
    dispatch(setBeneficiaryState(new AppPayload("disabled", !isValid)));
    dispatch(setBeneficiaryState(new AppPayload("wallets", institutions?.wallets || [])));
  }, [institutions, isValid]);

  // Update form fields when country short name or wallets change
  useEffect(() => {
    setFieldValue("countryShortName", countryShortName);
    setFieldValue("walletType", state.wallets[0]?.walletName);
  }, [countryShortName, state.wallets]);

  return {
    options, // Country options for the select dropdown
    loading: isFetching || isLoading, // Loading state for countries
    handleChange, // Handle form input changes
    setDeliveryMethod, // Update the delivery method (WALLET/BANK)
    setFieldTouched, // Mark fields as touched
    handleSubmit, // Submit form handler
    values, // Form values
    errors, // Form validation errors
    touched, // Fields that have been touched
    deliveryMethod, // Current delivery method (WALLET or BANK)
    institutionLoading: isFetchingInstitution || isLoadingIstitution, // Loading state for institutions
    isValid, // Disable form if not valid
  };
};

export default useCreateBeneficiary;
