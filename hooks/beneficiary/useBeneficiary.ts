import { Beneficiary } from "@/models/client/response";
import { useGetDataQuery } from "@/store/api.config";
import { endpoints } from "@/store/endpoints";
import { useState, useCallback, useMemo, useEffect } from "react";

const useBeneficiary = () => {
  const { data, isFetching, isLoading, isError, refetch } = useGetDataQuery({
    getUrl: endpoints.beneficiary.getBeneficiaries,
  });
  
  const dataSource: Array<Beneficiary> = useMemo(
    () => (Array.isArray(data) ? data : []),
    [data]
  );
  
  const [filteredData, setFilteredData] = useState<Beneficiary[]>([]);
  const [searchText, setSearchText] = useState("");

  // Memoize the reversed array without mutating the original dataSource
  const reversedArray = useMemo(() => [...dataSource].reverse(), [dataSource]);

  // Sync filteredData with reversedArray when dataSource changes and no search is performed
  useEffect(() => {
    if (!searchText) {
      setFilteredData(reversedArray); // Populate filteredData if no search is performed
    }
  }, [reversedArray, searchText]);

  const handleSearch = useCallback(
    (text: string) => {
      setSearchText(text);
      
      // Filter the memoized reversed array
      const filtered: Beneficiary[] = reversedArray.filter((item: Beneficiary) => {
        return (
          item?.accountName?.toLowerCase().includes(text.toLowerCase()) ||
          item?.walletAccountName?.toLowerCase().includes(text.toLowerCase())
        );
      });

      setFilteredData(filtered);
    },
    [reversedArray] // Only run this when reversedArray changes
  );

  return {
    filteredData,
    searchText,
    reversedArray,
    isFetching,
    isLoading,
    isError,
    handleSearch,
    refetch,
  };
};

export default useBeneficiary;
