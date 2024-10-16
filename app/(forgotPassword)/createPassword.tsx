import { View, Text, Keyboard, TouchableWithoutFeedback, Image } from "react-native";
import React, { useState } from "react";
import OnboardingHeader from "@/components/OnboardingHeader";
import Flower from "@/components/Flower";
import { useColorScheme } from "nativewind";
import Input from "@/components/Input";
import { Ionicons } from "@expo/vector-icons";
import { useAuthQuery, useResetPassword } from "@/hooks";
import Button from "@/components/Button";
import PasswordCheckerBar from "@/components/PasswordCheckerBar";
import ResponseScreen from "@/components/ResponseScreen";
import { router } from "expo-router";

const CreatePassword = () => {
  const {
    errors,
    values,
    touched,
    disabled,
    loading,
    state,
    handleChange,
    handleSubmit,
    setFieldTouched,
  } = useResetPassword();
  const { colorScheme } = useColorScheme();
  const [isPasswordToggled, setIsPasswordToggled] = useState(false);
  const [isConfirmPasswordToggled, setIsConfirmPasswordToggled] = useState(false);
  const { contentData } = useAuthQuery();

  if (state.showSuccessOnboarding) {
    return (
      <ResponseScreen
        title="You are all set!"
        message="Your password has been changed successfully"
        executeOnMount={() => {
          setTimeout(() => {
            router.navigate("/login");
          }, 2000);
        }}
      />
    );
  }

  return (
    <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
      <View className="px-5 mt-3 flex-1 relative">
        <OnboardingHeader title="Create a password" description="create a unique password" />
        <View className="mt-10 flex-1 relative">
          <Input
            label="Create new password"
            touched={touched.password}
            inputProps={{
              secureTextEntry: !isPasswordToggled,
              value: values.password,
              maxLength: 20,
              onChangeText: handleChange("password"),
              onFocus: () => setFieldTouched("password", true),
              onBlur: () => setFieldTouched("password", false),
            }}
            message={errors.password}
            suffix={
              <Ionicons
                name={isPasswordToggled ? "eye-outline" : "eye-off-outline"}
                color={colorScheme === "dark" ? "white" : "black"}
                onPress={() => setIsPasswordToggled(!isPasswordToggled)}
                size={20}
              />
            }
          />
          <Input
            label="Confirm password"
            touched={touched.confirmPassword}
            inputProps={{
              secureTextEntry: !isConfirmPasswordToggled,
              value: values.confirmPassword,
              maxLength: 20,
              onChangeText: handleChange("confirmPassword"),
              onFocus: () => setFieldTouched("confirmPassword", true),
              onBlur: () => setFieldTouched("confirmPassword", false),
            }}
            message={errors.confirmPassword}
            suffix={
              <Ionicons
                name={isConfirmPasswordToggled ? "eye-outline" : "eye-off-outline"}
                color={colorScheme === "dark" ? "white" : "black"}
                onPress={() => setIsConfirmPasswordToggled(!isConfirmPasswordToggled)}
                size={20}
              />
            }
          />
          <PasswordCheckerBar />
          <Text className="my-3 font-InterRegular text-black dark:text-[#F5F5F5]">
            Passwords must:
          </Text>
          {contentData.map((item, index) => (
            <View key={index} className="flex-row items-center gap-3 mb-2">
              <Image source={item.img} />
              <Text className="font-InterRegular text-black dark:text-[#F5F5F5]">{item.text}</Text>
            </View>
          ))}
          <Button
            type="primary"
            className="absolute bottom-7 w-full"
            disabled={disabled}
            loading={loading}
            onPress={() => handleSubmit()}
          >
            Continue
          </Button>
        </View>
        <Flower />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePassword;
