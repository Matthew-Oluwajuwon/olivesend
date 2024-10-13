import { PasswordRequest } from "../client/request";

export interface Auth {
  hasNumber: boolean;
  isLowerCase: boolean;
  isPasswordLength: boolean;
  isUpperCase: boolean;
  isSpecialChar: boolean;
  hasValue: boolean;
  passwordRequest: PasswordRequest;
}
