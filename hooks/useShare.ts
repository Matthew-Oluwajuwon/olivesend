import { shareAsync, isAvailableAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { captureRef } from "react-native-view-shot";
import { createAssetAsync, requestPermissionsAsync } from "expo-media-library";
import { useRef } from "react";
import { Alert } from "react-native";

const useShare = () => {
  const receiptRef = useRef(null);
  const handleShare = async () => {
    try {
      // Capture the receipt image
      const uri = await captureRef(receiptRef, {
        format: "png",
        quality: 1,
        fileName: "Send receipt",
      });

      // Save the image to the file system
      const fileUri = `${FileSystem.cacheDirectory}receipt.png`;
      await FileSystem.copyAsync({ from: uri, to: fileUri });

      // Check if sharing is available
      const isAvailable = await isAvailableAsync();
      if (!isAvailable) {
        console.log("Sharing is not available on this platform");
        return;
      }

      // Share the saved image
      await shareAsync(fileUri);
    } catch (error) {
      console.error("Error sharing receipt:", error);
    }
  };

  const handleDownload = async () => {
    try {
      // Check if permission is granted
      const { status } = await requestPermissionsAsync();
      if (status !== "granted") {
        throw new Error(
          "MEDIA_LIBRARY permission is required to do this operation."
        );
      }

      // Capture the receipt image
      const uri = await captureRef(receiptRef, {
        format: "png",
        quality: 1,
      });

      // Save the captured image to the media library
      await createAssetAsync(uri);
      Alert.alert("Downloaded successfully")
    } catch (error) {
      console.error("Error downloading receipt:", error);
    }
  };

  return {
    receiptRef,
    handleDownload,
    handleShare,
  };
};

export default useShare;
