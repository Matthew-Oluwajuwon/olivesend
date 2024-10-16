import React from "react";
import { Image, Text } from "react-native";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <Tabs>
      <Tabs.Screen
        name="(send)/index"
        options={{
          title: "Send",
          tabBarLabelStyle: {
            color:
              colorScheme === "light" ? "#000000" : colorScheme == "dark" ? "#f5f5f5" : "#888888",
            fontSize: 12,
          },
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/icons/active-send.png")
                  : require("@/assets/icons/inactive-send.png")
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(airtime)/index"
        options={{
          title: "Airtime",
          tabBarLabelStyle: {
            color:
              colorScheme === "light" ? "#000000" : colorScheme == "dark" ? "#f5f5f5" : "#888888",
            fontSize: 12,
          },
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/icons/active-airtime.png")
                  : require("@/assets/icons/inactive-airtime.png")
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(account)/index"
        options={{
          title: "Account",
          tabBarLabelStyle: {
            color:
              colorScheme === "light" ? "#000000" : colorScheme == "dark" ? "#f5f5f5" : "#888888",
            fontSize: 12,
          },
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/icons/active-account.png")
                  : require("@/assets/icons/inactive-account.png")
              }
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(info)/index"
        options={{
          title: "Info",
          tabBarLabelStyle: {
            color:
              colorScheme === "light" ? "#000000" : colorScheme == "dark" ? "#f5f5f5" : "#888888",
            fontSize: 12,
          },
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/icons/active-info.png")
                  : require("@/assets/icons/inactive-info.png")
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}
