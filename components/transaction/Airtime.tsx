import { ActivityIndicator, View, Text, RefreshControl, FlatList } from "react-native";
import React from "react";
import { TransactionDTOS } from "@/models/client/response";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import TransactionRow from "../TransactionRow";
import { useGetTransactionHistory } from "@/hooks";

const Airtime = () => {
  const {
    isError,
    isLoading,
    isFetching,
    transactionList,
    colorScheme,
    page,
    handleRefresh,
    handleScroll,
  } = useGetTransactionHistory();
  const RenderedItem = React.memo(({ item, index }: { item: TransactionDTOS; index: number }) => (
    <TransactionRow item={item} key={index} />
  ));
  // Footer to show when fetching more data
  const renderFooter = () => {
    if (!isFetching) return null;
    return (
      <View className="py-4">
        <ActivityIndicator color={colorScheme === "dark" ? "white" : "black"} />
      </View>
    );
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100 p-4">
        <ActivityIndicator color={colorScheme === "dark" ? "white" : "black"} />
      </View>
    );
  }

  if (transactionList?.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100 p-4">
        <AntDesign name="exclamationcircle" size={40} color="#B0B0B0" />
        <Text className="text-gray-500 mt-4 text-lg font-medium">No transactions yet.</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100 p-4">
        <FontAwesome name="exclamation-triangle" size={40} color="#FF6D00" />
        <Text className="text-gray-500 mt-4 text-lg font-medium">
          Unable to retrieve transactions.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={transactionList}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => <RenderedItem item={item} index={index} />}
      className="flex-1"
      onEndReachedThreshold={0.1}
      onEndReached={() => {
        if (!isFetching || !isLoading) {
          handleScroll();
        }
      }}
      refreshControl={
        <RefreshControl
          onRefresh={handleRefresh}
          refreshing={isFetching && page === 1}
          tintColor={colorScheme === "dark" ? "#F5F5F5" : "#102E34"}
        />
      }
      ListFooterComponent={renderFooter}
    />
  );
};

export default Airtime;
