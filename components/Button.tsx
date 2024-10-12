import {
  ActivityIndicator,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Text } from "react-native";
import React from "react";

interface ButtonProps extends TouchableOpacityProps {
  type: "primary" | "default";
  children: string;
  textProps?: TextProps;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { type, children, textProps, loading, className, ...rest } = props;

  if (type === "primary") {
    return (
      <TouchableOpacity
        {...rest}
        className={`bg-primary dark:bg-white p-3 px-7 rounded-full flex-row justify-center items-center ${
          loading && "opacity-50"
        } ${className}`}
        disabled={loading}
      >
        {loading && <ActivityIndicator className="mr-2" />}
        <Text {...textProps} className="font-InterMedium text-white dark:text-black text-center">
          {children}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      {...rest}
      className={`border border-[#EFEFEF] dark:border-[#242424] dark:bg-[#242424] p-3 px-7 rounded-full flex-row justify-center items-center ${
        loading && "opacity-50"
      } ${className}`}
      disabled={loading}
    >
      {loading && <ActivityIndicator className="mr-2" />}
      <Text {...textProps} className="font-InterMedium text-black dark:text-white text-center">
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
