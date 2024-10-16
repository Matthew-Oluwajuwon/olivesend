import { AppPayload } from "@/models/application/payload"; // Importing AppPayload for state management
import { useAppDispatch, useAppSelector } from "@/store/hooks"; // Importing hooks for Redux store interactions
import { setAuthState } from "@/store/slice"; // Importing action to update auth state in Redux store
import { Camera } from "expo-camera"; // Importing Expo Camera for taking pictures
import { router } from "expo-router"; // Importing router for navigation
import { useState, useEffect, useCallback } from "react"; // Importing React hooks
import { Alert, Platform, Linking } from "react-native"; // Importing React Native components for UI interaction
import * as DocumentPicker from "expo-document-picker"; // Importing document picker from Expo
import * as FileSystem from "expo-file-system"; // Importing file system module from Expo
import { DocType } from "@/models/application/state"; // Importing DocType enum for document type management
import { useMutateUnsecureDataMutation } from "@/store/api.config"; // Importing API mutation hook
import useToast from "../useToast"; // Importing custom toast notification hook
import { endpoints } from "@/store/endpoints"; // Importing API endpoints
import { API } from "@/models/client/response"; // Importing API response model
import * as ImageManipulator from 'expo-image-manipulator';

// Maximum file size allowed for upload: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

// Custom hook for handling document capture, including photo capture and file upload
const useDocumentCapture = () => {
  const dispatch = useAppDispatch(); // Hook to dispatch actions to the Redux store
  const state = useAppSelector((state) => state.auth); // Accessing the current authentication state from Redux store
  const [hasPermission, setHasPermission] = useState<boolean | null>(null); // State to store camera permission status
  const [camera, setCamera] = useState<any>(null); // State to store camera instance

  // Mutation hook for verifying identity (e.g., uploading document)
  const [verifyIdentity, response] = useMutateUnsecureDataMutation();

  const { showToast } = useToast(); // Custom hook for displaying toast notifications

  // Callback to handle the document verification process, including uploading the captured or selected document
  const onVerifyIdentity = useCallback(async () => {
    try {
      // Sending an API request to verify identity by uploading the document
      const response: any = await verifyIdentity({
        postUrl: endpoints.auth.verifyIdentity, // API endpoint for identity verification
        formMethod: "POST", // HTTP method: POST
        request: {
          documentType: state.documentType, // The selected document type (e.g., passport, ID)
          image: `${state.mimeType === "capture" ? "data:image/jpeg;base64," : ""}${state.imageBase64}`, // Base64-encoded image or file
        },
        headers: {
          Authorization: `Bearer ${state.token}`, // Authorization header with the user's token
        },
      });

      // Handling the API response
      const apiResponse: API<boolean> = response.error?.data || response.data;

      // If the response code indicates success
      if (apiResponse.responseCode === "00") {
        showToast("success", apiResponse.responseMessage, "Document uploaded successfully"); // Display success toast
        router.navigate("/(onboarding)/createPIN"); // Navigate to the next onboarding step (e.g., create PIN)
      } else {
        // Display error toast with the response message
        showToast(
          "error",
          "Error occurred",
          apiResponse.message || apiResponse.responseMessage || "An unknown error occurred"
        );
      }
    } catch (error: any) {
      // Display error toast for any exception
      showToast("error", "Error occurred", error.message || "An unknown error occurred");
    }
  }, [showToast, verifyIdentity, dispatch]); // Memoize the callback and include necessary dependencies

  // Request camera permission when the component mounts
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync(); // Request camera permissions
      setHasPermission(status === "granted"); // Update permission state
    })();
  }, []);

  // Function to capture a photo using the device's camera
  const takePicture = useCallback(async () => {
    if (camera) {
      try {
        const photo = await camera.takePictureAsync({
          quality: 0.7, // Set the quality of the captured image
          base64: true, // Return image in base64 format
        });
        const result = await ImageManipulator.manipulateAsync(
          photo.uri,
          [],
          { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
        )
        const base64Image = await FileSystem.readAsStringAsync(result.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        // Store captured image and its format in the auth state
        dispatch(setAuthState(new AppPayload("imageBase64", base64Image)));
        dispatch(setAuthState(new AppPayload("mimeType", "capture")));
        router.navigate("/(onboarding)/viewCapturedDoc"); // Navigate to the document preview page
      } catch (error: any) {
        Alert.alert("Error capturing photo: ", error.message || "An unknown error occurred"); // Display error message
      }
    }
  }, [dispatch, camera]);

  // Function to upload a document (image or PDF) from the device
  const uploadFile = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"], // Acceptable file types: images and PDFs
        copyToCacheDirectory: true, // Copy the file to cache directory for easier access
      });

      if (!result.canceled && result.assets.length > 0) {
        const asset = result.assets[0]; // Get the selected file
        const fileInfo = await FileSystem.getInfoAsync(asset.uri); // Get file information (size, existence)
        
        if (fileInfo.exists && fileInfo.size > MAX_FILE_SIZE) {
          Alert.alert("Error", "File size exceeds the 5MB limit."); // Show error if file size exceeds the limit
          return;
        }
        if (!fileInfo.exists) {
          Alert.alert("Error", "File does not exist."); // Show error if the file doesn't exist
          return;
        }

        // Store the selected file's URI and mime type in the auth state
        dispatch(setAuthState(new AppPayload("imageBase64", asset.uri)));
        dispatch(setAuthState(new AppPayload("mimeType", asset.mimeType as string)));
        router.navigate("/(onboarding)/viewCapturedDoc"); // Navigate to the document preview page
      }
    } catch (error: any) {
      Alert.alert("Error", "Failed to pick a document.", error.message || "An unknown error occurred"); // Display error message if document picking fails
    }
  }, [dispatch]);

  // Function to select the document type (e.g., passport, ID) and navigate to the document capture screen
  const pickDocType = useCallback(
    (type: DocType) => {
      dispatch(setAuthState(new AppPayload("documentType", type))); // Update the document type in the auth state
      router.navigate("/(onboarding)/documentCapturing"); // Navigate to the document capturing screen
    },
    [dispatch]
  );

  // Function to open the app's settings (useful if permissions are denied)
  const openAppSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:"); // Open settings on iOS devices
    } else {
      Linking.openSettings(); // Open settings on Android devices
    }
  };

  return {
    openAppSettings,
    takePicture,
    setCamera,
    uploadFile,
    pickDocType,
    onVerifyIdentity,
    hasPermission, // Return permission status and functions for capturing or uploading documents
    loading: response.isLoading
  };
};

export default useDocumentCapture; // Export the custom hook for use in other components
