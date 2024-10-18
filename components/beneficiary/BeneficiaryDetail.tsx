import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { capitalizeFirstLetter, maskAccountNumber } from "@/utils/helper";
import { SvgXml } from "react-native-svg";
import { Beneficiary } from "@/models/client/response";
import useBeneficiarySelection from "@/hooks/beneficiary/useBeneficiarySelection";

const BeneficiaryDetail = ({ item }: { item: Beneficiary }) => {
  const { onBeneficiaryClicked } = useBeneficiarySelection();
  return (
    <TouchableOpacity onPress={() => onBeneficiaryClicked("ADD", item)} className="flex-row items-center">
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
  );
};

export default BeneficiaryDetail;
