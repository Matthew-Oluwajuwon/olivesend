import PIN from "@/components/PIN";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text } from "react-native";

const ConfirmPIN = () => {
  return (
    <View className="px-5 mt-3 flex-1 relative bg-[#102E34]">
      <StatusBar style="light" />
      <Text className="font-InterBold text-white text-2xl">You are almost there!</Text>
      <Text className="font-InterRegular text-[#ffffff] text-sm mt-3">
        Confirm your transaction PIN
      </Text>
      <View className="flex-1">
        <PIN onPress={() => {}} buttonName="Submit" pinTitle="Confirm PIN" />
      </View>
    </View>
  );
};

export default ConfirmPIN;
