import { View, Image, Text, useWindowDimensions } from "react-native";

export const data = [
  {
    text: "Secure and Hassle-free \nTransfers, Anytime, \nAnywhere",
    img: require("@/assets/images/welcom-1.png"),
  },
  {
    text: "Send Money \nGlobally",
    img: require("@/assets/images/welcome-2.png"),
  },
  {
    text: "Send Airtime \nGlobally",
    img: require("@/assets/images/welcome-3.png"),
  },
];

export const CarouselItem = ({ indexPostion }: { indexPostion: number }) => {
  const { width } = useWindowDimensions();
  return (
    <View className="mt-10 flex-1">
      <Text className="font-InterBold text-2xl text-black dark:text-[#F5F5F5]">
        {data[indexPostion].text}
      </Text>
      <View className="relative flex-1 items-center justify-center">
        <Image source={data[indexPostion].img} style={{ width }} resizeMode="contain" />
        <Image
          source={
            indexPostion === 0
              ? require("@/assets/images/leaf-yellow.png")
              : indexPostion === 1
              ? require("@/assets/images/leaf-green.png")
              : undefined
          }
        />
      </View>
    </View>
  );
};
