import { TransactionDTOS } from "@/models/client/response";
import { useGetTransactionsQuery } from "@/store/api.config";
import { useColorScheme } from "nativewind";
import { useState, useEffect } from "react";

const useGetTransactionHistory = () => {
  const limit = 10;
  const [page, setPage] = useState(1); // Start at page 1
  const [allTransactions, setAllTransactions] = useState<TransactionDTOS[]>([]); // Store all pages' transactions
  const { colorScheme } = useColorScheme();

  const { data, isFetching, isLoading, isError, refetch } = useGetTransactionsQuery({
    limit,
    page,
  });

  useEffect(() => {
    if (data?.data?.transactions) {
      setAllTransactions((prev) => {
        if (page === 1) {
          // If it's the first page, replace the list
          return [...data.data.transactions];
        } else {
          // Otherwise, append new transactions
          return [...prev, ...data.data.transactions];
        }
      });
    }
  }, [data, page]);

  const handleScroll = () => {
    if (!isFetching && !isLoading && allTransactions.length < (data?.data?.total as number)) {
      setPage((prev) => prev + 1); // Move to next page
    }
  };

  const handleRefresh = () => {
    setPage(1);
    refetch(); // Trigger refetch for page 1
  };

  return {
    isError,
    isLoading,
    isFetching,
    colorScheme,
    page,
    handleScroll,
    handleRefresh,
    transactionList: allTransactions, // Return the accumulated transactions
  };
};

export default useGetTransactionHistory;
