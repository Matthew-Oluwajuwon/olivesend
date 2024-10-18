import { View, Text } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import WebView from "react-native-webview";
import { useAppSelector } from "@/store/hooks";
import Loader from "@/components/Loader";

const PaymentWebview = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const state = useAppSelector((state) => {
    return state.send;
  });
  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleLoadProgress = ({ nativeEvent }: any) => {
    if (nativeEvent.progress === 1) {
      setLoading(false);
      setProgress(nativeEvent.progress);
    }
  };
  const handleNavigationStateChange = async (navState: any) => {
    const { url } = navState;
    if (
      url.includes("status/success") ||
      url.includes("status/failure") ||
      url.includes("cancel")
    ) {
      //   setTimeout(async () => {
      //     setIsPaymentComplete(true);
      //     const response: any = await confirmTransaction({
      //       postUrl: endpoints.transaction.confirmTransaction,
      //       request: {
      //         reference: transactionReference,
      //       },
      //     });
      //     const apiResponse: API<ApiResponse.TransactionReceipt> =
      //       response.error ?? response.data;
      //     dispatch(
      //       setSendKey({
      //         key: "transactionReceipt",
      //         value: apiResponse?.data,
      //       })
      //     );
      //   }, 1000);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, opacity: progress === 1 ? 0 : 50 }}>
        <Loader message="Loading payment options" />;
      </View>
    );
  }

  return (
    <View className="px-5">
      <StatusBar style="auto" />
      <WebView
        style={{ flex: 1 }}
        source={{ uri: state.paymentInitiationResponse?.paymentURL }}
        onNavigationStateChange={handleNavigationStateChange}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onLoadProgress={handleLoadProgress}
      />
    </View>
  );
};

export default PaymentWebview;
