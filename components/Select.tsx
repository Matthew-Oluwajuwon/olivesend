import React, { useRef, useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Pressable,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacityProps,
} from "react-native";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useColorScheme } from "nativewind";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // To handle safe areas on devices
import { Entypo } from "@expo/vector-icons";

interface Option {
  label: string;
  value: string | number;
  image?: string; // Optional image URL
  code?: string;
}

export interface SelectProps extends TouchableOpacityProps {
  options: Option[];
  placeholder?: string;
  onSelect: (value: string | number) => void;
  label?: string; // Label for the Select component
  labelProps?: object; // Additional props for the label if needed
  value?: string | number; // Selected value
  loading?: boolean;
  isDarkColoredBg?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onSelect,
  label,
  value,
  labelProps = {},
  loading,
  isDarkColoredBg,
  ...rest
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null); // Store full selected option
  const [searchQuery, setSearchQuery] = useState<string>(""); // State to manage the search input
  const { colorScheme } = useColorScheme(); // Getting the current color scheme
  const { bottom } = useSafeAreaInsets(); // Safe area inset for bottom of the screen

  const bottomSheetModalRef = useRef<any>(null); // BottomSheetModal reference
  const { dismiss } = useBottomSheetModal(); // To dismiss the modal

  // Safe area inset to adjust for device-specific screen edges
  const snapPoints = useMemo(
    () => [
      "50%", // Collapse the BottomSheet to 25% height initially
      "75%", // Open it halfway
      "85%", // Fully expanded to take up the full height of the screen
    ],
    []
  );

  useEffect(() => {
    // If value is provided, find the selected option; otherwise, set the first available option
    const selected = options.find((option) => option.value === value);
    if (selected) {
      setSelectedOption(selected);
    } else if (options.length > 0) {
      // Set the first option if available
      setSelectedOption(options[0]);
    } else {
      setSelectedOption(null); // No options available
    }
  }, [value, options]);

  // Filter options based on the search query
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (option: Option) => {
    setSelectedOption(option); // Set the full option
    onSelect(option.value); // Pass only the value to the parent
    bottomSheetModalRef.current?.dismiss(); // Close the bottom sheet after selection
  };

  const handleDismiss = () => {
    dismiss();
  };

  return (
    <View className="mb-5 relative">
      {/* Label */}
      {label && (
        <Text className="text-black dark:text-white mb-2" {...labelProps}>
          {label}
        </Text>
      )}

      {/* Input field */}
      <TouchableOpacity
        className={`border rounded-[20px] flex-row items-center justify-between p-4 border-gray-500 dark:border-dark-gray-500 ${rest.className}`}
        onPress={() => bottomSheetModalRef.current?.present()} // Open the bottom sheet when tapped
        {...rest}
      >
        <Text className="text-black dark:text-[#F5F5F5]">
          {selectedOption ? (
            <View className="flex-row items-center">
              {selectedOption.image && (
                <Image
                  source={{ uri: selectedOption.image }}
                  className="w-5 h-5 mr-2 rounded-full"
                />
              )}
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                className={`text-black ${
                  isDarkColoredBg && "text-white"
                } text-base font-InterRegular dark:text-[#F5F5F5]`}
              >
                {selectedOption.label}
              </Text>
            </View>
          ) : (
            placeholder
          )}
        </Text>
        {loading ? (
          <ActivityIndicator color={colorScheme === "dark" ? "white" : "black"} />
        ) : (
          <Entypo
            name="chevron-down"
            size={20}
            style={{ marginTop: -6 }}
            color={colorScheme === "dark" || isDarkColoredBg ? "white" : "black"}
          />
        )}
      </TouchableOpacity>

      {/* Bottom Sheet Modal for Dropdown */}
      <BottomSheetModal
        backgroundStyle={{
          borderRadius: 20,
          backgroundColor: colorScheme === "light" ? "white" : "#1f1f1f",
        }}
        animateOnMount
        containerStyle={{ backgroundColor: "#00000050" }}
        backdropComponent={() => (
          <Pressable
            onPress={handleDismiss}
            style={styles.backdrop}
            className="absolute inset-0 bg-black opacity-50"
          />
        )}
        ref={bottomSheetModalRef}
        index={0} // Start from the bottom (collapsed)
        snapPoints={snapPoints}
        style={{ padding: 20, marginBottom: bottom }} // Adds bottom safe area padding
        enableDismissOnClose
        onDismiss={handleDismiss}
        handleIndicatorStyle={{
          backgroundColor: colorScheme === "dark" ? "white" : "#D8D8D8",
          width: 75,
        }}
      >
        {/* Wrap everything in TouchableWithoutFeedback to dismiss the keyboard when tapping outside */}
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View className="mt-2">
            {/* Search Input */}
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search..."
              className="border border-gray-500 dark:border-dark-gray-500 rounded-[20px] dark:text-white p-3"
            />

            {/* FlatList directly inside the BottomSheetModal */}
            <View className="bg-white dark:bg-[#1F1F1F] p-4 border-gray-500 dark:border-dark-gray-500">
              <FlatList
                data={filteredOptions.sort((a, b) => a.label?.localeCompare(b.label))} // Use filtered options
                keyExtractor={(item) => item.value.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="flex-row items-center py-2 mb-1"
                    onPress={() => handleSelect(item)} // Pass the entire option object
                  >
                    <Image source={{ uri: item.image }} className="w-5 h-5 mr-3 rounded-full" />
                    
                    <Text style={{
                      marginLeft: item.image ? 0 : -30
                    }} className="text-base text-gray-800 dark:text-white font-InterRegular">
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </BottomSheetModal>
    </View>
  );
};
const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default React.memo(Select);
