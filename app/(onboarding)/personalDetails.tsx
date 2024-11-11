import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useRef } from "react";
import OnboardingHeader from "@/components/OnboardingHeader";
import { usePersonalDetails } from "@/hooks";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Select from "@/components/Select";
import EndSession from "@/components/EndSession";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

const PersonalDetails = () => {
  const { colorScheme } = useColorScheme();
  const {
    handleChange,
    setFieldTouched,
    handleSubmit,
    touched,
    countries,
    loadingCountries,
    errors,
    state,
    values,
    disabled,
    loading
  } = usePersonalDetails();
  const bottomSheetModalRef = useRef<BottomSheetModalMethods>(null);
  const navigation = useNavigation();

  const options = countries.map((item) => ({
    label: item.name,
    value: item.name,
    image: item.countryFlag,
    code: item.countryCode
  }));

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Ionicons
          name="close-outline"
          color={colorScheme === "dark" ? "white" : "black"}
          size={24}
          onPress={() => bottomSheetModalRef.current?.present()}
        />
      ),
    });
  }, []);

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
                  value: state.verifyEmailRequest?.email,
                  className: "text-[#888888]",
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
              <Select
                label="Country"
                options={options}
                value={values.country}
                placeholder="Select an option"
                onSelect={(value) => handleChange("country")(value as string)}
                loading={loadingCountries}
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
                type="phoneNumber"
                touched={touched.phoneNumber}
                code={options.find(x => x.value === values.country)?.code || options[0].code}
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
                loading={loading}
                onPress={() => handleSubmit()}
              >
                Continue
              </Button>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <EndSession bottomSheetModalRef={bottomSheetModalRef} />
    </KeyboardAvoidingView>
  );
};

export default PersonalDetails;
