import { ScrollView } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const Send = () => {

    return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-[#002026] dark:bg-primary-dark flex-1"
    >
      <StatusBar style="light" />
    </ScrollView>
  );
};

export default Send;
