import PIN from "@/components/PIN";
import usePinCreation from "@/hooks/onboarding/usePinCreation";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CreatePIN = () => {
  const { bottom } = useSafeAreaInsets();
  const { onContinue } = usePinCreation()

  return (
    <View className="px-5 mt-3 flex-1 relative bg-[#102E34]">
      <StatusBar style="light" />
      <Text className="font-InterBold text-white text-2xl">You are almost there!</Text>
      <Text className="font-InterRegular text-[#ffffff] text-sm mt-3">
        Create your transaction PIN
      </Text>
      <View className="flex-1">
        <PIN onPress={onContinue} buttonName="Continue" pinTitle="Enter PIN" />
        <Pressable
          className="self-center"
          style={{ marginBottom: bottom }}
          onPress={() => router.navigate("/login")}
        >
          <Text className="text-white text-center">I'll do this later</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CreatePIN;
