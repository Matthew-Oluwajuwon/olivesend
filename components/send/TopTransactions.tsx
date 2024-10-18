import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { ReactNode } from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useGetDataQuery } from "@/store/api.config";
import { endpoints } from "@/store/endpoints";
import { TransactionDTOS } from "@/models/client/response";
import { useDateTimeFormat } from "@/hooks";
import { capitalizeFirstLetter } from "@/utils/helper";
import { useColorScheme } from "nativewind";

const PageWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
  <View className="bg-white dark:bg-primary-dark flex-1 p-3">
    <View className="flex-row justify-between items-center">
      <Text className="font-InterBold text-xl dark:text-white">Transactions</Text>
      <TouchableOpacity className="border-b border-black dark:border-white">
        <Text className="dark:text-white font-InterRegular">See all</Text>
      </TouchableOpacity>
    </View>
    {children}
  </View>
);

const TopTransactions = () => {
  const { colorScheme } = useColorScheme();
  const { onFormattedDateTime } = useDateTimeFormat();
  const { data, isFetching, isLoading, isError } = useGetDataQuery({
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
        <TouchableOpacity key={index}>
          <View className="my-5 flex-row justify-between items-center">
            <View>
              <Text className="font-InterBold dark:text-white">
                {item.totalAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} USD
              </Text>
              <Text className="font-InterRegular dark:text-white">
                {item.amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} USD
              </Text>
            </View>
            <View className="items-end">
              <Text className="font-InterRegular dark:text-white">
                {item.accountName ??
                  item.walletAccountName ??
                  (item.deliveryMethod?.toLowerCase() === "airtime" ? "Airtime" : "N/A")}
              </Text>
              <View className="flex-row items-center">
                <View className="rounded-full p-[6px] px-2 flex-row items-center mr-1 bg-[#F0F0F0] dark:bg-[#242424]">
                  <View
                    className="w-[5px] h-[5px] rounded-full"
                    style={{
                      backgroundColor:
                        item.status?.toLowerCase() === "pending" ||
                        item.status?.toLowerCase() === "expired"
                          ? "#FF6D00"
                          : item.status?.toLowerCase().includes("success")
                          ? "#38c16f"
                          : "#ff0000",
                    }}
                  />
                  <Text className="ml-1 font-InterRegular dark:text-white">
                    {capitalizeFirstLetter(item.status)}{" "}
                  </Text>
                </View>
                <Text className="font-InterRegular dark:text-white">
                  {onFormattedDateTime(item.createdAt)}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </PageWrapper>
  );
};

export default TopTransactions;
