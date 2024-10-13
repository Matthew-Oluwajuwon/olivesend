import { CarouselIndicator } from "@/components/CarouselIndicator";
import { CarouselItem, data } from "@/components/CarouselItem";
import { useRef, useState } from "react";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel, {
  ICarouselInstance,
  TCarouselProps,
} from "react-native-reanimated-carousel";
import { useWindowDimensions, View } from "react-native";
import Button from "@/components/Button";
import { router } from "expo-router";

export default function Index() {
  const { width } = useWindowDimensions()
  const ref = useRef<ICarouselInstance>(null);
  const scrollOffsetValue = useSharedValue<number>(0);
  const [index, setIndex] = useState(0);

  const baseOptions = {
    vertical: false,
    width,
    loop: true,
    enabled: true,
    ref,
    defaultScrollOffsetValue: scrollOffsetValue,
    autoPlay: true,
    autoPlayInterval: 3000,
    style: { width: "100%" },
    data,
    onScrollEnd: (index: number) => setIndex(index),
    renderItem: ({ index }: { index: number }) => (
      <CarouselItem indexPostion={index} />
    ),
  } as TCarouselProps;
  const buttonWidth = width / 2 - 20
  
  return (
    <SafeAreaView className="flex-1 px-3">
      <CarouselIndicator indexPostion={index} />
      <Carousel {...baseOptions} />
      <View className="flex-row justify-center gap-3">
        <Button type="primary" onPress={() => router.navigate("/login")} style={{width: buttonWidth}}>Log in</Button>
        <Button type="default" onPress={() => router.navigate("/(onboarding)/createPIN")} style={{width: buttonWidth}}>Sign up</Button>
      </View>
    </SafeAreaView>
  );
}
