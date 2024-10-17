interface AmountFormatterFunction {
  formattedAmount: (amount: string | number, isSecret?: boolean) => string;
}
const useAmountFormatter = (): AmountFormatterFunction => {
  const formattedAmount = (amount: string | number, isSecret?: boolean) => {
    return isSecret ? "*******" : Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(amount));
  };

  return { formattedAmount };
};

export default useAmountFormatter;
