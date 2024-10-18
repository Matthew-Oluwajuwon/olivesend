import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export { wp, hp };

export function capitalizeFirstLetter(text: string) {
  if (text?.length === 0) {
    return text;
  }
  return text?.charAt(0).toUpperCase() + text?.slice(1);
}

export const maskAccountNumber = (value: string) => {
  if (!value) return "";
  const visibleLength = 5; // Number of visible characters at the end
  const maskedLength = value.length - visibleLength;
  return "*".repeat(maskedLength) + value.slice(maskedLength);
};