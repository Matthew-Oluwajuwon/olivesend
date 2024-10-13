import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useScreenInitialize } from "@/hooks";
import { Ionicons } from "@expo/vector-icons";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "@/store";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const { colorScheme, loaded } = useScreenInitialize();

  if (!loaded) {
    return null; // Optionally return a loading screen instead of null
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
              <Stack
                screenOptions={{
                  headerTitle: "",
                  headerBackTitleVisible: false,
                  headerStyle: {
                    backgroundColor: colorScheme === "dark" ? "#121212" : "white",
                  },
                  // statusBarColor: colorScheme === "dark" ? "light" : "dark",
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
                <Stack.Screen name="(onboarding)/personalDetails" />
                <Stack.Screen
                  name="(onboarding)/identityVerification"
                  options={{
                    headerBackVisible: false,
                    headerLeft: undefined,
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
                <Stack.Screen name="forgotPassword" />
              </Stack>
              <Toast />
            </ThemeProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}
