import Toast, { ToastType } from "react-native-toast-message";

export interface ToastFunction {
  showToast: (type: ToastType, message: string, description: string) => void;
}

const useToast = (): ToastFunction => {

  const showToast = (type: ToastType, message: string, description: string) => {
    Toast.show({
      type, // 'success', 'error' or 'info'
      text1: message,
      text2: description,
      position: "top",
      swipeable: true,
      visibilityTime: 4000, // duration (ms) before it disappears
      autoHide: true, // auto-dismiss the toast
      text1Style: {
        fontFamily: "InterBold"
      },
      text2Style: {
        fontFamily: "InterRegular",
        fontSize: 14
      }
    });
  };

  return {
    showToast,
  };
};

export default useToast;
