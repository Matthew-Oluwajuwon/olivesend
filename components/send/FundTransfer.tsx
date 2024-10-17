import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { TransactingCountries } from "@/models/client/response";
import { useGetDataQuery } from "@/store/api.config";
import { endpoints } from "@/store/endpoints";
import Select, { SelectProps } from "../Select";
import { useAmountFormatter } from "@/hooks";
import Button from "../Button";

const FundTransfer = () => {
  const { data, isFetching, isLoading, isError } = useGetDataQuery({
    getUrl: endpoints.transaction.getCountries,
  });
  const { formattedAmount } = useAmountFormatter()

  const options: SelectProps["options"] = Array.isArray(data)
    ? data.map((item: TransactingCountries) => ({
        label: item.name,
        image: item.flag,
        value: item.name,
      }))
    : [];

  const statOptions = [
    {
      icon: require("@/assets/icons/plus.png"),
      label: "Transfer fee",
      amount: "3",
    },
    {
      icon: require("@/assets/icons/equals.png"),
      label: "Total amount to pay (Amount + Fee)",
      amount: "33",
    },
    {
      icon: require("@/assets/icons/swap.png"),
      label: "Exchange rate",
      amount: "1",
    },
  ];

  return (
    <View className="bg-[#002026] dark:bg-primary-dark p-3 pb-10">
      <Text className="text-white font-InterBold text-2xl text-center mt-5 mb-2">
        Send Money to
      </Text>
      <Select
        options={options}
        onSelect={(e) => console.log(e)}
        isDarkColoredBg
        loading={isFetching || isLoading}
        className="w-[40%] mx-auto p-3 py-4 bg-[#0A1D21] dark:bg-[#1F1F1F] border-[#005666] dark:border-[#5C5C5C]"
        placeholder={isError ? "No country" : ""}
      />
      <View>
        <TouchableOpacity className="bg-[#102E34] dark:bg-[#1F1F1F] border border-[#005666] rounded-[20px] dark:border-[#5C5C5C] flex-row items-center justify-between pr-5">
          <Text className="p-6 text-[#9D9D9D]">Click to add a beneficiary</Text>
          <Image source={require("@/assets/icons/add-circle.png")} />
        </TouchableOpacity>
        <View className="mt-5 flex-row items-center justify-between">
          <View className="bg-[#102E34] p-3 w-[45%] dark:bg-[#1F1F1F] border border-[#005666] rounded-[20px] dark:border-[#5C5C5C]">
            <Text className="font-InterRegular text-[#9D9D9D]">You send</Text>
            <View className="flex-row mt-2">
              <Text className="text-white mr-1">$</Text>
              <TextInput className="w-full dark:text-white" placeholderTextColor="white" placeholder="0.00" keyboardType="number-pad" />
            </View>
          </View>
          <Image source={require("@/assets/images/exchange.png")} className="mx-3-" />
          <View className="bg-[#102E34] w-[45%] p-3 dark:bg-[#1F1F1F] border border-[#005666] rounded-[20px] dark:border-[#5C5C5C]">
            <Text className="font-InterRegular text-[#9D9D9D]">They receive</Text>
            <Text className="font-InterRegular text-white mt-2">USD 30.00</Text>
          </View>
        </View>
      </View>
      <View className="mt-5">
        {statOptions.map((option, index) => (
          <View key={index} className="flex-row justify-between items-center mb-3">
            <View className="flex-row items-center gap-2">
              <Image source={option.icon} />
              <Text className="text-white font-InterRegular text-sm">{option.label}</Text>
            </View>
            <Text className="text-white font-InterRegular">${formattedAmount(option.amount)}</Text>
          </View>
        ))}
      </View>
      <Button type="primary" className="bg-[#A5E557] mt-5" textProps={{
        className: "text-black"
      }}>Continue</Button>
    </View>
  );
};

export default FundTransfer;
