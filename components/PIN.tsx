import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";
import Button from "./Button";

interface PINProps {
  onPress: (value: string) => void;
  buttonName: string;
  pinTitle: string;
  loading?: boolean;
}

const PIN: React.FC<PINProps> = ({ buttonName, pinTitle, loading, onPress }) => {
  const [pin, setPin] = useState("");

  const handlePress = (value: any) => {
    if (pin.length < 4) {
      setPin(pin + value);
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  const onClear = () => {
    setPin("");
  };

  const renderCircles = () => {
    return (
      <View className="flex-row justify-center mb-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <View
            key={index}
            className="w-7 h-7 rounded-full border border-[#9A9A9A] mx-2 flex justify-center items-center"
          >
            {/* Display the pin number if it exists at the current index */}
            {pin.length > index ? <Text className="text-white text-xl">{pin[index]}</Text> : null}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View className="flex-1 items-center mt-10 relative">
      <Text className="text-white text-2xl font-bold mb-4">{pinTitle}</Text>
      {renderCircles()}

      <View className="flex-row justify-between my-5">
        {[1, 2, 3].map((num) => (
          <TouchableOpacity
            key={num}
            className="w-16 h-16 justify-center basis-1/3 items-center rounded-full"
            onPress={() => handlePress(num.toString())}
          >
            <Text className="text-white text-2xl">{num}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-row justify-between my-5">
        {[4, 5, 6].map((num) => (
          <TouchableOpacity
            key={num}
            className="w-16 h-16 justify-center basis-1/3 items-center rounded-full"
            onPress={() => handlePress(num.toString())}
          >
            <Text className="text-white text-2xl">{num}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-row justify-between my-5">
        {[7, 8, 9].map((num) => (
          <TouchableOpacity
            key={num}
            className="w-16 h-16 justify-center basis-1/3 items-center rounded-full"
            onPress={() => handlePress(num.toString())}
          >
            <Text className="text-white text-2xl">{num}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-row justify-between my-5">
        <TouchableOpacity
          className="w-16 h-16 justify-center basis-1/3 items-center rounded-full"
          onPress={onClear}
        >
          <Entypo name="dot-single" size={45} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          className="w-16 h-16 justify-center basis-1/3 items-center rounded-full"
          onPress={() => handlePress("0")}
        >
          <Text className="text-white text-2xl">0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleBackspace}
          className="w-16 h-16 justify-center basis-1/3 items-center rounded-full"
        >
          <Ionicons name="arrow-back-outline" color="#FFFFFF" size={24} />
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-7 w-full">
        <Button
          type="primary"
          className="w-full bg-white"
          disabled={pin.length !== 4}
          onPress={() => onPress(pin)}
          textProps={{ className: "text-[#102E34]" }}
          loading={loading}
        >
          {buttonName}
        </Button>
      </View>
    </View>
  );
};

export default PIN;
