import React from "react";
import { View, Text, TouchableOpacity, Pressable, Platform } from "react-native";
import { CameraView } from "expo-camera"; // Import Camera from expo-camera
import { CameraType } from "expo-camera/build/legacy/Camera.types";
import { useDocumentCapture } from "@/hooks";
import { StatusBar } from "expo-status-bar";

const DocumentCapture = () => {
  const { openAppSettings, takePicture, setCamera, uploadFile, hasPermission } = useDocumentCapture();

  return (
    <View className="flex-1 justify-center items-center bg-[#3E3E3E] relative">
      <StatusBar style="light" />
      <View className="h-60 rounded-[20px] w-[90%] overflow-hidden border border-[#747474] bg-[#494949]">
        {hasPermission === null ? (
          <View className="self-center my-auto">
            <Text className="text-white">Accessing camera, please wait...</Text>
          </View>
        ) : !hasPermission ? (
          <View className="self-center my-auto">
            <Text className="text-white">You need to allow camera permission</Text>
            <Pressable onPress={openAppSettings} className="bg-white rounded-full py-4 px-5 mt-3">
              <Text className="text-center font-InterBold">Go to settings</Text>
            </Pressable>
          </View>
        ) : (
          <CameraView
            style={{ flex: 1 }} // Use native styles for Camera
            facing={CameraType.back}
            ref={(ref: any) => setCamera(ref)}
            ratio="4:3"
          />
        )}
      </View>
      <Text className="text-2xl text-[#F5F5F5] font-InterBold text-center w-[80%] mx-auto my-10">
        Position the front of your document in the frame
      </Text>
      <Pressable onPress={uploadFile} className="border border-white rounded-full py-4 px-5 self-center mb-10">
        <Text className="text-center text-[#F5F5F5] font-InterBold">Or upload a document</Text>
      </Pressable>
      <TouchableOpacity
        onPress={takePicture}
        className="border border-white bg-white rounded-full p-6 self-center absolute bottom-10"
        style={{
          marginBottom: Platform.OS === "ios" ? 0 : 40,
        }}
      />
    </View>
  );
};

export default DocumentCapture;
