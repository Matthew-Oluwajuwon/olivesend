import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import OnboardingHeader from "@/components/OnboardingHeader";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
  MaskSymbol,
  isLastFilledCell,
} from "react-native-confirmation-code-field";
import { useOtpVerification } from "@/hooks";
import { useColorScheme } from "nativewind";
import Button from "@/components/Button";
import Flower from "@/components/Flower";

const CELL_COUNT = 6;

const OtpVerification = () => {
  const { colorScheme } = useColorScheme();
  const { errors, values, disabled, handleChange, handleSubmit, setFieldTouched } =
    useOtpVerification();
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const styles = StyleSheet.create({
    codeFieldRoot: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      gap: 5,
      marginHorizontal: "auto",
      width: "100%",
    },
    cell: {
      width: 52,
      height: 52,
      alignItems: "center",
      justifyContent: "center",
      lineHeight: 50,
      fontSize: 20,
      borderWidth: 1,
      borderColor: colorScheme === "light" ? "#D8D8D8" : "#5C5C5C",
      textAlign: "center",
      borderRadius: 20,
      color: "#888888",
    },
    focusCell: {
      borderColor: colorScheme === "light" ? "#000000" : "#ffffff",
      borderWidth: 2,
      color: "#888888",
      lineHeight: 50,
    },
  });

  return (
    <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
      <View className="px-5 mt-3 flex-1 relative">
        <OnboardingHeader
          title="Verify your email address"
          description="Enter the verification code sent to your email. ****34@gmail.com"
        />
        <View className="mt-10 relative flex-1">
          <Text className="text-black dark:text-white mb-2">Enter OTP</Text>
          <CodeField
            ref={ref}
            {...props}
            value={values.otp}
            onChangeText={handleChange("otp")}
            onFocus={() => setFieldTouched("otp")}
            onBlur={() => setFieldTouched("otp", false)}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            caretHidden={false}
            allowFontScaling
            cursorColor="#1B2C68"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => {
              let textChild = null;

              if (symbol) {
                textChild = (
                  <MaskSymbol
                    maskSymbol="*"
                    isLastFilledCell={isLastFilledCell({
                      index,
                      value,
                    })}
                  >
                    {symbol}
                  </MaskSymbol>
                );
              } else if (isFocused) {
                textChild = <Cursor />;
              }
              return (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {textChild ? textChild : ""}
                </Text>
              );
            }}
          />
          {errors.otp && values.otp && (
            <Text className={`text-red-500 mt-2 ml-3`}>{errors.otp}</Text>
          )}
          <Pressable>
            <Text className="text-black dark:text-white underline font-InterBold text-sm text-center mt-5">
              Didn’t receive code? Resend
            </Text>
          </Pressable>
          <Button
            type="primary"
            className="absolute bottom-7 w-full"
            disabled={disabled}
            onPress={() => handleSubmit()}
          >
            Continue
          </Button>
        </View>
        <Flower />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default OtpVerification;
