import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Select from "@/components/Select";
import { useAirtime, useAmountFormatterWithCommas } from "@/hooks";
import Input from "@/components/Input";
import Button from "@/components/Button";
export interface CountryOperator {
  bill_id: string;
  biller_id: string;
  is_active: boolean;
  logo: string;
  name: string;
  operator_id: string;
  product_type: string;
}
export interface NetworkOptions {
  billId: string;
  billProviderId: string;
  image: string;
  label: string;
  value: string;
}

const Airtime = () => {
  const {
    values,
    touched,
    errors,
    isValid,
    networkLoading,
    handleChange,
    handleSubmit,
    setFieldTouched,
    setFieldValue,
    isFetching,
    isLoading,
    options,
    networkOptions,
    code,
    onSelectNetwork,
  } = useAirtime();
  const { formattedValue, handleChange: onAmountChange } = useAmountFormatterWithCommas();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-[#FFFFFF] dark:bg-primary-dark flex-1"
    >
      <StatusBar style="auto" />
      <View className="gap-5 my-5">
        <Image source={require("@/assets/images/send-airtime.png")} className="self-center" />
        <Text className="font-InterBold text-[20px] text-center dark:text-white">
          Send airtime globally
        </Text>
        <Text className="text-[#888888] font-[inter-regular] text-md text-center">
          Send airtime to anybody anywhere
        </Text>
      </View>
      <View className="my-5 flex-1 px-5">
        <View className="flex-1">
          <Select
            label="Country"
            options={options}
            value={values.countryCode}
            placeholder="Select an option"
            onSelect={(value) => handleChange("countryCode")(value as string)}
            loading={isFetching || isLoading}
          />
          <Select
            label="Choose network"
            options={networkOptions}
            value={values.operatorId}
            placeholder="Select an option"
            onSelect={onSelectNetwork}
            loading={networkLoading}
          />
          <Input
            label="Phone number"
            type="phoneNumber"
            touched={touched.beneficiaryPhoneNumber}
            code={code}
            inputProps={{
              value: values.beneficiaryPhoneNumber,
              onChangeText: handleChange("beneficiaryPhoneNumber"),
              onFocus: () => setFieldTouched("beneficiaryPhoneNumber", true),
              onBlur: () => setFieldTouched("beneficiaryPhoneNumber", false),
              maxLength: values.beneficiaryPhoneNumber.charAt(0) === "0" ? 10 : 9
            }}
            message={errors.beneficiaryPhoneNumber}
          />
          <Input
            label="Amount"
            type="number"
            touched={touched.amount}
            prefix={<Text>$</Text>}
            inputProps={{
              value: formattedValue,
              onChangeText: (value) => onAmountChange(value, setFieldValue),
              keyboardType: "number-pad",
              placeholder: "500",
              onFocus: () => setFieldTouched("amount", true),
              onBlur: () => setFieldTouched("amount", false),
              maxLength: 3
            }}
            message={errors.amount}
          />
        </View>
        <Button type="primary" onPress={() => handleSubmit()} disabled={!isValid}>
          Continue
        </Button>
      </View>
    </ScrollView>
  );
};

export default Airtime;