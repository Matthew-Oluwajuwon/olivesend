import {
    View,
    Text,
    Keyboard,
    TouchableWithoutFeedback,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
  } from "react-native";
  import React from "react";
  import OnboardingHeader from "@/components/OnboardingHeader";
  import { usePersonalDetails } from "@/hooks";
  import Input from "@/components/Input";
  import Button from "@/components/Button";
  
  const PersonalDetails = () => {
    const { handleChange, setFieldTouched, handleSubmit, touched, errors, values, disabled } =
      usePersonalDetails();
  
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80} 
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }} 
            style={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}
          >
            <View className="px-5 mt-3">
              <OnboardingHeader
                title="Your personal details"
                description="let us get your personal information"
              />
              <View className="pt-10">
                <Input
                  label="Email address"
                  touched={touched.phoneNumber}
                  className="bg-[#F0F0F0] dark:bg-[#1F1F1F]"
                  inputProps={{
                    value: values.phoneNumber,
                    readOnly: true,
                  }}
                />
                <Input
                  label="First name"
                  touched={touched.firstName}
                  inputProps={{
                    value: values.firstName,
                    onChangeText: handleChange("firstName"),
                    onFocus: () => setFieldTouched("firstName", true),
                    onBlur: () => setFieldTouched("firstName", false),
                  }}
                  message={errors.firstName}
                />
                <Input
                  label="Middle name"
                  touched={touched.middleName}
                  inputProps={{
                    value: values.middleName,
                    onChangeText: handleChange("middleName"),
                    onFocus: () => setFieldTouched("middleName", true),
                    onBlur: () => setFieldTouched("middleName", false),
                  }}
                  message={errors.middleName}
                />
                <Input
                  label="Last name"
                  touched={touched.lastName}
                  inputProps={{
                    value: values.lastName,
                    onChangeText: handleChange("lastName"),
                    onFocus: () => setFieldTouched("lastName", true),
                    onBlur: () => setFieldTouched("lastName", false),
                  }}
                  message={errors.lastName}
                />
                <Input
                  label="Country"
                  touched={touched.country?.name}
                  inputProps={{
                    value: values.country.name,
                    onChangeText: handleChange("country"),
                    onFocus: () => setFieldTouched("country", true),
                    onBlur: () => setFieldTouched("country", false),
                  }}
                  message={errors.country?.name}
                />
                <Input
                  label="Address"
                  touched={touched.address}
                  inputProps={{
                    value: values.address,
                    onChangeText: handleChange("address"),
                    onFocus: () => setFieldTouched("address", true),
                    onBlur: () => setFieldTouched("address", false),
                  }}
                  message={errors.address}
                />
                <Input
                  label="Phone number"
                  touched={touched.phoneNumber}
                  inputProps={{
                    value: values.phoneNumber,
                    onChangeText: handleChange("phoneNumber"),
                    onFocus: () => setFieldTouched("phoneNumber", true),
                    onBlur: () => setFieldTouched("phoneNumber", false),
                  }}
                  message={errors.phoneNumber}
                />
                <Text className="text-[#888888] text-center my-5 w-[90%] mx-auto">
                  Please make sure your name matches the name on your debit card.
                </Text>
                <Button
                  type="primary"
                  className="w-full"
                  disabled={disabled}
                  onPress={() => handleSubmit()}
                >
                  Continue
                </Button>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  };
  
  export default PersonalDetails;
  