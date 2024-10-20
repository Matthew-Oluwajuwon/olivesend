import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { ReactNode } from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useGetMutateDataQuery } from "@/store/api.config";
import { endpoints } from "@/store/endpoints";
import { TransactionDTOS } from "@/models/client/response";
import { useColorScheme } from "nativewind";
import { router } from "expo-router";
import TransactionRow from "../TransactionRow";

const PageWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
  <View className="bg-white dark:bg-primary-dark flex-1 p-3">
    <View className="flex-row justify-between items-center">
      <Text className="font-InterBold text-xl dark:text-white">Transactions</Text>
      <TouchableOpacity
        onPress={() => router.navigate("/(protected)/transactions")}
        className="border-b border-black dark:border-white"
      >
        <Text className="dark:text-white font-InterRegular">See all</Text>
      </TouchableOpacity>
    </View>
    {children}
  </View>
);

const TopTransactions = () => {
  const { colorScheme } = useColorScheme();
  const { data, isFetching, isLoading, isError } = useGetMutateDataQuery({
    getUrl: endpoints.transaction.getTransactions + `?limit=5&page=1`,
  });
  const dataSource: TransactionDTOS[] = Array.isArray(data?.transactions) ? data?.transactions : [];

  if (isFetching || isLoading) {
    return (
      <PageWrapper>
        <View className="flex-1 justify-center items-center bg-gray-100 p-4">
          <ActivityIndicator color={colorScheme === "dark" ? "white" : "black"} />
        </View>
      </PageWrapper>
    );
  }

  if (dataSource?.length === 0) {
    return (
      <PageWrapper>
        <View className="flex-1 justify-center items-center bg-gray-100 p-4">
          <AntDesign name="exclamationcircle" size={40} color="#B0B0B0" />
          <Text className="text-gray-500 mt-4 text-lg font-medium">No transactions yet.</Text>
        </View>
      </PageWrapper>
    );
  }

  if (isError) {
    return (
      <PageWrapper>
        <View className="flex-1 justify-center items-center bg-gray-100 p-4">
          <FontAwesome name="exclamation-triangle" size={40} color="#FF6D00" />
          <Text className="text-gray-500 mt-4 text-lg font-medium">
            Unable to retrieve transactions.
          </Text>
        </View>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {dataSource?.map((item, index) => (
        <TransactionRow item={item} key={index} />
      ))}
    </PageWrapper>
  );
};

export default TopTransactions;
