import { ScrollView, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const Send = () => {

    return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-[#002026] dark:bg-primary-dark flex-1"
    >
      <StatusBar style="light" />
      <Text className="text-white font-InterBold text-xl text-center my-5">Send Money to</Text>
    </ScrollView>
  );
};

export default Send;
