import {
  View,
  Text,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { SvgXml } from "react-native-svg";
import addBeneficiarySvg from "@/assets/svg/addBeneficiarySvg";
import BeneficiaryList from "@/components/beneficiary/BeneficiaryList";
import { useBeneficiary } from "@/hooks";
import Flower from "@/components/Flower";
import { router } from "expo-router";
import SearchBar from "@/components/SearchBar";

const Beneficiary = () => {
  const { colorScheme } = useColorScheme();
  const { handleSearch, searchText } = useBeneficiary();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="dark:bg-primary-dark py-5 flex-1 relative">
          <SearchBar onSearch={handleSearch} value={searchText} />
          <TouchableOpacity onPress={() => router.navigate("/(beneficiary)/createBeneficiary")} className="flex-row items-center justify-between px-5">
            <View className="flex-row items-center">
              <SvgXml
                width="20"
                height="20"
                xml={addBeneficiarySvg({
                  color: colorScheme === "light" ? "black" : "#f5f5f5",
                })}
              />
              <Text className="ml-5 font-InterBold dark:text-white">Add a new beneficiary</Text>
            </View>
            <Ionicons
              name="chevron-forward-sharp"
              size={20}
              color={colorScheme === "light" ? "black" : "#f5f5f5"}
            />
          </TouchableOpacity>
          <View className="border-b mt-5 border-[#D8D8D8] dark:border-[#333333]" />
          <BeneficiaryList />
          <Flower />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Beneficiary;
