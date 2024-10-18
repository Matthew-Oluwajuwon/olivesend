import {
  View,
  Text,
  ScrollView,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import Select from "@/components/Select";
import { useCreateBeneficiary } from "@/hooks";
import bankSvg from "@/assets/svg/bankSvg";
import { SvgXml } from "react-native-svg";
import { useColorScheme } from "nativewind";
import walletSvg from "@/assets/svg/walletSvg";
import Wallet from "@/components/beneficiary/Wallet";
import Bank from "@/components/beneficiary/Bank";
import Button from "@/components/Button";
import { useAppSelector } from "@/store/hooks";

const createBeneficiary = () => {
  const state = useAppSelector((state) => {
    return state.beneficiary;
  });
  const {
    loading,
    options,
    values,
    deliveryMethod,
    handleChange,
    setDeliveryMethod,
    handleSubmit,
  } = useCreateBeneficiary();
  const { colorScheme } = useColorScheme();
  interface DataProp {
    icon: string;
    label: string;
    value: "WALLET" | "BANK";
  }
  const data: Array<DataProp> = [
    {
      icon: walletSvg({
        color:
          deliveryMethod === "WALLET" ? "black" : colorScheme === "dark" ? "#C4C4C4" : "#888888",
      }),
      label: "Wallet",
      value: "WALLET",
    },
    {
      icon: bankSvg({
        color: deliveryMethod === "BANK" ? "black" : colorScheme === "dark" ? "#C4C4C4" : "#888888",
      }),
      label: "Bank",
      value: "BANK",
    },
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          className="flex-1 px-5"
        >
          <View className="flex-1">
            <Select
              label="Country"
              options={options}
              value={values.countryShortName}
              placeholder="Select an option"
              onSelect={(value) => handleChange("countryShortName")(value as string)}
              loading={loading}
            />
            <View>
              <Text className="text-black dark:text-white mb-2">Delivery method</Text>
              <View className="flex-row items-center p-1 justify-between rounded-[20px] bg-[#F0F0F0] dark:bg-[#242424]">
                {data.map((item, index) => (
                  <Pressable
                    onPress={() => setDeliveryMethod(item.value)}
                    className="flex-row items-center justify-center w-1/2 py-4 rounded-[20px]"
                    style={{
                      backgroundColor: deliveryMethod === item.value ? "white" : "transparent",
                    }}
                    key={index}
                  >
                    <SvgXml width="20" height="20" xml={item.icon} />
                    <Text
                      className="ml-3 font-InterRegular"
                      style={{
                        color:
                          deliveryMethod === item.value
                            ? "black"
                            : colorScheme === "dark"
                            ? "#C4C4C4"
                            : "#888888",
                      }}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
            {deliveryMethod === "WALLET" && <Wallet />}
            {deliveryMethod === "BANK" && <Bank />}
          </View>
          <View className="mb-5">
            <Text className="text-center my-5 mx-auto text-[#888888] dark:text-[#C4C4C4]">
              Ensure the account detail is correct. There is no guarantee of refund for transfer to
              incorrect account details
            </Text>
            <Button
              type="primary"
              loading={false}
              onPress={() => handleSubmit()}
              disabled={state.disabled}
            >
              Save
            </Button>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default createBeneficiary;
