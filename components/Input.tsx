import { View, Text, ViewProps, TextInputProps, TextInput, TextProps } from "react-native";
import React, { ReactNode } from "react";
import { useColorScheme } from "nativewind";

export interface InputProps extends ViewProps {
  inputProps?: TextInputProps;
  label?: string;
  labelProps?: TextProps;
  messageProps?: TextProps;
  message?: ReactNode | string;
  touched?: boolean;
  suffix?: ReactNode;
  prefix?: ReactNode;
  type?: "text" | "phoneNumber" | "number";
}

const Input: React.FC<InputProps> = (props) => {
  const {
    message,
    inputProps,
    label,
    labelProps,
    messageProps,
    touched,
    prefix,
    suffix,
    className,
    type,
    ...rest
  } = props;
  const { colorScheme } = useColorScheme();

  if (type === "phoneNumber") {
    return (
      <View className="pb-6 mb-1 relative">
        {label && (
          <Text className="text-black dark:text-white mb-2" {...labelProps}>
            {label}
          </Text>
        )}
        <View className="flex-row items-center">
          <View
            className={`absolute -mt-0.5- p-4 z-50 border ${
              message && inputProps?.value
                ? "border-[#ef4444] dark:border-[#ef4444]"
                : touched
                ? "border-[#006F01]"
                : "border-gray-500 dark:border-dark-gray-500"
            } rounded-[20px] `}
          >
            <Text className="text-black dark:text-white">+234</Text>
          </View>
          <View
            className={`border ${
              message && inputProps?.value
                ? "border-[#ef4444] dark:border-[#ef4444]"
                : touched
                ? "border-[#006F01]"
                : "border-gray-500 dark:border-dark-gray-500"
            } rounded-[20px] relative w-[79%] ml-auto ${className}`}
          >
            <TextInput
              {...inputProps}
              className={`text-black dark:text-white rounded-[20px] p-4 ${inputProps?.className}`}
              cursorColor={colorScheme === "dark" ? "white" : "black"}
              keyboardType="phone-pad"
            />
          </View>
        </View>
        {message && inputProps?.value && (
          <Text
            className={`text-red-500 absolute bottom-0 ${messageProps?.className}`}
            {...messageProps}
          >
            {message}
          </Text>
        )}
      </View>
    );
  }

  return (
    <View className="pb-6 mb-1 relative">
      {label && (
        <Text className="text-black dark:text-white mb-2" {...labelProps}>
          {label}
        </Text>
      )}
      <View
        className={`border ${
          message && inputProps?.value
            ? "border-[#ef4444] dark:border-[#ef4444]"
            : touched
            ? "border-[#006F01]"
            : "border-gray-500 dark:border-dark-gray-500"
        } rounded-[20px] relative w-full mx-auto ${className}`}
        {...rest}
      >
        <View className="absolute left-5 top-1/3 -mt-0.5 z-50">{prefix}</View>
        <TextInput
          {...inputProps}
          className={`text-black dark:text-white rounded-[20px] p-4 ${suffix && "pr-14"} ${
            prefix && "pl-14"
          } ${inputProps?.className}`}
          cursorColor={colorScheme === "dark" ? "white" : "black"}
        />
        <View className="absolute right-5 top-1/3 -mt-0.5 z-50">{suffix}</View>
      </View>
      {message && inputProps?.value && (
        <Text
          className={`text-red-500 absolute bottom-0 ${messageProps?.className}`}
          {...messageProps}
        >
          {message}
        </Text>
      )}
    </View>
  );
};

export default Input;
