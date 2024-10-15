import useCreatePassword from "./onboarding/useCreatePassword";
import useDocumentCapture from "./onboarding/useDocumentCapture";
import useOtpVerification from "./onboarding/useOtpVerification";
import usePersonalDetails from "./onboarding/usePersonalDetails";
import usePinCreation from "./onboarding/usePinCreation";
import useSendEmailVerification from "./onboarding/useSendEmailVerification";
import { useAuthQuery } from "./useAuthQuery";
import useLogin from "./useLogin";
import useScreenInitialize from "./useScreenInitialize";

export {
  useLogin,
  useScreenInitialize,
  useCreatePassword,
  useOtpVerification,
  useSendEmailVerification,
  useAuthQuery,
  usePersonalDetails,
  useDocumentCapture,
  usePinCreation
};
