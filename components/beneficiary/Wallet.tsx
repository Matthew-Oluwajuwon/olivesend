import { View } from "react-native";
import React from "react";
import { useAppSelector } from "@/store/hooks";
import Select, { SelectProps } from "../Select";
import { Wallet as WalletType } from "@/models/client/response";
import { useBeneficiaryValidation } from "@/hooks";
import Input from "../Input";

const Wallet = () => {
  const state = useAppSelector((state) => {
    return state.beneficiary;
  });
  const { handleChange, institutionLoading, values, errors, touched, setFieldTouched } =
    useBeneficiaryValidation();
  const options: SelectProps["options"] = Array.isArray(state.wallets)
    ? state.wallets.map((item: WalletType) => ({
        label: item.walletName,
        value: item.walletName,
      }))
    : [];

    return (
    <View className="mt-5">
      <Select
        label="Choose wallet"
        options={options}
        value={values.walletType}
        placeholder="Select an option"
        onSelect={(value) => handleChange("walletType")(value as string)}
        loading={institutionLoading}
      />
      <Input
        label="Beneficiary wallet number"
        touched={touched.walletAccountNumber}
        message={errors.walletAccountNumber}
        inputProps={{
          onFocus: () => setFieldTouched("walletAccountNumber"),
          onBlur: () => setFieldTouched("walletAccountNumber"),
          keyboardType: "number-pad",
          onChangeText: handleChange("walletAccountNumber"),
        }}
      />
      <Input
        label="Beneficiary wallet name"
        touched={touched.walletAccountName}
        message={errors.walletAccountName}
        inputProps={{
          onChangeText: handleChange("walletAccountName"),
          onFocus: () => setFieldTouched("walletAccountName"),
          onBlur: () => setFieldTouched("walletAccountName"),
        }}
      />
    </View>
  );
};

export default Wallet;
