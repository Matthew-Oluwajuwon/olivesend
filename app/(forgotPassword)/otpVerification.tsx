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
import { useSendForgotPasswordEmail, useTimer, useVerifyOtp } from "@/hooks";
import { useColorScheme } from "nativewind";
import Button from "@/components/Button";
import Flower from "@/components/Flower";
import { useAppSelector } from "@/store/hooks";

const CELL_COUNT = 6;

const OtpVerification = () => {
  const state = useAppSelector((state) => {
    return state.auth;
  });
  const { colorScheme } = useColorScheme();
  const { errors, values, disabled, loading, handleChange, handleSubmit, setFieldTouched } =
  useVerifyOtp();
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const { resetTimer, timeRemaining } = useTimer();
  const { onSendMail } = useSendForgotPasswordEmail();
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

  const email = state.verifyEmailRequest?.email;
  const atIndex = email.indexOf("@");
  const charactersBeforeAt = email.slice(0, atIndex);
  const maskedEmail = "****" + charactersBeforeAt.slice(-2) + email.slice(atIndex);

  return (
    <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
      <View className="px-5 mt-3 flex-1 relative">
        <OnboardingHeader
          title="Verify your email address"
          description={`Enter the verification code sent to your email. ${maskedEmail}`}
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
          <Pressable
            onPress={() => {
              if (timeRemaining === 0) {
                resetTimer();
                onSendMail({ email: state.verifyEmailRequest?.email });
              }
            }}
          >
            <Text className="text-black dark:text-white underline font-InterBold text-sm text-center mt-5">
              {timeRemaining > 0
                ? `Resend code in ${timeRemaining} secs`
                : "Didn't receive code? Resend"}
            </Text>
          </Pressable>
          <Button
            type="primary"
            className="absolute bottom-7 w-full"
            disabled={disabled}
            loading={loading}
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
