import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { TransactionDTOS } from "@/models/client/response";
import { capitalizeFirstLetter } from "@/utils/helper";
import { useDateTimeFormat } from "@/hooks";

interface TransactionRowProps {
  item: TransactionDTOS;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ item }) => {
  const { onFormattedDateTime } = useDateTimeFormat();
  return (
    <TouchableOpacity>
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
  );
};

export default TransactionRow;
