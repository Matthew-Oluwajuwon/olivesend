import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import OnboardingHeader from "@/components/OnboardingHeader";
import Select, { SelectProps } from "@/components/Select";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { capitalizeFirstLetter, maskAccountNumber } from "@/utils/helper";
import { useAmountFormatter, useInitiateFundTransfer } from "@/hooks";
import Flower from "@/components/Flower";
import Button from "@/components/Button";
import { setSendState } from "@/store/slice";
import { AppPayload } from "@/models/application/payload";
import { useGetDataQuery } from "@/store/api.config";
import { endpoints } from "@/store/endpoints";
import Loader from "@/components/Loader";

const options: SelectProps["options"] = [
  {
    label: "School fees",
    value: "School fees",
  },
  {
    label: "Accomodation fees",
    value: "Accomodation fees",
  },
  {
    label: "Travel",
    value: "Travel",
  },
  {
    label: "Loan repayment",
    value: "Loan repayment",
  },
  {
    label: "Gift",
    value: "Gift",
  },
  {
    label: "Others",
    value: "Others",
  },
];
const sourceOfFund: SelectProps["options"] = [
  {
    label: "Personal savings",
    value: "Personal savings",
  },
  {
    label: "Salary",
    value: "Salary",
  },
  {
    label: "Investments",
    value: "Investments",
  },
  {
    label: "Loans",
    value: "Loans",
  },
  {
    label: "Profits from a business",
    value: "Profits from a business",
  },
  {
    label: "Inheritances",
    value: "Inheritances",
  },
  {
    label: "Others",
    value: "Others",
  },
];

const TransactionConfirmation = () => {
  const dispatch = useAppDispatch();
  const [otherTransferPayload, setOtherTransferPayload] = useState({
    sourceOfFund: sourceOfFund[0].value,
    purposeOfTransfer: options[0].value,
  });
  const state = useAppSelector((state) => {
    return state.send;
  });
  const beneficiary = useAppSelector((state) => {
    return state.beneficiary;
  });
  const { formattedAmount } = useAmountFormatter();
  const { loading, onNavigatingToPaymentGateway } = useInitiateFundTransfer();
  const { data, isFetching, isLoading } = useGetDataQuery({
    getUrl: endpoints.cards.getCards,
  });
  const processing = isFetching || isLoading
  

  const recipientDetails = [
    {
      label: beneficiary?.record?.deliveryMethod?.toUpperCase() === "BANK" ? "Account Number" : "Phone Number",
      value: maskAccountNumber(
        beneficiary?.record?.accountNumber || beneficiary?.record?.walletAccountNumber || beneficiary.record?.beneficiaryPhoneNumber
      ),
      key: 1
    },
    {
      label: "Account Name",
      value: capitalizeFirstLetter(
        beneficiary?.record?.accountName || beneficiary?.record?.walletAccountName
      ),
      key: 2
    },
    {
      label: "Delivery Method",
      value: beneficiary?.record?.deliveryMethod,
      key: 3
    },
  ]
  .filter(x => {
    if (beneficiary?.record?.deliveryMethod?.toUpperCase() !== "BANK") {
      return x.key !== 2
    }
    return x
  })

  const transferDetails = [
    {
      label: "You send exactly",
      value: `$${formattedAmount(state.initiateFundTransfer?.totalAmount)}`,
    },
    {
      label: "Total fees",
      value: `$${formattedAmount(state.initiateFundTransfer?.totalFees)}`,
    },
    {
      label: `${capitalizeFirstLetter(
        beneficiary?.record?.accountName || beneficiary?.record?.walletAccountName || beneficiary.record?.beneficiaryPhoneNumber
      )} gets`,
      value: `$${formattedAmount(state.initiateFundTransfer?.amount)}`,
    },
  ];

  useEffect(() => {
    dispatch(
      setSendState(
        new AppPayload("initiateFundTransfer", {
          ...state.initiateFundTransfer,
          fundSource: otherTransferPayload.sourceOfFund as string,
          transferPurpose: otherTransferPayload.purposeOfTransfer as string,
        })
      )
    );
  }, [otherTransferPayload.sourceOfFund, otherTransferPayload.purposeOfTransfer]);

  if (loading) {
    return (
      <Loader message="Connecting to payment gateway..." />
    )
  }

  return (
    <View className="flex-1">
      <View className="px-5 flex-1 mb-5">
        <OnboardingHeader title="Does everything look perfect?" description="" />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <Select
            label="Purpose of transfer"
            options={options}
            onSelect={(value) =>
              setOtherTransferPayload({ ...otherTransferPayload, sourceOfFund: value })
            }
          />
          <Select
            label="Source of fund"
            options={sourceOfFund}
            onSelect={(value) =>
              setOtherTransferPayload({ ...otherTransferPayload, purposeOfTransfer: value })
            }
          />
          <View className="mt-2 flex-1">
            <View className="flex-row justify-between items-center mb-5">
              <Text className="dark:text-white font-InterBold text-base">Recipient Details</Text>
              {/* <TouchableOpacity
                onPress={() => router.back()}
                className="border-b border-black dark:border-white"
              >
                <Text className="dark:text-white">Edit</Text>
              </TouchableOpacity> */}
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
              {/* <TouchableOpacity
                onPress={() => router.back()}
                className="border-b border-black dark:border-white"
              >
                <Text className="dark:text-white">Edit</Text>
              </TouchableOpacity> */}
            </View>
            {transferDetails.map((item, index) => (
              <View key={index} className="mb-5">
                <Text className="text-[#888888]">{item.label}</Text>
                <Text className="dark:text-white mt-1">{item.value}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
        <Button
          type="primary"
          onPress={() => onNavigatingToPaymentGateway(data, state.initiateFundTransfer)}
          loading={processing}
          disabled={processing}
        >
          Continue
        </Button>
      </View>
      <Flower />
    </View>
  );
};

export default TransactionConfirmation;
