import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export { wp, hp };

export function capitalizeFirstLetter(text: string) {
  if (!text) {
    return text; // Return early if the text is empty or undefined
  }

  // Split the text by spaces, capitalize each word, and join them back together
  return text
    .split(' ') // Split the text into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(' '); // Join the words back with spaces
}

export const maskAccountNumber = (value: string) => {
  if (!value) return "";
  const visibleLength = 5; // Number of visible characters at the end
  const maskedLength = value.length - visibleLength;
  return "*".repeat(maskedLength + 3) + value.slice(maskedLength);
};