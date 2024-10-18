import { AppPayload } from "@/models/application/payload";
import { Beneficiary } from "@/models/client/response";
import { useAppDispatch } from "@/store/hooks";
import { setBeneficiaryState } from "@/store/slice";
import { router } from "expo-router";
import { useCallback } from "react";

const useBeneficiarySelection = () => {
  const dispatch = useAppDispatch(); // Get dispatch function to trigger state updates

  const onBeneficiaryClicked = useCallback(
    (action: "ADD" | "REMOVE", record?: Beneficiary) => {
      if (action === "ADD") {
        dispatch(setBeneficiaryState(new AppPayload("record", record as Beneficiary)));
        router.navigate("/(send)");
      } else {
        dispatch(setBeneficiaryState(new AppPayload("record", new Beneficiary())));
      }
    },
    [dispatch]
  );

  return {
    onBeneficiaryClicked,
  };
};

export default useBeneficiarySelection;
