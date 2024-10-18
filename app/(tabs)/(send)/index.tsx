import { ScrollView } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import FundTransfer from "@/components/send/FundTransfer";
import TopTransactions from "@/components/send/TopTransactions";

const Send = () => {

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-white dark:bg-primary-dark flex-1"
      alwaysBounceVertical={false}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar style="light" />
      <FundTransfer />
      <TopTransactions />
    </ScrollView>
  );
};

export default Send;
