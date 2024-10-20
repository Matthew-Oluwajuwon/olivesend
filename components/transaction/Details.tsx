import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { TransactionDTOS } from "@/models/client/response";
import { capitalizeFirstLetter, maskAccountNumber } from "@/utils/helper";
import Button from "../Button";
import { useAmountFormatter, useCalculateTransferPayload, useInitiateFundTransfer } from "@/hooks";
import { router } from "expo-router";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AppPayload } from "@/models/application/payload";
import { setBeneficiaryState } from "@/store/slice";

interface DetailsProps {
  item: TransactionDTOS;
  onViewReceipt: () => void;
}

const Details: React.FC<DetailsProps> = ({ item, onViewReceipt }) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => {
    return state.beneficiary;
  });
  const { formattedAmount } = useAmountFormatter();
  const { transferPayload, loading } = useCalculateTransferPayload(
    item.countryId,
    Number(item.amount),
    item.beneficiaryId
  );
  const { onInitiateFundsTransfer } = useInitiateFundTransfer();

  const beneficiaryInfo = {
    accountName: item.accountName,
    accountNumber: item.accountNumber,
    bankName: item.bankName,
    bankProviderCode: "",
    countryId: item.countryId,
    createdAt: "",
    deliveryMethod: item.deliveryMethod,
    email: item.email,
    id: item.beneficiaryId,
    updatedAt: "",
    userId: 0,
    walletAccountName: item.walletAccountName,
    walletAccountNumber: item.walletAccountNumber,
    walletType: item.walletType,
    country: item.country,
    beneficiaryPhoneNumber: item.beneficiaryPhoneNumber
  };

  const onRepeatTransaction = useCallback(() => {
    dispatch(setBeneficiaryState(new AppPayload("record", beneficiaryInfo)));
    onInitiateFundsTransfer({...transferPayload, totalAmount: Number(item.totalAmount), totalFees: Number(item.totalAmount) - Number(item.amount)});
    router.navigate("/(protected)/transactionConfirmation");
  }, [dispatch]);

  const recipientDetails = [
    {
      label: item.deliveryMethod.toUpperCase() !== "BANK" ? "Phone Number" : "Account Number",
      value: maskAccountNumber(
        item.accountNumber || item.walletAccountNumber || item.beneficiaryPhoneNumber
      ),
      key: 1,
    },
    {
      label: "Account Name",
      value: capitalizeFirstLetter(item.accountName || item.walletAccountName) || "N/A",
      key: 2,
    },
    {
      label: item.walletType ? "Wallet Type" : "Bank Name",
      value: item.bankName || item.walletType,
      key: 3,
    },
    {
      label: "Delivery Method",
      value: item.deliveryMethod,
      key: 4,
    },
  ].filter((x) => {
    if (item.deliveryMethod.toUpperCase() !== "BANK") {
      return x.key !== 3 && x.key !== 2;
    }
    return x;
  });

  const transferDetails = [
    {
      label: "You send exactly",
      value: `$${formattedAmount(item?.totalAmount)}`,
    },
    {
      label: `${capitalizeFirstLetter(item.accountName || item.walletAccountName || item.beneficiaryPhoneNumber)} gets`,
      value: `$${formattedAmount(item?.amount)}`,
    },
    {
      label: "Narration",
      value: item.transferPurpose || "N/A",
    },
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      className="flex-1"
    >
      <View className="mt-2 flex-1">
        <View className="flex-row justify-between items-center mb-5">
          <Text className="dark:text-white font-InterBold text-base">Recipient Details</Text>
        </View>
        {recipientDetails.map((item, index) => (
          <View key={index} className="mb-5">
            <Text className="text-[#888888]">{item.label}</Text>
            <Text className="dark:text-white mt-1">{item.value}</Text>
          </View>
        ))}
      </View>
      <View className="mt-2 flex-1">
        <View className="flex-row justify-between items-center mb-5">
          <Text className="dark:text-white font-InterBold text-base">Transfer Details</Text>
        </View>
        {transferDetails.map((item, index) => (
          <View key={index} className="mb-5">
            <Text className="text-[#888888]">{item.label}</Text>
            <Text className="dark:text-white mt-1">{item.value}</Text>
          </View>
        ))}
      </View>
      <Button type="primary" onPress={onRepeatTransaction} loading={loading}>
        Repeat transaction
      </Button>
      <TouchableOpacity onPress={onViewReceipt} className="self-center my-5">
        <Text className="dark:text-white">View reciept</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Details;
