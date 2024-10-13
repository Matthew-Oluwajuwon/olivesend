import { View, Text } from "react-native";
import React from "react";

export interface OnboardingHeaderProps {
  title: string;
  description: string;
}

const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({ description, title }) => {
  return (
    <View>
      <Text className="font-InterBold dark:text-white text-2xl">{title}</Text>
      <Text className="font-InterRegular text-[#888888] text-sm mt-3">{description}</Text>
    </View>
  );
};

export default OnboardingHeader;
