import { View, Text } from "react-native";
import React, { useCallback, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { TransactionDTOS } from "@/models/client/response";
import { useAmountFormatter, useDateTimeFormat } from "@/hooks";
import { capitalizeFirstLetter, maskAccountNumber } from "@/utils/helper";
import TabSwitcher from "@/components/TabSwitcher";
import { useColorScheme } from "nativewind";
import Details from "@/components/transaction/Details";
import Update from "@/components/transaction/Update";
import Flower from "@/components/Flower";
import { useAppDispatch } from "@/store/hooks";
import { AppPayload } from "@/models/application/payload";
import { setSendState } from "@/store/slice";

type TabOption = "DETAILS" | "UPDATE";

const TransactionDetails = () => {
  const dispatch = useAppDispatch();

  const [type, setType] = useState<TabOption>("DETAILS");
  const { colorScheme } = useColorScheme();
  const { item }: any = useLocalSearchParams();
  const { onFormattedDateTime } = useDateTimeFormat();
  const { formattedAmount } = useAmountFormatter();

  const data: TransactionDTOS = item ? JSON.parse(item) : null;
  const backgroundColor =
    data.status?.toLowerCase() === "pending" || data.status?.toLowerCase() === "expired"
      ? "#FF6D00"
      : data.status?.toLowerCase().includes("success")
      ? "#38c16f"
      : "#ff0000";

  const onViewReceipt = useCallback(() => {
    dispatch(setSendState(new AppPayload("receipt", { ...data, momoPhoneNumber: "" })));
    router.navigate("/(protected)/receipt");
  }, [dispatch]);

  const options = [
    {
      label: "Details",
      value: "DETAILS",
    },
    {
      label: "Update",
      value: "UPDATE",
    },
  ];

  return (
    <View className="flex-1 relative">
      <View className="mb-5 mx-auto items-center">
        <Text className="my-5 dark:text-white">{onFormattedDateTime(data.createdAt)}</Text>
        <View className="bg-[#F0F0F0] dark:bg-[#242424] self-center rounded-full p-[6px] px-2 my-3 flex-row items-center justify-between">
          <View
            className="w-[5px] h-[5px] rounded-full"
            style={{
              backgroundColor,
            }}
          />
          <Text className="ml-2 dark:text-white">{capitalizeFirstLetter(data.status)} </Text>
        </View>
        <Text className="font-InterBold my-5 dark:text-white">
          You sent ${formattedAmount(data.amount)} to{" "}
          {capitalizeFirstLetter(
            data.accountName || data.walletAccountName || data.beneficiaryPhoneNumber || "N/A"
          )}
        </Text>
        <Text className="dark:text-white">
          {maskAccountNumber(
            data.accountNumber || data.walletAccountNumber || data.beneficiaryPhoneNumber
          )}{" "}
          | {data.bankName || data.walletType || data.deliveryMethod}
        </Text>
      </View>
      <View className="border-b border-[#D8D8D8] dark:border-[#242424] mt-5" />
      <View className="flex-1 px-5">
        <View className="flex-row items-center p-1 mt-5 justify-between rounded-[20px] bg-[#F0F0F0] dark:bg-[#242424]">
          {options.map((item, index) => (
            <TabSwitcher
              onPress={() => setType(item.value as TabOption)}
              index={index}
              key={index}
              showIcon={false}
              item={item}
              color={type === item.value ? "black" : colorScheme === "dark" ? "#C4C4C4" : "#888888"}
              backgroundColor={type === item.value ? "white" : "transparent"}
            />
          ))}
        </View>
        {type === "DETAILS" ? (
          <Details item={data} onViewReceipt={onViewReceipt} />
        ) : (
          <Update item={data} onViewReceipt={onViewReceipt} />
        )}
      </View>
      <Flower />
    </View>
  );
};

export default TransactionDetails;
