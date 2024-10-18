import { Beneficiary } from "@/models/client/response"; // Import the Beneficiary type model
import { useGetDataQuery } from "@/store/api.config"; // Import custom hook for data fetching
import { endpoints } from "@/store/endpoints"; // Import API endpoint configuration
import { useState, useCallback, useMemo, useEffect } from "react"; // Import React hooks

/**
 * Custom hook for managing beneficiary data, including fetching, searching, and filtering.
 */
const useBeneficiary = () => {
  // Fetch beneficiary data using a custom query hook
  const { data, isFetching, isLoading, isError, refetch } = useGetDataQuery({
    getUrl: endpoints.beneficiary.getBeneficiaries, // API endpoint for beneficiaries
  });

  // Memoize the data source; if the data is an array, use it, otherwise, default to an empty array
  const dataSource: Array<Beneficiary> = useMemo(
    () => (Array.isArray(data) ? data : []),
    [data] // Recompute when `data` changes
  );

  // State to manage filtered beneficiary data and the search text
  const [filteredData, setFilteredData] = useState<Beneficiary[]>([]);
  const [searchText, setSearchText] = useState("");

  /**
   * Memoize the reversed dataSource array. This ensures that reversing the array
   * does not mutate the original data, and is recalculated only when `dataSource` changes.
   */
  const reversedArray = useMemo(() => [...dataSource].reverse(), [dataSource]);

  /**
   * Effect to update `filteredData` when `reversedArray` changes or
   * when there's no search text. This syncs the displayed data.
   */
  useEffect(() => {
    if (!searchText) {
      setFilteredData(reversedArray); // Update filtered data if no search is performed
    }
  }, [reversedArray, searchText]); // Only run when `reversedArray` or `searchText` changes

  /**
   * Callback function to handle searching through the beneficiary data.
   * It filters the `reversedArray` based on the search text.
   */
  const handleSearch = useCallback(
    (text: string) => {
      setSearchText(text); // Update the search text state

      // Filter through the reversed array for matches on `accountName` or `walletAccountName`
      const filtered: Beneficiary[] = reversedArray.filter((item: Beneficiary) => {
        return (
          item?.accountName?.toLowerCase().includes(text.toLowerCase()) ||
          item?.walletAccountName?.toLowerCase().includes(text.toLowerCase())
        );
      });

      setFilteredData(filtered); // Update the filtered data
    },
    [reversedArray] // Only re-run this function when `reversedArray` changes
  );

  // Return the relevant data and handlers for use in components
  return {
    filteredData,    // The filtered list of beneficiaries
    searchText,      // Current search text
    reversedArray,   // The reversed array of beneficiaries (unfiltered)
    isFetching,      // Loading state when fetching new data
    isLoading,       // Loading state while waiting for data
    isError,         // Error state if fetching fails
    handleSearch,    // Function to search through the beneficiaries
    refetch,         // Function to refetch the data from the API
  };
};

export default useBeneficiary; // Export the hook
