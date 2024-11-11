import { useState } from "react";
interface AmountFormatterFunction {
  formattedAmount: (amount: string | number, isSecret?: boolean) => string;
}
const useAmountFormatter = (): AmountFormatterFunction => {
  const formattedAmount = (amount: string | number, isSecret?: boolean) => {
    return isSecret
      ? "***"
      : Intl.NumberFormat("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(Number(amount));
  };

  return { formattedAmount };
};

// Interface for the return values of the hook
interface UseAmountFormatterReturn {
  value: string;
  formattedValue: string;
  handleChange: (
    value: string,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => any
  ) => void;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Custom hook to format an amount with commas while typing.
 */
export const useAmountFormatterWithCommas = (): UseAmountFormatterReturn => {
  const [value, setValue] = useState<string>("");

  /**
   * Function to format a number with commas as thousands separators.
   * @param input The number as a string to be formatted.
   */
  const formatWithCommas = (input: string): string => {
    // Remove any non-digit characters except for periods
    const cleanedValue = input.replace(/[^0-9.]/g, "");

    // Split the value into integer and decimal parts (if any)
    const [integerPart, decimalPart] = cleanedValue.split(".");

    // Format the integer part with commas
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Return the formatted value with decimal part if present
    return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
  };

  
  const handleChange = (
    value: string,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => any
  ) => {
    const inputValue = value;
    setValue(formatWithCommas(inputValue));
    setFieldValue("amount", Number(formatWithCommas(inputValue).replaceAll(",", "")));
  };

  // The formatted value to be displayed in the input
  const formattedValue = formatWithCommas(value);

  return {
    value,
    formattedValue,
    handleChange,
    setValue,
  };
};

export default useAmountFormatter;