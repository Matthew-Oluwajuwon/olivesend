import { View, Text, Animated, Easing } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  const [rotation] = useState(new Animated.Value(0));

  const rotateSquare = () => {
    rotation.setValue(0);
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1, // Rotate 360 degrees
        duration: 2000, // Animation duration in milliseconds
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  };

  const rotateAnimation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    rotateSquare();
  }, [rotateSquare]);

  return (
    <View className="flex-1 justify-center bg-white dark:bg-primary-dark">
      <StatusBar hidden />
      <Animated.View
        className="w-28 h-28 mx-auto mb-10 rounded-full border-[14px] border-[#E9E9E9] border-t-[14px] border-t-[#102E34] border-r-[14px] border-r-[#102E34]"
        style={[{ transform: [{ rotate: rotateAnimation }] }]}
      />
      <Text className="font-InterRegular dark:text-white text-center w-[60%] mx-auto text-base">{message}</Text>
    </View>
  );
};

export default Loader;
