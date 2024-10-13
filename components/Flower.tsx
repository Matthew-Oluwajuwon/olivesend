import { View, Image } from "react-native";
import React from "react";

const Flower = () => {
  return (
    <View className="absolute bottom-0 -z-10 right-5 rotate-180">
      <Image source={require("@/assets/images/leaf-layout-1.png")} />
      <Image source={require("@/assets/images/leaf-layout-2.png")} />
      <Image source={require("@/assets/images/leaf-layout-3.png")} />
    </View>
  );
};

export default Flower;
