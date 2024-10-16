import React from "react";
import { Image } from "react-native";
import { Tabs } from "expo-router";
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
          headerTitle: () => (
            <Image
              source={require("@/assets/images/logo.png")}
              style={{ width: 100, height: 30, marginBottom: 10 }}
              resizeMode="contain"
            />
          ),
          headerLeft: () => (
            <Image
              source={
                colorScheme === "light" ? require("@/assets/images/headerShadow.png") : undefined
              }
              resizeMode="contain"
            />
          ),
          headerRight: () => (
            <Image source={require("@/assets/icons/notification.png")} className="mr-5" resizeMode="contain" />
          ),
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#121212" : "#002026",
            shadowColor: "#92CCBF1A",
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
