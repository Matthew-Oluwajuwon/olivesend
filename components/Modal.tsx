import { Pressable, StyleSheet } from "react-native";
import React, { ReactNode, useMemo } from "react";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useColorScheme } from "nativewind";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

interface ModalProps {
  children: ReactNode | JSX.Element;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  snapPoint?: Array<string>;
}

const Modal: React.FC<ModalProps> = ({ children, bottomSheetModalRef, snapPoint }) => {
  const { colorScheme } = useColorScheme();
  const { dismiss } = useBottomSheetModal(); // To dismiss the modal
  const { bottom } = useSafeAreaInsets();

  // Safe area inset to adjust for device-specific screen edges
  const snapPoints = useMemo(
    () => [
      "50%", // Collapse the BottomSheet to 25% height initially
      "75%", // Open it halfway
      "85%", // Fully expanded to take up the full height of the screen
    ],
    []
  );
  const handleDismiss = () => {
    dismiss();
  };

  return (
    <BottomSheetModal
      backgroundStyle={{
        borderRadius: 20,
        backgroundColor: colorScheme === "light" ? "white" : "#1f1f1f",
      }}
      animateOnMount
      containerStyle={{ backgroundColor: "#00000050" }}
      backdropComponent={() => (
        <Pressable
          onPress={handleDismiss}
          style={styles.backdrop}
          className="absolute inset-0 bg-black opacity-50"
        />
      )}
      ref={bottomSheetModalRef}
      index={0} // Start from the bottom (collapsed)
      snapPoints={snapPoint || snapPoints}
      style={{ padding: 20, marginBottom: bottom }} // Adds bottom safe area padding
      enableDismissOnClose
      onDismiss={handleDismiss}
    >
      {children}
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Modal;
