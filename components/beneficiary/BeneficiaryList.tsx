import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { Beneficiary } from "@/models/client/response";
import { capitalizeFirstLetter, maskAccountNumber } from "@/utils/helper";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";
import { useColorScheme } from "nativewind";
import { useBeneficiary, useDeleteBeneficiary } from "@/hooks";
import BeneficiaryDetail from "./BeneficiaryDetail";

const BeneficiaryList = () => {
  const { colorScheme } = useColorScheme();
  const { filteredData, reversedArray, isFetching, isLoading, isError, refetch } = useBeneficiary();
  const [deleteIndex, setdeleteIndex] = useState<number>();
  const { loading, onDeleteBeneficiary } = useDeleteBeneficiary();

  const renderedItem = ({ item, index }: { item: Beneficiary; index: number }) => (
    <View className="flex-row items-center justify-between mt-8">
      <BeneficiaryDetail item={item} />
      {deleteIndex === index && loading ? (
        <ActivityIndicator />
      ) : (
        <TouchableOpacity
          onPress={() => {
            onDeleteBeneficiary(item.id);
            setdeleteIndex(index);
          }}
        >
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100 p-4">
        <ActivityIndicator color={colorScheme === "dark" ? "#F5F5F5" : "#102E34"} />
      </View>
    );
  }

  if (reversedArray?.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100 p-4">
        <AntDesign name="exclamationcircle" size={40} color="#FF6D00" />
        <Text className="text-gray-500 mt-4 text-lg font-medium">No beneficiary created yet.</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100 p-4">
        <FontAwesome name="exclamation-triangle" size={40} color="#FF6D00" />
        <Text className="text-gray-500 mt-4 text-lg font-medium">
          Unable to retrieve beneficiaries.
        </Text>
      </View>
    );
  }

  return (
    <View className="p-5 flex-1">
      <Text className="font-InterRegular text-sm dark:text-white mb-3">My beneficiaries</Text>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        renderItem={renderedItem}
        className="flex-1"
        refreshControl={
          <RefreshControl
            onRefresh={refetch}
            refreshing={isFetching}
            tintColor={colorScheme === "dark" ? "#F5F5F5" : "#102E34"}
          />
        }
      />
    </View>
  );
};

export default BeneficiaryList;
