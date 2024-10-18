import { View, TextInput } from "react-native";
import React from "react";
import { useColorScheme } from "nativewind";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  onSearch: (value: string) => void;
  value: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, value }) => {
  const { colorScheme } = useColorScheme();
  return (
    <View className="mb-7 border mx-5 border-[#D8D8D8] dark:border-[#333333] bg-[#F0F0F0] dark:bg-[#242424] rounded-[20px] p-[15px] flex-row items-center">
      <Ionicons
        name="search-outline"
        size={24}
        color={colorScheme === "dark" ? "white" : "black"}
      />
      <TextInput
        placeholder="Enter name to search"
        onChangeText={onSearch}
        value={value}
        placeholderTextColor="#888888"
        className="ml-5 dark:text-white w-full"
      />
    </View>
  );
};

export default SearchBar;
