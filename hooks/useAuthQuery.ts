import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setAuthState } from "@/store/slice";
import { AppPayload } from "@/models/application/payload";

export const useAuthQuery = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => {
    return state.auth;
  });
  const setPasswordField = useCallback(
    (value: any) => {
      if (value.length === 0) {
        dispatch(setAuthState(new AppPayload("hasValue", false)));
      } else {
        dispatch(setAuthState(new AppPayload("hasValue", true)));
      }
      const UpperCase = /(?=.*[A-Z])/;
      const LowerCase = /(?=.*[a-z])/;
      const NumberCase = /(?=.*[0-9])/;
      const SpecialChar = /([^A-Za-z0-9])/;
      if (value?.length < 8) {
        dispatch(setAuthState(new AppPayload("isPasswordLength", false)));
      } else {
        dispatch(setAuthState(new AppPayload("isPasswordLength", true)));
      }
      dispatch(
        setAuthState(
          new AppPayload("passwordRequest", {
            password: value,
          })
        )
      );
      dispatch(setAuthState(new AppPayload("isUpperCase", UpperCase.test(value))));
      dispatch(setAuthState(new AppPayload("isLowerCase", LowerCase.test(value))));

      dispatch(setAuthState(new AppPayload("hasNumber", NumberCase.test(value))));
      dispatch(setAuthState(new AppPayload("isSpecialChar", SpecialChar.test(value))));
    },
    [dispatch]
  );

  const contentData = [
    {
      text: "Be a minimum of 8 characters",
      img:
        state.passwordRequest?.password === ""
          ? require("@/assets/icons/password-circle.png")
          : state.passwordRequest?.password === undefined
          ? require("@/assets/icons/password-circle.png")
          : state.isPasswordLength
          ? require("@/assets/icons/password-check.png")
          : require("@/assets/icons/password-circle.png"),
    },
    {
      text: "Include at least one uppercase letter (A-Z)",
      img:
        state.passwordRequest?.password === ""
          ? require("@/assets/icons/password-circle.png")
          : state.passwordRequest?.password === undefined
          ? require("@/assets/icons/password-circle.png")
          : state.isUpperCase
          ? require("@/assets/icons/password-check.png")
          : require("@/assets/icons/password-circle.png"),
    },
    {
      text: "Include at least one lowercase letter (a-z)",
      img:
        state.passwordRequest?.password === ""
          ? require("@/assets/icons/password-circle.png")
          : state.passwordRequest?.password === undefined
          ? require("@/assets/icons/password-circle.png")
          : state.isLowerCase
          ? require("@/assets/icons/password-check.png")
          : require("@/assets/icons/password-circle.png"),
    },
    {
      text: "Include at least one number (0-9)",
      img:
        state.passwordRequest?.password === ""
          ? require("@/assets/icons/password-circle.png")
          : state.passwordRequest?.password === undefined
          ? require("@/assets/icons/password-circle.png")
          : state.hasNumber
          ? require("@/assets/icons/password-check.png")
          : require("@/assets/icons/password-circle.png"),
    },
    {
      text: "Includes a special character *#%@",
      img:
        state.passwordRequest?.password === ""
          ? require("@/assets/icons/password-circle.png")
          : state.passwordRequest?.password === undefined
          ? require("@/assets/icons/password-circle.png")
          : state.isSpecialChar
          ? require("@/assets/icons/password-check.png")
          : require("@/assets/icons/password-circle.png"),
    },
  ];

  return {
    setPasswordField,
    contentData,
  };
};
