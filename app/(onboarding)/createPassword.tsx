import { View, Text, Keyboard, TouchableWithoutFeedback, Image } from "react-native";
import React, { useState } from "react";
import OnboardingHeader from "@/components/OnboardingHeader";
import Flower from "@/components/Flower";
import { useColorScheme } from "nativewind";
import Input from "@/components/Input";
import { Ionicons } from "@expo/vector-icons";
import { useAuthQuery, useCreatePassword } from "@/hooks";
import Button from "@/components/Button";
import PasswordCheckerBar from "@/components/PasswordCheckerBar";

const CreatePassword = () => {
  const { errors, values, touched, disabled, handleChange, handleSubmit, setFieldTouched } =
    useCreatePassword();
  const { colorScheme } = useColorScheme();
  const [isPasswordToggled, setIsPasswordToggled] = useState(false);
  const { contentData } = useAuthQuery();

  return (
    <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
      <View className="px-5 mt-3 flex-1 relative">
        <OnboardingHeader title="Create a password" description="create a unique password " />
        <View className="mt-10 flex-1 relative">
          <Input
            label="Enter password"
            touched={touched.password}
            inputProps={{
              secureTextEntry: !isPasswordToggled,
              value: values.password,
              onChangeText: handleChange("password"),
              onFocus: () => setFieldTouched("password", true),
              onBlur: () => setFieldTouched("password", false),
            }}
            message={errors.password}
            suffix={
              <Ionicons
                name={isPasswordToggled ? "eye-outline" : "eye-off-outline"}
                color={colorScheme === "dark" ? "white" : "black"}
                onPress={() => setIsPasswordToggled(!isPasswordToggled)}
                size={20}
              />
            }
          />
          <PasswordCheckerBar />
          <Text className="my-3 font-InterRegular text-black dark:text-[#F5F5F5]">
            Passwords must:
          </Text>
          {contentData.map((item, index) => (
            <View key={index} className="flex-row items-center gap-3 mb-2">
              <Image source={item.img} />
              <Text className="font-InterRegular text-black dark:text-[#F5F5F5]">{item.text}</Text>
            </View>
          ))}
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

export default CreatePassword;
