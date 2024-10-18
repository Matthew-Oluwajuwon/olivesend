import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Stack, router, useSegments } from "expo-router";
import { useColorScheme } from "nativewind";
import { useAppSelector } from "@/store/hooks";
import { Text, View } from "react-native";

const HeaderLeft = ({ canGoBack, title }: { canGoBack: boolean; title: string }) => {
  const { colorScheme } = useColorScheme();
  return (
    <View className="flex-row items-center">
      <Ionicons
        name="arrow-back-sharp"
        color={colorScheme === "dark" ? "white" : "black"}
        size={24}
        onPress={() => canGoBack && router.back()}
      />
      <Text className="font-InterBold text-xl ml-3 dark:text-white">{title}</Text>
    </View>
  );
};

const NavigationContainer = () => {
  const state = useAppSelector((state) => {
    return state.auth;
  });
  const { colorScheme } = useColorScheme();
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup =
      segments[0] === "(tabs)" || segments[0] === "(beneficiary)" || segments[0] === "(protected)";
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
        headerShadowVisible: false,
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
      <Stack.Screen
        name="(beneficiary)/index"
        options={{
          headerLeft: ({ canGoBack }) => <HeaderLeft canGoBack={canGoBack} title="Beneficiaries" />,
        }}
      />
      <Stack.Screen
        name="(beneficiary)/createBeneficiary"
        options={{
          headerLeft: ({ canGoBack }) => (
            <HeaderLeft canGoBack={canGoBack} title="New Beneficiaries" />
          ),
          headerShadowVisible: true,
          headerLargeTitleShadowVisible: true,
          contentStyle: {
            paddingVertical: 10,
            backgroundColor: colorScheme === "dark" ? "#121212" : "white",
          },
        }}
      />
      <Stack.Screen
        name="(protected)/transactionConfirmation"
        options={{
          contentStyle: {
            paddingVertical: 10,
            backgroundColor: colorScheme === "dark" ? "#121212" : "white",
          },
        }}
      />
      <Stack.Screen
        name="(protected)/paymentMethods"
        options={{
          headerLeft: ({ canGoBack }) => (
            <HeaderLeft canGoBack={canGoBack} title="Payment Methods" />
          ),
          headerShadowVisible: true,
          headerLargeTitleShadowVisible: true,
          contentStyle: {
            paddingVertical: 10,
            backgroundColor: colorScheme === "dark" ? "#121212" : "white",
          },
        }}
      />
      <Stack.Screen
        name="(protected)/paymentWebview"
        options={{
          headerBackVisible: false,
          headerLeft: undefined,
          contentStyle: {
            paddingVertical: 10,
            backgroundColor: colorScheme === "dark" ? "#121212" : "white",
          },
        }}
      />
    </Stack>
  );
};

export default NavigationContainer;
