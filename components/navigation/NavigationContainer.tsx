import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Stack, router, useSegments } from "expo-router";
import { useColorScheme } from "nativewind";
import { useAppSelector } from "@/store/hooks";

const NavigationContainer = () => {
  const state = useAppSelector((state) => {
    return state.auth;
  });
  const { colorScheme } = useColorScheme();
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(tabs)";
    if (state.isAuthenticated && !inAuthGroup) {
      router.replace("/(tabs)/(send)");
    } else if (!state.isAuthenticated && inAuthGroup) {
      router.replace("/");
    }
  }, [state.isAuthenticated]);

  return (
    <Stack
      screenOptions={{
        headerTitle: "",
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: colorScheme === "dark" ? "#121212" : "white",
        },
        contentStyle: {
          backgroundColor: colorScheme === "dark" ? "#121212" : "white",
        },
        headerTintColor: colorScheme === "dark" ? "white" : "#121212",
        headerLargeTitleShadowVisible: false,
        headerLeft: ({ canGoBack }) => (
          <Ionicons
            name="arrow-back-outline"
            color={colorScheme === "dark" ? "white" : "black"}
            size={24}
            onPress={() => canGoBack && router.back()}
          />
        ),
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" />
      <Stack.Screen name="(onboarding)/index" />
      <Stack.Screen name="(onboarding)/otpVerification" />
      <Stack.Screen name="(onboarding)/createPassword" />
      <Stack.Screen
        name="(onboarding)/personalDetails"
        options={{
          gestureEnabled: false,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="(onboarding)/identityVerification"
        options={{
          headerBackVisible: false,
          headerLeft: undefined,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="(onboarding)/documentCapturing"
        options={{
          headerBackVisible: false,
          headerLeft: undefined,
          headerStyle: {
            backgroundColor: "#3E3E3E",
          },
          contentStyle: {
            backgroundColor: "#3E3E3E",
          },
        }}
      />
      <Stack.Screen
        name="(onboarding)/viewCapturedDoc"
        options={{
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#121212" : "white",
          },
          contentStyle: {
            backgroundColor: colorScheme === "dark" ? "#121212" : "white",
          },
        }}
      />
      <Stack.Screen
        name="(onboarding)/createPIN"
        options={{
          headerBackVisible: false,
          headerLeft: undefined,
          gestureEnabled: false,
          headerStyle: {
            backgroundColor: "#102E34",
          },
          contentStyle: {
            backgroundColor: "#102E34",
          },
        }}
      />
      <Stack.Screen
        name="(onboarding)/confirmPIN"
        options={{
          headerBackVisible: false,
          headerLeft: undefined,
          headerStyle: {
            backgroundColor: "#102E34",
          },
          contentStyle: {
            backgroundColor: "#102E34",
          },
        }}
      />
      <Stack.Screen name="(forgotPassword)/index" />
      <Stack.Screen name="(forgotPassword)/otpVerification" />
      <Stack.Screen name="(forgotPassword)/createPassword" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false, gestureEnabled: false }} />
    </Stack>
  );
};

export default NavigationContainer;
