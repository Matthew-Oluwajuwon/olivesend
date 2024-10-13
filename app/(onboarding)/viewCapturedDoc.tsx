import { View, Text, Image, Pressable } from "react-native";
import React, { useCallback } from "react";
import OnboardingHeader from "@/components/OnboardingHeader";
import Button from "@/components/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAuthState } from "@/store/slice";
import { AppPayload } from "@/models/application/payload";
import { router } from "expo-router";
import Pdf from "react-native-pdf";

const ViewCapturedDoc = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => {
    return state.auth;
  });

  const onRetakePhoto = useCallback(() => {
    router.back();
    dispatch(setAuthState(new AppPayload("imageBase64", "")));
  }, [dispatch]);
 
  return (
    <View className="px-5 mt-3 flex-1 relative">
      <OnboardingHeader title="Verify your identity" description="" />
      <View className="flex-1 justify-center items-center bg-[#FFFFFF] dark:bg-primary-dark relative">
        <View className="h-60 rounded-[20px] w-full overflow-hidden border border-[#747474] bg-[#494949]">
          {state.mimeType ? (
            <Pdf source={{ uri: state.imageBase64, cache: true }} style={{ flex: 1 }} />
          ) : (
            <Image
              source={{
                uri: `data:"image/jpeg;base64,${state.imageBase64}`,
              }}
              className="w-full h-full"
            />
          )}
        </View>
        <Text className="text-sm dark:text-[#F5F5F5] font-InterRegular text-center w-[80%] mx-auto my-10">
          Make sure your details are clear and unobstructed
        </Text>
        <View className="absolute bottom-10 w-full">
          <Button type="primary" className="w-full">
            Submit photo
          </Button>
          <Pressable className="self-center mx-auto mt-5" onPress={onRetakePhoto}>
            <Text className="dark:text-white">Retake photo</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ViewCapturedDoc;
