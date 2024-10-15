import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import OnboardingHeader from "@/components/OnboardingHeader";
import { useColorScheme } from "nativewind";
import driversLicense from "@/assets/svg/driverLincenseSvg";
import internationalPassportSvg from "@/assets/svg/internationaPassportSvg";
import nationalIdSvg from "@/assets/svg/nationalIdSvg";
import { FontAwesome6 } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";
import Flower from "@/components/Flower";
import { router } from "expo-router";
import { DocType } from "@/models/application/state";
import { useDocumentCapture } from "@/hooks";

interface DataProp {
  icon: any;
  title: string;
  description: string;
  type: DocType
}

const IdentityVerification = () => {
  const { colorScheme } = useColorScheme();
  const { pickDocType } = useDocumentCapture()
  const data: DataProp[] = [
    {
      icon: nationalIdSvg({ color: colorScheme === "light" ? "#000000" : "#f5f5f5" }),
      title: "National ID Card",
      description: "Scan and upload your national id card",
      type: "NATIONAL_ID_CARD",
    },
    {
      icon: internationalPassportSvg({
        color: colorScheme === "light" ? "#000000" : "#f5f5f5",
      }),
      title: "International Passport",
      description: "Scan and upload your international passport",
      type: "INTERNATIONAL_PASSPORT",
    },
    {
      icon: driversLicense({
        color: colorScheme === "light" ? "#000000" : "#f5f5f5",
      }),
      title: "Driver's license",
      description: "Scan and upload your driver's license",
      type: "DRIVER_LICENSE",
    },
  ];
  
  return (
    <View className="px-5 mt-3 flex-1 relative">
      <OnboardingHeader title="Verify your identity" description="" />
      <View className="flex-1 mt-10">
        {data.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => pickDocType(item.type)} className="flex-row justify-between items-center mb-12">
            <View className="flex-row items-center">
              <SvgXml width="20" height="20" xml={item.icon} />
              <View className="gap-3 ml-3">
                <Text
                  className="font-[inter-bold]"
                  style={{
                    color: colorScheme === "dark" ? "#f5f5f5" : "#1B1D21",
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: colorScheme === "dark" ? "#c4c4c4" : "#1B1D21",
                  }}
                >
                  {item.description}
                </Text>
              </View>
            </View>
            <FontAwesome6
              name="angle-right"
              size={20}
              color={colorScheme === "dark" ? "#f5f5f5" : "black"}
            />
          </TouchableOpacity>
        ))}
      </View>
      <Pressable className="self-center mb-10" onPress={() => router.navigate("/(onboarding)/createPIN")}>
        <Text className="dark:text-white text-center">I'll do this later</Text>
      </Pressable>
      <Flower />
    </View>
  );
};

export default IdentityVerification;
