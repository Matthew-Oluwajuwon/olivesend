import { Auth } from "@/models/application/state";
import { API, Countries } from "@/models/client/response";
import { useGetUnsecureDataQuery, useMutateUnsecureDataMutation } from "@/store/api.config";
import { endpoints } from "@/store/endpoints";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { router } from "expo-router";
import { FormikErrors, FormikTouched, useFormik } from "formik";
import { useCallback } from "react";
import * as Yup from "yup";
import useToast from "../useToast";

// Interface to define the shape of the return object from the hook
export interface PersonalDetailsFunction {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void; // Function to handle form submission
  handleChange: {
    (e: React.ChangeEvent<any>): void; // Function to handle input changes
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  errors: FormikErrors<{
    firstName: string;
    middleName: string;
    lastName: string;
    country: string;
    address: string;
    phoneNumber: string;
  }>; // Object containing form validation errors
  disabled?: boolean; // Whether the form submit button should be disabled
  values: {
    firstName: string;
    middleName: string;
    lastName: string;
    country: string;
    address: string;
    phoneNumber: string;
  }; // Form field values
  touched: FormikTouched<{
    firstName: string;
    middleName: string;
    lastName: string;
    country: string;
    address: string;
    phoneNumber: string;
  }>; // Object indicating whether a field has been touched
  setFieldTouched: (
    field: string,
    touched?: boolean,
    shouldValidate?: boolean
  ) => 
    | Promise<void>
    | Promise<FormikErrors<{
        firstName: string;
        middleName: string;
        lastName: string;
        country: string;
        address: string;
        phoneNumber: string;
      }>>;
  state: Auth; // The current authentication state
  countries: Array<Countries>; // List of countries
  loadingCountries: boolean; // Indicates if the countries data is still loading
  loading: boolean; // Indicates if the form submission is in progress
}

// Custom hook to handle personal details form functionality
const usePersonalDetails = (): PersonalDetailsFunction => {
  const dispatch = useAppDispatch(); // Hook to dispatch actions to the Redux store
  const state = useAppSelector((state) => state.auth); // Get the current auth state from the Redux store

  // Query to get the list of countries
  const { data, isFetching } = useGetUnsecureDataQuery({
    getUrl: endpoints.utils.getCountries, // Endpoint to fetch countries
  });

  // Mutation hook to update the user's profile details
  const [updateProfile, response] = useMutateUnsecureDataMutation();
  
  const { showToast } = useToast(); // Custom hook to show toast notifications

  // Callback function to handle form submission and update the profile
  const onUpdateProfile = useCallback(async () => {
    try {
      // Make an API call to update the profile details
      const response: any = await updateProfile({
        postUrl: endpoints.auth.personalDetails, // API endpoint to update profile details
        formMethod: "POST", // HTTP method (POST)
        request: { ...values, email: state.verifyEmailRequest?.email }, // Form values and user's email
        headers: {
          Authorization: `Bearer ${state.token}` // Authorization header with the user's token
        }
      });

      // Get the API response data
      const apiResponse: API<boolean> = response.error?.data || response.data;

      // If the response code indicates success
      if (apiResponse.responseCode === "00") {
        // Show success toast and reset the form
        showToast("success", apiResponse.responseMessage, "Profile completed successfully");
        resetForm(); // Reset the form fields

        // Navigate to the identity verification page
        router.navigate("/(onboarding)/identityVerification");
      } else {
        // Show error toast with the response message
        showToast(
          "error",
          "Error occurred",
          apiResponse.message || apiResponse.responseMessage || "An unknown error occurred"
        );
      }
    } catch (error: any) {
      // Show error toast if an exception occurs
      showToast("error", "Error occurred", error.message || "An unknown error occurred");
    }
  }, [showToast, updateProfile, dispatch]); // Memoized callback, dependencies: showToast, updateProfile, dispatch

  // Form validation schema using Yup
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[^0-9]*$/, "First name must not contain numbers") // Validate first name
      .min(2, "First name must be at least 2 characters") // Minimum length for first name
      .required("First name is required"), // First name is required
    middleName: Yup.string()
      .matches(/^[^0-9]*$/, "Middle name must not contain numbers"), // Validate middle name
    lastName: Yup.string()
      .min(2, "Last name must be at least 2 characters") // Minimum length for last name
      .matches(/^[^0-9]*$/, "Last name must not contain numbers") // Validate last name
      .required("Last name is required"), // Last name is required
    country: Yup.string().required("Country is required"), // Country is required
    address: Yup.string()
      .min(5, "Address must be at least 5 characters") // Minimum length for address
      .required("Address is required"), // Address is required
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must contain only numbers") // Validate phone number
      .min(9, "Invalid phone number") // Minimum length for phone number
      .max(11, "Invalid phone number") // Maximum length for phone number
      .required("Phone number is required"), // Phone number is required
  });

  // Initialize formik with form values, validation schema, and form submission handler
  const {
    handleChange, // Handle input changes
    errors, // Validation errors
    values, // Form values
    touched, // Tracks touched fields
    setFieldTouched, // Mark fields as touched
    handleSubmit, // Form submission handler
    resetForm, // Reset form function
    isValid, // Whether the form is valid
  } = useFormik({
    initialValues: {
      firstName: "", // Initial value for first name
      middleName: "", // Initial value for middle name
      lastName: "", // Initial value for last name
      phoneNumber: "", // Initial value for phone number
      country: "", // Initial value for country
      address: "", // Initial value for address
      email: "", // Initial value for email
    },
    onSubmit: onUpdateProfile, // Form submission handler
    validationSchema, // Form validation schema
    validateOnMount: true, // Validate the form on mount
  });

  // Return the values and functions needed by the component
  return {
    handleChange,
    setFieldTouched,
    handleSubmit,
    touched,
    errors,
    values,
    disabled: !isValid, // Disable form submission if the form is invalid
    state, // Current authentication state
    countries: Array.isArray(data?.data) ? data?.data : [], // List of countries
    loadingCountries: isFetching, // Indicates if countries data is still loading
    loading: response.isLoading, // Indicates if the form submission is in progress
  };
};

export default usePersonalDetails;
