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
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

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
  const { colorScheme } = useColorScheme();
  const dispatch = useAppDispatch();
  const { type } = useLocalSearchParams();
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
  const processing = isFetching || isLoading;

  const recipientDetails = [
    {
      label:
        type === "AIRTIME"
          ? "Phone Number"
          : beneficiary?.record?.deliveryMethod?.toUpperCase() === "BANK"
          ? "Account Number"
          : "Wallet Number",
      value: maskAccountNumber(
        type === "AIRTIME"
          ? state.initiateAirtime?.beneficiaryPhoneNumber
          : beneficiary?.record?.accountNumber || beneficiary?.record?.walletAccountNumber
      ),
      key: 1,
    },
    {
      label:
        beneficiary?.record?.deliveryMethod?.toUpperCase() === "BANK"
          ? "Account Name"
          : "Wallet Name",
      value: capitalizeFirstLetter(
        beneficiary?.record?.accountName || beneficiary?.record?.walletAccountName
      ),
      key: 2,
    },
    {
      label: "Delivery Method",
      value: type === "AIRTIME" ? "AIRTIME" : beneficiary?.record?.deliveryMethod,
      key: 3,
    },
  ].filter((x) => {
    if (type !== "TRANSFER") {
      return x.key !== 2;
    }
    return x;
  });

  const transferDetails = [
    {
      label: "You send exactly",
      value: `$${formattedAmount(
        type === "AIRTIME" ? state.initiateAirtime?.amount : state.initiateFundTransfer?.totalAmount
      )}`,
    },
    {
      label: "Total fees",
      value: `$${formattedAmount(state.initiateFundTransfer?.totalFees)}`,
    },
    {
      label: `${capitalizeFirstLetter(
        type === "AIRTIME"
          ? state.initiateAirtime?.beneficiaryPhoneNumber
          : beneficiary?.record?.accountName || beneficiary?.record?.walletAccountName
      )} gets`,
      value: `$${formattedAmount(
        type === "AIRTIME" ? state.initiateAirtime.amount : state.initiateFundTransfer?.amount
      )}`,
    },
  ];

  useEffect(() => {
    if (type === "TRANSFER") {
      dispatch(
        setSendState(
          new AppPayload("initiateFundTransfer", {
            ...state.initiateFundTransfer,
            fundSource: otherTransferPayload.sourceOfFund as string,
            transferPurpose: otherTransferPayload.purposeOfTransfer as string,
          })
        )
      );
    } else {
      dispatch(
        setSendState(
          new AppPayload("initiateAirtime", {
            ...state.initiateAirtime,
            fundSource: otherTransferPayload.sourceOfFund as string,
            transferPurpose: otherTransferPayload.purposeOfTransfer as string,
          })
        )
      );
    }
  }, [otherTransferPayload.sourceOfFund, otherTransferPayload.purposeOfTransfer, type]);

  if (loading) {
    return <Loader message="Connecting to payment gateway..." />;
  }

  return (
    <View className="flex-1">
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
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
        </ScrollView>
        <Button
          type="primary"
          onPress={() =>
            onNavigatingToPaymentGateway(
              data,
              type as "AIRTIME" | "TRANSFER",
              state.initiateFundTransfer,
              state.initiateAirtime
            )
          }
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
