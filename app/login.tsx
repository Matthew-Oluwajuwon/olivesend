import { View, Keyboard, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useLogin } from "@/hooks";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import OnboardingHeader from "@/components/OnboardingHeader";

const Login = () => {
  const { errors, values, touched, disabled, loading, setFieldTouched, handleChange, handleSubmit } = useLogin();
  const { colorScheme } = useColorScheme();
  const [isPasswordToggled, setIsPasswordToggled] = useState(false);

  return (
    <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
      <View className="px-5 mt-3 flex-1">
        <OnboardingHeader
          title="Welcome to send"
          description="Enter your account details to continue"
        />
        <View className="mt-10 flex-1 relative">
          <Input
            label="Email address"
            touched={touched.email}
            inputProps={{
              value: values.email,
              onChangeText: handleChange("email"),
              onFocus: () => setFieldTouched("email", true),
              onBlur: () => setFieldTouched("email", false),
              keyboardType: "email-address",
            }}
            message={errors.email}
          />
          <Input
            label="Enter password"
            touched={touched.password}
            inputProps={{
              secureTextEntry: !isPasswordToggled,
              value: values.password,
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
          <View className="-mt-1">
            <Link
              href="/(onboarding)"
              className="text-black dark:text-white underline font-InterBold text-sm mb-3 self-start"
            >
              Don't have an account? Sign up
            </Link>
            <Link
              href="/(forgotPassword)"
              className="text-black dark:text-white underline font-InterBold text-sm self-start"
            >
              Forgot Password?
            </Link>
          </View>
          <Button
            type="primary"
            className="absolute bottom-7 w-full"
            loading={loading}
            disabled={disabled}
            onPress={() => handleSubmit()}
          >
            Login
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
