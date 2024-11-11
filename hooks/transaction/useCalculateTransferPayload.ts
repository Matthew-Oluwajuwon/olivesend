import { CorridorRate } from "@/models/client/response";
import { useGetDataQuery } from "@/store/api.config";
import { endpoints } from "@/store/endpoints";

const useCalculateTransferPayload = (
  selectedCountry: string,
  amount: number,
  beneficiaryId?: number
) => {

    const {
    data: corridorRate,
    isFetching: rateIsFetching,
    isLoading: rateIsLoading,
  } = useGetDataQuery({
    getUrl: endpoints.transaction.corridorRate + `${selectedCountry}/corridorRate`,
  });
  const rates: CorridorRate = corridorRate;

  const transferFee = rates
    ? (rates?.feePercentage * amount) / 100 > rates?.feeCap
      ? rates?.feeCap
      : (rates?.feePercentage * amount) / 100
    : 0;
  const totalAmount = transferFee + amount;

  const transferPayload = {
    amount,
    beneficiaryId: beneficiaryId as number,
    channel: "mobile",
    fundSource: "",
    transferPurpose: "",
    totalAmount,
    totalFees: transferFee,
  };

  return {
    transferPayload,
    loading: rateIsFetching || rateIsLoading,
    transferFee,
    totalAmount,
    rates
  };
};

export default useCalculateTransferPayload;
