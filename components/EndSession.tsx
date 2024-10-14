import { View, Text } from "react-native";
import React from "react";
import Modal from "./Modal";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Button from "./Button";
import { router } from "expo-router";

interface EndSessionProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
}

const EndSession: React.FC<EndSessionProps> = ({ bottomSheetModalRef }) => {
  return (
    <Modal bottomSheetModalRef={bottomSheetModalRef} snapPoint={["35%"]}>
      <View className="self-center my-5 w-[65%]">
        <Text className="dark:text-white font-InterBold text-xl text-center">
          Are you sure you want to end this session?
        </Text>
        <Text className="text-center dark:text-white font-InterRegular text-sm my-5">
          You will be redirected to the login page
        </Text>
      </View>
      <View className="flex-row justify-evenly gap-5">
        <Button
          type="default"
          className="w-[43%]"
          onPress={() => bottomSheetModalRef.current?.dismiss()}
        >
          No
        </Button>
        <Button
          type="primary"
          className="w-[43%]"
          onPress={() => router.replace("/login")}
        >
          Yes
        </Button>
      </View>
    </Modal>
  );
};

export default EndSession;
