import { ScrollView, TouchableOpacity, Text } from "react-native";
import React from "react";
import Timeline from "react-native-timeline-flatlist";
import { TransactionDTOS } from "@/models/client/response";
import { useColorScheme } from "nativewind";

interface UpdateProps {
  item: TransactionDTOS;
  onViewReceipt: () => void;
}

const Update: React.FC<UpdateProps> = ({ item, onViewReceipt }) => {
  const { colorScheme } = useColorScheme();
  const data = [
    {
      time: new Date(item.createdAt).toDateString(),
      title: "Transfer request created",
    },
    {
      time: new Date(item.createdAt).toDateString(),
      title:
        item.walletType || item.bankName
          ? `Transfer request was sent to ${item.bankName ?? item.walletType}`
          : "Transfer request was sent.",
    },
    item.status?.toLowerCase().includes("success")
      ? {
          time: new Date(item.updatedAt).toDateString(),
          title: "Customer account credited",
          description: `We sent $${item.amount} to ${item.accountName ?? item.walletAccountName}`,
        }
      : item.status?.toLowerCase().includes("failed")
      ? {
          time: new Date(item.updatedAt).toDateString(),
          title: "Transaction failed",
          description: `We were unable to send $${item.amount} to ${
            item.accountName ?? item.walletAccountName
          }`,
        }
      : {},
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      className="mt-5 flex-1"
    >
      <Timeline
        data={data}
        circleSize={10}
        circleColor="#92CCBF"
        lineColor="#92CCBF"
        timeContainerStyle={{ minWidth: 52, height: 100 }}
        timeStyle={{ color: "#888888", width: 70 }}
        descriptionStyle={{ color: "red" }}
        style={{ flex: 1, marginTop: 5 }}
        titleStyle={{
          marginTop: -15,
          color: colorScheme === "dark" ? "white" : "black",
        }}
        isUsingFlatlist={false}
      />
      <TouchableOpacity onPress={onViewReceipt} className="self-center my-5">
        <Text className="dark:text-white">View reciept</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Update;
