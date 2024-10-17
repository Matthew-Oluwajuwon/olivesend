import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const TopTransactions = () => {
  return (
    <View className="bg-white dark:bg-primary-dark flex-1 p-3">
      <View className="flex-row justify-between items-center">
        <Text className="font-InterBold text-xl dark:text-white">Transactions</Text>
        <TouchableOpacity className="border-b border-black dark:border-white">
          <Text className="dark:text-white font-InterRegular">See all</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 justify-center items-center bg-gray-100 p-4">
        <AntDesign name="exclamationcircle" size={40} color="#B0B0B0" />
        <Text className="text-gray-500 mt-4 text-lg font-medium">No transactions yet.</Text>
      </View>
    </View>
  );
};

export default TopTransactions;
