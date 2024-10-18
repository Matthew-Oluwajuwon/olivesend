import { View } from "react-native";
import React from "react";
import { useAppSelector } from "@/store/hooks";
import { useColorScheme } from "nativewind";

const PasswordCheckerBar = () => {
  const { colorScheme } = useColorScheme();
  const state = useAppSelector((state) => {
    return state.auth;
  });

  const strength = [
    state.hasNumber,
    state.isLowerCase,
    state.isPasswordLength,
    state.isUpperCase,
    state.isSpecialChar,
  ];
  const length = strength.filter((value) => value).length;

  return (
    <View className="flex-row items-center mt-2">
      <View
        className={`border-[3px] flex-1 ${
          length === 1
            ? "border-[#F35625] bg-[#F35625]"
            : length === 2
            ? "border-[#FFAB00] bg-[#FFAB00]"
            : length === 3 || length === 4
            ? "border-[#5EACFF] bg-[#5EACFF]"
            : length === 5
            ? "border-[#28CA9E] bg-[#28CA9E]"
            : colorScheme === "light"
            ? "border-[#C9CED8] bg-[#C9CED8]"
            : "border-[#333333] bg-[#333333]"
        } rounded-[3px]`}
      />
      <View
        className={`border-[3px] flex-1 ${
          length === 2
            ? "border-[#FFAB00] bg-[#FFAB00]"
            : length === 3 || length === 4
            ? "border-[#5EACFF] bg-[#5EACFF]"
            : length === 5
            ? "border-[#28CA9E] bg-[#28CA9E]"
            : colorScheme === "light"
            ? "border-[#C9CED8] bg-[#C9CED8]"
            : "border-[#333333] bg-[#333333]"
        } rounded-[3px] mx-3`}
      />
      <View
        className={`border-[3px] flex-1 ${
          length === 3 || length === 4
            ? "border-[#5EACFF] bg-[#5EACFF]"
            : length === 5
            ? "border-[#28CA9E] bg-[#28CA9E]"
            : colorScheme === "light"
            ? "border-[#C9CED8] bg-[#C9CED8]"
            : "border-[#333333] bg-[#333333]"
        } rounded-[3px] mr-3`}
      />
      <View
        className={`border-[3px] flex-1 ${
          length === 5
            ? "border-[#28CA9E] bg-[#28CA9E]"
            : colorScheme === "light"
            ? "border-[#C9CED8] bg-[#C9CED8]"
            : "border-[#333333] bg-[#333333]"
        } rounded-[3px]`}
      />
    </View>
  );
};

export default React.memo(PasswordCheckerBar);
