import { View } from "react-native";
import React from "react";

const Indicator = ({ indexPostion }: { indexPostion: number }) => {
  return (
    <View className="flex-row items-center mt-28 gap-2">
      <View
        className={`border-[3px] flex-1 rounded-[3px] ${
          indexPostion !== 0 ? "border-light-gray dark:border-secondary-dark" : "border-black dark:border-white"
        }`}
      />
      <View
        className={`border-[3px] flex-1 rounded-[3px] ${
          indexPostion !== 1 ? "border-light-gray dark:border-secondary-dark" : "border-black dark:border-white"
        }`}
      />
      <View
        className={`border-[3px] flex-1 rounded-[3px] ${
          indexPostion !== 2 ? "border-light-gray dark:border-secondary-dark" : "border-black dark:border-white"
        }`}
      />
    </View>
  );
};
 
export const CarouselIndicator = React.memo(Indicator);
