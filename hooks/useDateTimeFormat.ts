import { useCallback } from "react";

interface FormattedDateTime {
  onFormattedDateTime: (value: string) => string;
}

const useDateTimeFormat = (): FormattedDateTime => {
  const onFormattedDateTime = useCallback((value: string) => {
    // Convert string to a Date object
    const dateObj = new Date(value);
    // Format the date
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long", // You can use "short" or "numeric" as well
      day: "numeric",
    });

    // Format the time
    // const formattedTime = dateObj.toLocaleTimeString("en-US", {
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   second: "2-digit",
    //   hour12: true, // This makes it 12-hour format (AM/PM)
    // });

    const formatted = `${formattedDate}`;

    return formatted;
  }, []);

  return { onFormattedDateTime };
};

export default useDateTimeFormat;
