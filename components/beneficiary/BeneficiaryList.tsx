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

const BeneficiaryList = () => {
  const { colorScheme } = useColorScheme();
  const { filteredData, reversedArray, isFetching, isLoading, isError, refetch } = useBeneficiary();
  const [deleteIndex, setdeleteIndex] = useState<number>();
  const { loading, onDeleteBeneficiary } = useDeleteBeneficiary();

  const renderedItem = ({ item, index }: { item: Beneficiary; index: number }) => (
    <View className="flex-row items-center justify-between mt-8">
      <TouchableOpacity className="flex-row items-center">
        {item.country?.countryFlag?.includes(".svg") ? (
          <View className="rounded-full w-[24px] h-[24px] items-center justify-center overflow-hidden">
            <SvgXml xml={item.country.countryFlag} width="30" height="30" />
          </View>
        ) : (
          <Image
            source={{ uri: item.country.countryFlag }}
            style={{ width: 24, height: 24 }}
            width={24}
            height={24}
            className="rounded-full"
          />
        )}
        <View className="ml-3">
          <View className="flex-row items-center mb-2">
            <Text className="text-sm dark:text-white">
              {capitalizeFirstLetter(item.accountName as string) ||
                capitalizeFirstLetter(item.walletAccountName as string) ||
                "N/A"}
            </Text>
            <View className="rounded-full py-1 px-3 ml-2 flex-row items-center bg-[#F0F0F0] dark:bg-[#333333]">
              <Text className="text-sm dark:text-white">
                {item?.country?.shortName === "US" ? "USA" : item?.country?.shortName}
              </Text>
            </View>
          </View>
          <Text className="text-sm dark:text-white truncate max-w-[10rem] break-words">
            {maskAccountNumber(item.accountNumber || item.walletAccountNumber)} |{" "}
            {item.bankName ?? item.walletType}
          </Text>
        </View>
      </TouchableOpacity>
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

  if (isLoading || isFetching) {
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      <ActivityIndicator color={colorScheme === "dark" ? "#F5F5F5" : "#102E34"} />
    </View>;
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
