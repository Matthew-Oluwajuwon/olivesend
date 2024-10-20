import { View } from "react-native";
import React, { useState } from "react";

import SearchBar from "@/components/SearchBar";
import TabSwitcher from "@/components/TabSwitcher";
import { useColorScheme } from "nativewind";
import { useTransactionTypeChange } from "@/hooks";
import { TabOptionType } from "@/models/application/state";
import { useAppSelector } from "@/store/hooks";
import Send from "@/components/transaction/Send";
import Airtime from "@/components/transaction/Airtime";

const Transactions = () => {
  const { colorScheme } = useColorScheme();
  const state = useAppSelector((state) => {
    return state.transaction;
  });
  const { onTransactionTypeChange } = useTransactionTypeChange();
  const options = [
    {
      label: "Send",
      value: "SEND",
    },
    {
      label: "Airtime",
      value: "AIRTIME",
    },
  ];

  return (
    <View className="flex-1">
      <SearchBar onSearch={() => {}} value="" />
      <View className="border-b border-[#D8D8D8] dark:border-[#333333]" />
      <View className="p-5">
        <View className="flex-row items-center p-1 justify-between rounded-[20px] bg-[#F0F0F0] dark:bg-[#242424]">
          {options.map((item, index) => (
            <TabSwitcher
              onPress={() => onTransactionTypeChange(item.value as TabOptionType)}
              index={index}
              key={index}
              showIcon={false}
              item={item}
              color={
                state.type === item.value ? "black" : colorScheme === "dark" ? "#C4C4C4" : "#888888"
              }
              backgroundColor={state.type === item.value ? "white" : "transparent"}
            />
          ))}
        </View>
      </View>
      <View className="flex-1 px-5">{state.type === "SEND" ? <Send /> : <Airtime />}</View>
    </View>
  );
};

export default Transactions;
