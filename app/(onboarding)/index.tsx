import { View, Keyboard, TouchableWithoutFeedback } from "react-native";
import React from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useSendEmailVerification } from "@/hooks";
import { Link } from "expo-router";
import OnboardingHeader from "@/components/OnboardingHeader";
import Flower from "@/components/Flower";

const SignUp = () => {
  const { errors, values, touched, disabled, loading, setFieldTouched, handleChange, handleSubmit } =
    useSendEmailVerification();

  return (
    <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
      <View className="px-5 mt-3 flex-1 relative">
        <OnboardingHeader
          title="Let's begin!"
          description="Enter your email address here so we can send you a verification code"
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
          <View className="-mt-1">
            <Link
              href="/login"
              className="text-black dark:text-white underline font-InterBold text-sm mb-2"
            >
              Already have an account? Log in
            </Link>
          </View>
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

export default SignUp;
