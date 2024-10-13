import { AppPayload } from "@/models/application/payload";
import { useAppDispatch } from "@/store/hooks";
import { setAuthState } from "@/store/slice";
import { Camera } from "expo-camera";
import { router } from "expo-router";
import { useState, useEffect, useCallback } from "react";
import { Alert, Platform, Linking } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const useDocumentCapture = () => {
  const dispatch = useAppDispatch();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [camera, setCamera] = useState<any>(null);
  const [document, setDocument] = useState(null);

  useEffect(() => {
    (async () => {
      // Request Camera Permission
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Capture photo function
  const takePicture = useCallback(async () => {
    if (camera) {
      try {
        const photo = await camera.takePictureAsync({
          quality: 0.7, // Adjust quality as needed
          base64: true, // Optional: Set this to true to get the image in base64 format
        });
        dispatch(setAuthState(new AppPayload("imageBase64", photo.base64)));
        dispatch(setAuthState(new AppPayload("mimeType", "capture")));
        router.navigate("/(onboarding)/viewCapturedDoc");
      } catch (error: any) {
        Alert.alert("Error capturing photo: ", error.message || "An unknown error occured");
      }
    }
  }, [dispatch, camera]);

  const pickDocument = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"], // You can set type to other formats (e.g., images, all types)
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets.length > 0) {
        const asset = result.assets[0];
        const fileInfo = await FileSystem.getInfoAsync(asset.uri);
        if (fileInfo.exists && fileInfo.size > MAX_FILE_SIZE) {
          Alert.alert("Error", "File size exceeds the 5MB limit.");
          return;
        }
        if (!fileInfo.exists) {
          Alert.alert("Error", "File does not exist.");
          return;
        }
        dispatch(setAuthState(new AppPayload("imageBase64", asset.uri)));
        dispatch(setAuthState(new AppPayload("mimeType", asset.mimeType as string)));
        router.navigate("/(onboarding)/viewCapturedDoc");
      }
    } catch (error: any) {
      Alert.alert("Error", "Failed to pick a document.", error.message || "An unknown error occured");
    }
  }, [dispatch])

  const openAppSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:"); // iOS-specific URL scheme
    } else {
      Linking.openSettings(); // Android-specific
    }
  };

  return {
    openAppSettings,
    takePicture,
    setCamera,
    pickDocument,
    hasPermission,
  };
};

export default useDocumentCapture;
