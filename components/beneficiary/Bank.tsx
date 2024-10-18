import { View } from "react-native";
import React from "react";
import { useAppSelector } from "@/store/hooks";
import Select, { SelectProps } from "../Select";
import { Bank as BankType } from "@/models/client/response";
import { useBeneficiaryValidation } from "@/hooks";
import Input from "../Input";

const Bank = () => {
    const state = useAppSelector((state) => {
        return state.beneficiary;
      });
      const { handleChange, institutionLoading, values, errors, touched, setFieldTouched } =
        useBeneficiaryValidation();
      const options: SelectProps["options"] = Array.isArray(state.wallets)
        ? state.banks.map((item: BankType) => ({
            label: item.bankName,
            value: item.bankName,
          }))
        : [];
    
      return (
        <View className="mt-5">
          <Select
            label="Choose bank"
            options={options}
            value={values.bankName}
            placeholder="Select an option"
            onSelect={(value) => handleChange("bankName")(value as string)}
            loading={institutionLoading}
          />
          <Input
            label="Beneficiary account number"
            touched={touched.accountNumber}
            message={errors.accountNumber}
            inputProps={{
              onFocus: () => setFieldTouched("accountNumber"),
              onBlur: () => setFieldTouched("accountNumber"),
              keyboardType: "number-pad",
              onChangeText: handleChange("accountNumber"),
            }}
          />
          <Input
            label="Beneficiary account name"
            touched={touched.accountName}
            message={errors.accountName}
            inputProps={{
              onChangeText: handleChange("accountName"),
              onFocus: () => setFieldTouched("accountName"),
              onBlur: () => setFieldTouched("accountName"),
            }}
          />
        </View>
      );
}

export default Bank