import { View } from "react-native";
import React, { useState } from "react";

import SearchBar from "@/components/SearchBar";
import TabSwitcher from "@/components/TabSwitcher";
import { useColorScheme } from "nativewind";

type TabOptionType = "SEND" | "AIRTIME";

const Transactions = () => {
  const [tabOptions, setTabOptions] = useState<TabOptionType>("SEND");
  const { colorScheme } = useColorScheme();
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
    <View className="">
      <SearchBar onSearch={() => {}} value="" />
      <View className="border-b border-[#D8D8D8] dark:border-[#333333]" />
      <View className="p-5">

      <View className="flex-row items-center p-1 justify-between rounded-[20px] bg-[#F0F0F0] dark:bg-[#242424]">
        {options.map((item, index) => (
          <TabSwitcher
            onPress={() => setTabOptions(item.value as TabOptionType)}
            index={index}
            key={index}
            showIcon={false}
            item={item}
            color={
              tabOptions === item.value ? "black" : colorScheme === "dark" ? "#C4C4C4" : "#888888"
            }
            backgroundColor={tabOptions === item.value ? "white" : "transparent"}
          />
        ))}
      </View>
      </View>
    </View>
  );
};

export default Transactions;
