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
} from "react-native";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useColorScheme } from "nativewind";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // To handle safe areas on devices

interface Option {
  label: string;
  value: string | number;
  image?: string; // Optional image URL
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onSelect: (value: string | number) => void;
  label?: string; // Label for the Select component
  labelProps?: object; // Additional props for the label if needed
  value?: string | number; // Selected value
  loading?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onSelect,
  label,
  value,
  labelProps = {},
  loading,
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

  // Update selectedOption when value prop changes
  useEffect(() => {
    const selected = options.find((option) => option.value === value);
    setSelectedOption(selected || null);
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
    <View className="mb-5 relative flex-1">
      {/* Label */}
      {label && (
        <Text className="text-black dark:text-white mb-2" {...labelProps}>
          {label}
        </Text>
      )}

      {/* Input field */}
      <TouchableOpacity
        className="border rounded-[20px] flex-row justify-between p-4 border-gray-500 dark:border-dark-gray-500"
        onPress={() => bottomSheetModalRef.current?.present()} // Open the bottom sheet when tapped
      >
        <Text className="text-black dark:text-[#F5F5F5]">
          {selectedOption ? (
            <View className="flex-row items-center">
              {selectedOption.image && (
                <Image
                  source={{ uri: selectedOption.image }}
                  className="w-5 h-5 mr-3 rounded-full"
                />
              )}
              <Text className="text-black dark:text-[#F5F5F5]">{selectedOption.label}</Text>
            </View>
          ) : (
            placeholder
          )}
        </Text>
        {loading && <ActivityIndicator color={colorScheme === "dark" ? "white" : "black"} />}
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
      >
        {/* Wrap everything in TouchableWithoutFeedback to dismiss the keyboard when tapping outside */}
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
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
                    {item.image ? (
                      <Image source={{ uri: item.image }} className="w-5 h-5 mr-3 rounded-full" />
                    ) : (
                      <View className="w-5 h-5 mr-3 rounded-full">
                        <Text className="text-gray-800 dark:text-white">
                          {item.label?.slice(0, 2).toUpperCase()}
                        </Text>
                      </View>
                    )}
                    <Text className="text-base text-gray-800 dark:text-white font-InterRegular">
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
