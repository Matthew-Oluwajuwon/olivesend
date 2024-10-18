import { Text, Pressable } from "react-native";
import React from "react";

import { SvgXml } from "react-native-svg";

interface Item {
  icon?: any;
  label: string;
  value: string;
}

interface TabSwitcherProps {
  onPress: (value: any) => void;
  index: number;
  showIcon: boolean;
  item: Item;
  color: string;
  backgroundColor: string;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({
  index,
  onPress,
  showIcon,
  item,
  color,
  backgroundColor,
}) => {

    return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-center w-1/2 py-4 rounded-[20px]"
      style={{
        backgroundColor,
      }}
      key={index}
    >
      {showIcon && <SvgXml width="20" height="20" xml={item.icon} />}
      <Text
        className="ml-3 font-InterRegular"
        style={{
          color,
        }}
      >
        {item.label}
      </Text>
    </Pressable>
  );
};

export default TabSwitcher;
