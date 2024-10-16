import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import Flower from "./Flower";
import { useAppDispatch } from "@/store/hooks";
import { setAuthState } from "@/store/slice";
import { AppPayload } from "@/models/application/payload";

interface ResponseScreenProps {
  title: string;
  message: string;
  executeOnMount: () => void;
}

const ResponseScreen: React.FC<ResponseScreenProps> = ({ message, title, executeOnMount }) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setAuthState(new AppPayload("showSuccessOnboarding", false)))
      
    }, 1000);
    executeOnMount();

    return () => {
      clearTimeout(timeout)
    }
  }, [executeOnMount, dispatch]);

  return (
    <View className="flex-1 items-center justify-center relative">
      <Image source={require("@/assets/images/success-check.png")} />
      <Text className="font-[inter-bold] text-2xl dark:text-white">{title}</Text>
      <Text className={`font-[inter-regular] mt-3 text-sm text-[#888888]`}>{message}</Text>
      <Flower />
    </View>
  );
};

export default ResponseScreen;
