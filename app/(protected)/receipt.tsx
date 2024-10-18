import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { useDateTimeFormat, useShare } from "@/hooks";
import { capitalizeFirstLetter } from "@/utils/helper";
import Button from "@/components/Button";

const Receipt = () => {
  const { colorScheme } = useColorScheme();
  const state = useAppSelector((state) => {
    return state.send;
  });
  const navigation = useNavigation();
  const { handleDownload, handleShare, receiptRef } = useShare();
  const { onFormattedDateTime } = useDateTimeFormat();
  console.log(state.receipt);
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View className="flex-row items-center">
          <Ionicons
            name="close-outline"
            color={colorScheme === "dark" ? "white" : "black"}
            size={24}
          />
          <Text className="font-InterBold text-xl ml-3 dark:text-white">Receipt</Text>
        </View>
      ),
    });
  }, []);

  const backgroundColor =
    state.receipt?.status?.toLowerCase() === "pending" ||
    state.receipt?.status?.toLowerCase() === "expired"
      ? "#FF6D00"
      : state.receipt?.status?.toLowerCase().includes("success")
      ? "#38c16f"
      : "#ff0000";

  return (
    <ScrollView
      className="flex-1 dark:bg-primary-dark"
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
        <StatusBar style="auto" />
      <View ref={receiptRef} className="dark:bg-primary-dark py-5 px-3">
        <View className="flex-row justify-between items-center">
          <Image source={require("@/assets/images/logo-black.png")} />
          <Text className="text-[#888888] font-InterRegular">
            {onFormattedDateTime(state.receipt?.createdAt as string)}
          </Text>
        </View>
        <View className="flex-row justify-between items-center mt-7">
          <View className="">
            <Text className="text-[#888888] font-InterRegular mb-2">You sent exactly</Text>
            <Text className="font-InterBold dark:text-white">${state.receipt?.totalAmount}</Text>
          </View>
          <View className="rounded-full p-[6px] px-2 flex-row items-center mr-1 bg-[#F0F0F0] dark:bg-[#242424]">
            <View
              className="w-[10px] h-[10px] rounded-full"
              style={{
                backgroundColor,
              }}
            />
            <Text className="ml-3 font-InterRegular dark:text-white">
              {capitalizeFirstLetter(state.receipt?.status as string)}{" "}
            </Text>
          </View>
        </View>
        <View className="flex-row justify-between items-center mt-7">
          <View className="">
            <Text className="text-[#888888] font-InterRegular mb-2">Total fees</Text>
            <Text className="font-InterRegular dark:text-white">
              ${(Number(state.receipt?.totalAmount) - Number(state.receipt?.amount)).toFixed(2)}
            </Text>
          </View>
        </View>
        <View className="flex-row justify-between items-center mt-7">
          <View className="">
            <Text className="font-InterBold dark:text-white">Beneficiary</Text>
          </View>
        </View>
        <View className="flex-row justify-between items-center mt-7">
          <View className="">
            <Text className="text-[#888888] font-InterRegular mb-2">
              {state.receipt?.accountNumber
                ? "Account"
                : state.receipt?.walletAccountNumber
                ? "Wallet"
                : "Phone"}{" "}
              Number
            </Text>
            <Text className="font-InterBold dark:text-white">
              {state.receipt?.accountNumber ??
                state.receipt?.walletAccountNumber ??
                state.receipt?.beneficiaryPhoneNumber}{" "}
              {state.receipt?.bankName || state.receipt?.walletType ? "|" : null}{" "}
              {state.receipt?.bankName ?? state.receipt?.walletType}
            </Text>
          </View>
        </View>
        {state.receipt?.deliveryMethod?.toLowerCase() !== "airtime" && (
          <View className="flex-row justify-between items-center mt-7">
            <View className="">
              <Text className="text-[#888888] font-InterRegular mb-2">
                {state.receipt?.accountNumber
                  ? "Account"
                  : state.receipt?.walletAccountNumber
                  ? "Wallet"
                  : "Phone"}{" "}
                Name
              </Text>
              <Text className="font-InterBold dark:text-white">
                {state.receipt?.accountName ?? state.receipt?.walletAccountName ?? "N/A"}
              </Text>
            </View>
          </View>
        )}
        <View className="flex-row justify-between items-center mt-7">
          <View className="">
            <Text className="text-[#888888] font-InterRegular mb-2">Beneficiary Received</Text>
            <Text className="font-InterBold dark:text-white">${state.receipt?.amount}</Text>
          </View>
        </View>
        <View className="flex-row justify-between items-center mt-7">
          <View className="">
            <Text className="text-[#888888] font-InterRegular mb-2">Reference number</Text>
            <Text className="font-InterBold dark:text-white">{state.receipt?.reference}</Text>
          </View>
        </View>
        <View className="flex-row justify-between items-center my-7">
          <View className="">
            <Text className="font-InterBold dark:text-white mb-2">Remark</Text>
            <Text className="font-InterRegular dark:text-white">
              {state.receipt?.transferPurpose}
            </Text>
          </View>
        </View>
        <View className="flex-1 rounded-[11.53px] overflow-hidden">
          <Image source={require("@/assets/images/receipt-img.png")} />
        </View>
      </View>
      <View className="border-b mt-5 border-[#D8D8D8] dark:border-[#5C5C5C]" />
      <View className="px-3 my-5 mb-10 flex-row items-center justify-evenly">
        <TouchableOpacity>
          <Text className="font-InterMedium dark:text-white" onPress={handleShare}>
            Share receipt
          </Text>
        </TouchableOpacity>
        <Button type="primary" onPress={handleDownload}>
          Download
        </Button>
      </View>
    </ScrollView>
  );
};

export default Receipt;
