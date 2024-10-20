import { AppPayload } from "@/models/application/payload";
import { TabOptionType } from "@/models/application/state";
import { useAppDispatch } from "@/store/hooks";
import { setTransactionState } from "@/store/slice";
import { useCallback } from "react";

const useTransactionTypeChange = () => {
  const dispatch = useAppDispatch();

  const onTransactionTypeChange = useCallback((type: TabOptionType) => {
    dispatch(setTransactionState(new AppPayload("type", type)));
  }, [dispatch]);

  return {
    onTransactionTypeChange,
  };
};

export default useTransactionTypeChange;
