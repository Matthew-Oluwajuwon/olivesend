import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useScreenInitialize } from "@/hooks";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "@/store";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";
import NavigationContainer from "@/components/navigation/NavigationContainer";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
              <NavigationContainer />
              <Toast />
            </ThemeProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}
