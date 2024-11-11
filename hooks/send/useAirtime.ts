import { useEffect } from "react";
import { FormikErrors, FormikTouched, useFormik } from "formik";
import * as Yup from "yup";
import { SelectProps } from "@/components/Select";
import { useGetDataQuery } from "@/store/api.config";
import { endpoints } from "@/store/endpoints";
import { NetworkOptions, CountryOperator } from "@/app/(tabs)/(airtime)";
import { TransactingCountries } from "@/models/client/response";
import { router } from "expo-router";
import useInitiateFundTransfer from "./useInitiateFundTransfer";

// Define the interface for the custom hook's return values
interface AirtimeReturn {
  values: {
    amount: number;
    operatorId: string;
    countryCode: string | number;
    beneficiaryPhoneNumber: string;
    billId: string;
    billProviderId: string;
  };
  touched: FormikTouched<{
    amount: number;
    operatorId: string;
    countryCode: string | number;
    beneficiaryPhoneNumber: string;
    billId: string;
    billProviderId: string;
  }>;
  errors: FormikErrors<{
    amount: number;
    operatorId: string;
    countryCode: string | number;
    beneficiaryPhoneNumber: string;
    billId: string;
    billProviderId: string;
  }>;
  isValid: boolean;
  networkLoading: boolean;
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
          amount: number;
          operatorId: string;
          countryCode: string | number;
          beneficiaryPhoneNumber: string;
          billId: string;
          billProviderId: string;
        }>
      >;
  handleSubmit: () => void;
  isFetching: boolean;
  isLoading: boolean;
  options: SelectProps["options"];
  networkOptions: NetworkOptions[];
  code: string | undefined;
  onSelectNetwork: (operatorId: string | number) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) =>
    | Promise<void>
    | Promise<
        FormikErrors<{
          amount: number;
          operatorId: string;
          countryCode: string | number;
          beneficiaryPhoneNumber: string;
          billId: string;
          billProviderId: string;
        }>
      >;
}

export const useAirtime = (): AirtimeReturn => {
  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .typeError("Amount must be a number") // Ensures the input is a number
      .required("Amount is required").min(1, "Amount limit is $1")
      .max(500, "Amount cannot exceed $500"),
    operatorId: Yup.string().required("Network is required"),
    billProviderId: Yup.string().required("Network is required"),
    billId: Yup.string().required("Network is required"),
    countryCode: Yup.string().required("Country is required"),
    beneficiaryPhoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must contain only numbers") // Validate phone number
      .min(9, "Invalid phone number") // Minimum length for phone number
      .max(11, "Invalid phone number") // Maximum length for phone number
      .required("Phone number is required"), // Phone number is required
  });

  const { onInitiateAirtime } = useInitiateFundTransfer();

  // Query to get transacting countries
  const { data, isFetching, isLoading } = useGetDataQuery({
    getUrl: endpoints.transaction.getCountries,
  });

  // Map the fetched data (countries) to the options for a dropdown select
  const options: SelectProps["options"] = Array.isArray(data)
    ? data.map((item: TransactingCountries) => ({
        label: item.name,
        image: item.flag,
        value: item.shortName,
        code: item.code,
      }))
    : [];


  // Initialize useFormik with validation schema and initial values
  const {
    values,
    touched,
    errors,
    isValid,
    handleChange,
    setFieldValue,
    handleSubmit,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      amount: 0,
      operatorId: "",
      countryCode: options[0]?.value || "",
      beneficiaryPhoneNumber: "",
      billId: "",
      billProviderId: "",
    },
    onSubmit: (values) => {
      onInitiateAirtime({
        fundSource: "",
        transferPurpose: "",
        channel: "mobile",
        countryCode: values.countryCode as string,
        amount: values.amount,
        billId: values.billId,
        beneficiaryPhoneNumber: values.beneficiaryPhoneNumber,
        billProviderId: values.billProviderId,
        operatorId: values.operatorId
      });
      router.navigate({
        pathname: "/(protected)/transactionConfirmation",
        params: {type: "AIRTIME"}
      });
    },
    validateOnMount: true,
    validationSchema,
  });

  // Query to get network providers based on selected country code
  const network = useGetDataQuery({
    getUrl:
      endpoints.transaction.getNetworkProviders +
      (values.countryCode || (options[0]?.value as string)),
  });

  // Map the fetched network data to dropdown options
  const networkOptions: NetworkOptions[] = Array.isArray(network.data?.country_operators)
    ? network.data?.country_operators?.map((x: CountryOperator) => ({
        label: x.name,
        image: x.logo,
        value: x.operator_id,
        billProviderId: x.biller_id,
        billId: x.bill_id,
      }))
    : [];

  // Function to handle selecting a network operator
  const onSelectNetwork = (operatorId: string | number) => {
    const selectedNetwork = networkOptions.find((x) => x.value === operatorId);
    if (selectedNetwork) {
      setFieldValue("operatorId", operatorId);
      setFieldValue("billProviderId", selectedNetwork.billProviderId);
      setFieldValue("billId", selectedNetwork.billId);
    }
  };

  // Effect to update billProviderId and billId when operatorId changes
  useEffect(() => {
    if (values.operatorId) {
      const selectedNetwork = networkOptions.find((x) => x.value === values.operatorId);
      if (selectedNetwork) {
        setFieldValue("billProviderId", selectedNetwork.billProviderId);
        setFieldValue("billId", selectedNetwork.billId);
      }
    }
  }, [values.operatorId, setFieldValue]);

  // Effect to set the initial network operator
  useEffect(() => {
    if (networkOptions.length > 0) {
      setFieldValue("operatorId", networkOptions[0].value);
    }
  }, [setFieldValue, networkOptions.length]);

  // Find the country code based on the selected country code value
  const code = options.find((x) => x.value === values.countryCode)?.code;

  // Return the necessary values and functions for the component
  return {
    values,
    touched,
    errors,
    isValid,
    handleChange,
    handleSubmit,
    isFetching,
    isLoading,
    options,
    networkOptions,
    code,
    onSelectNetwork,
    setFieldTouched,
    setFieldValue,
    networkLoading: network.isLoading || network.isFetching,
  };
};