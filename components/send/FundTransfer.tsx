import { View, Text, Image, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { CorridorRate, TransactingCountries } from "@/models/client/response";
import { useGetDataQuery } from "@/store/api.config";
import { endpoints } from "@/store/endpoints";
import Select, { SelectProps } from "../Select";
import {
  useAmountFormatter,
  useBeneficiarySelection,
  useCalculateTransferPayload,
  useInitiateFundTransfer,
} from "@/hooks";
import Button from "../Button";
import { router } from "expo-router";
import { useAppSelector } from "@/store/hooks";
import { Ionicons } from "@expo/vector-icons";
import { capitalizeFirstLetter } from "@/utils/helper";

const FundTransfer = () => {
  const { formattedAmount } = useAmountFormatter();
  const { onBeneficiaryClicked } = useBeneficiarySelection();
  const { onInitiateFundsTransfer } = useInitiateFundTransfer();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [amount, setAmount] = useState(0);
  const beneficiary = useAppSelector((state) => {
    return state.beneficiary;
  });
  const { data, isFetching, isLoading, isError } = useGetDataQuery({
    getUrl: endpoints.transaction.getCountries,
  });

  const options: SelectProps["options"] = Array.isArray(data)
    ? data.map((item: TransactingCountries) => ({
        label: item.name,
        image: item.flag,
        value: item.shortName,
      }))
    : [];

  const { transferPayload, loading, transferFee, totalAmount, rates } = useCalculateTransferPayload(
    selectedCountry || (options[0]?.value as string),
    amount,
    beneficiary?.record?.id
  );

  const statOptions = [
    {
      icon: require("@/assets/icons/plus.png"),
      label: "Transfer fee",
      amount: transferFee.toString(),
    },
    {
      icon: require("@/assets/icons/equals.png"),
      label: "Total amount to pay (Amount + Fee)",
      amount: totalAmount.toString(),
    },
    {
      icon: require("@/assets/icons/swap.png"),
      label: "Exchange rate",
      amount: rates?.rate?.toString(),
    },
  ];

  const disableContinue = transferPayload.beneficiaryId === 0 || transferPayload.amount === 0;
  const isGreaterThanAllowedFigure = amount > 500;

  return (
    <View className="bg-[#002026] dark:bg-primary-dark p-3 pb-10">
      <Text className="text-white font-InterBold text-2xl text-center mt-5 mb-2">
        Send Money to
      </Text>
      <Select
        options={options}
        onSelect={(value) => setSelectedCountry(value as string)}
        isDarkColoredBg
        loading={isFetching || isLoading}
        className="w-[35%] mx-auto p-3 bg-[#0A1D21] dark:bg-[#1F1F1F] border-[#005666] dark:border-[#333333]"
        placeholder={isError ? "No country" : ""}
      />
      <View>
        {beneficiary.record.id ? (
          <TouchableOpacity
            onPress={() => router.navigate("/(beneficiary)")}
            className="bg-[#102E34] dark:bg-[#1F1F1F] p-4 border border-[#005666] rounded-[20px] dark:border-[#333333] flex-row items-center justify-between pr-5"
          >
            <View className="w-[90%]">
              <Text className="text-[#9D9D9D] font-InterRegular">Beneficiary</Text>
              <View className="flex-row mt-2">
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  className="text-white font-InterRegular w-full"
                >
                  {capitalizeFirstLetter(
                    beneficiary.record?.accountName || beneficiary.record?.walletAccountName
                  )}{" "}
                  | {beneficiary.record?.bankName || beneficiary.record?.walletType}
                </Text>
              </View>
            </View>
            <Ionicons
              name="close"
              color="white"
              size={24}
              onPress={() => onBeneficiaryClicked("REMOVE")}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => router.navigate("/(beneficiary)")}
            className="bg-[#102E34] dark:bg-[#1F1F1F] border border-[#005666] rounded-[20px] dark:border-[#333333] flex-row items-center justify-between pr-5"
          >
            <Text className="p-6 px-4 text-[#9D9D9D]">Click to add a beneficiary</Text>
            <Image source={require("@/assets/icons/add-circle.png")} />
          </TouchableOpacity>
        )}
        <View className="relative pb-5">
          <View className="mt-5 flex-row items-center justify-between">
            <View className="bg-[#102E34] p-3 w-[45%] dark:bg-[#1F1F1F] border border-[#005666] rounded-[20px] dark:border-[#333333]">
              <Text className="font-InterRegular text-[#9D9D9D]">You send</Text>
              <View className="flex-row mt-2">
                <Text className="text-white mr-1">$</Text>
                <TextInput
                  className="w-full text-white"
                  placeholderTextColor="white"
                  placeholder="0.00"
                  value={String(amount)}
                  maxLength={3}
                  keyboardType="number-pad"
                  onChangeText={(value) => setAmount(Number(value))}
                />
              </View>
            </View>
            <Image source={require("@/assets/images/exchange.png")} className="mx-3-" />
            <View className="bg-[#102E34] w-[45%] p-3 dark:bg-[#1F1F1F] border border-[#005666] rounded-[20px] dark:border-[#333333]">
              <Text className="font-InterRegular text-[#9D9D9D]">They receive</Text>
              <Text className="font-InterRegular text-white mt-2">
                USD {formattedAmount(amount) || "0.00"}
              </Text>
            </View>
          </View>
        </View>
        {isGreaterThanAllowedFigure && (
          <Text className="text-red-500 text-[13px] absolute bottom-0 left-1/4 -translate-x-1/2">
            Amount cannot exceed $500
          </Text>
        )}
      </View>
      <View className="mt-5">
        {statOptions.map((option, index) => (
          <View key={index} className="flex-row justify-between items-center mb-3">
            <View className="flex-row items-center gap-2">
              <Image source={option.icon} />
              <Text className="text-white font-InterRegular text-sm">{option.label}</Text>
            </View>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-InterRegular">
                ${formattedAmount(option.amount)}
              </Text>
            )}
          </View>
        ))}
      </View>
      <Button
        type="primary"
        className="bg-[#A5E557] mt-5"
        disabled={disableContinue || isGreaterThanAllowedFigure}
        textProps={{
          className: "text-black",
        }}
        onPress={() => {
          onInitiateFundsTransfer(transferPayload);
          setAmount(0.0);
          router.navigate({
            pathname: "/(protected)/transactionConfirmation",
            params: { type: "TRANSFER" },
          });
        }}
      >
        Continue
      </Button>
    </View>
  );
};

export default FundTransfer;
