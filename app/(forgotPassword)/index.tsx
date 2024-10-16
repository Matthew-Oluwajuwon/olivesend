import { View, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import Flower from '@/components/Flower'
import Input from '@/components/Input'
import OnboardingHeader from '@/components/OnboardingHeader'
import { Link } from 'expo-router'
import { useSendForgotPasswordEmail } from '@/hooks'
import Button from '@/components/Button'

const ForgotPassword = () => {
  const { errors, values, touched, disabled, loading, setFieldTouched, handleChange, handleSubmit } =
    useSendForgotPasswordEmail();
  return (
    <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
      <View className="px-5 mt-3 flex-1 relative">
        <OnboardingHeader
          title="Forgot your password"
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
  )
}

export default ForgotPassword