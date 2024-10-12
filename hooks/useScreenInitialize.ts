import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useColorScheme } from "nativewind";
import { useCallback, useEffect, useState } from "react";
import { Appearance, ColorSchemeName } from "react-native";

export interface ScreenInitializeData {
  colorScheme: ColorSchemeName;
  loaded: boolean;
}

const useScreenInitialize = (): ScreenInitializeData => {
  const [loaded] = useFonts({
    InterBlack: require("../assets/fonts/Inter-Black.ttf"),
    InterBold: require("../assets/fonts/Inter-Bold.ttf"),
    InterExtraBold: require("../assets/fonts/Inter-ExtraBold.ttf"),
    InterExtraLight: require("../assets/fonts/Inter-ExtraLight.ttf"),
    Interlight: require("../assets/fonts/Inter-Light.ttf"),
    InterMedium: require("../assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("../assets/fonts/Inter-Regular.ttf"),
    InterSemiBold: require("../assets/fonts/Inter-SemiBold.ttf"),
    InterThin: require("../assets/fonts/Inter-Thin.ttf"),
  });

  const [, setCurrentScheme] = useState<"light" | "dark">("light");
  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    // Set the initial theme based on system preference
    const initialTheme = Appearance.getColorScheme();
    setCurrentScheme(initialTheme as "light" | "dark"); // Set state for initial theme
    setColorScheme(initialTheme as "light" | "dark"); // Apply theme to NativeWind

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setCurrentScheme(colorScheme as "light" | "dark");  // Update state when theme changes
      setColorScheme(colorScheme as "light" | "dark");  // Update NativeWind theme
    });

    return () => {
      subscription.remove();  // Clean up the listener
    };
  }, [setColorScheme]);

  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      await SplashScreen.hideAsync();
    }
  }, [loaded]);
 

  useEffect(() => {
    if (loaded) { 
      onLayoutRootView();
    }
  }, [loaded, onLayoutRootView]);

  return { colorScheme, loaded };
};

export default useScreenInitialize;
