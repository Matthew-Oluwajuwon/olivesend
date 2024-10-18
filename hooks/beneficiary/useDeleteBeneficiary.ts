import { useMutateDataMutation } from "@/store/api.config";
import useToast from "../useToast";
import { useCallback } from "react";
import { endpoints } from "@/store/endpoints";
import { API } from "@/models/client/response";

const useDeleteBeneficiary = () => {
  const { showToast } = useToast(); // Get showToast function for notifications
  const [deleteBeneficiary, result] = useMutateDataMutation(); // Mutation hook for deleting beneficiary

  const onDeleteBeneficiary = useCallback(async (id: number) => {
    try {
      const response: any = await deleteBeneficiary({
        postUrl: endpoints.beneficiary.deleteBeneficiary + id,
        formMethod: "DELETE",
      });
      // Extract the API response
      const apiResponse: API<any> = response.error?.data || response.data;
      if (apiResponse.responseCode === "00") {
        // Show error toast if verification failed
        showToast(
          "success",
          "Successful",
          "Successfully deleted beneficiary"
        );
      } else {
        // Show error toast if verification failed
        showToast(
          "error",
          "Error occurred",
          apiResponse.message || apiResponse.responseMessage || "An unknown error occurred"
        );
      }
    } catch (error: any) {
      // Show error toast if an error occurred during beneficiary creation
      showToast("error", "Error occurred", error.message || "An unknown error occurred");
    }
  }, []);

  return {
    loading: result.isLoading,
    onDeleteBeneficiary
  };
};

export default useDeleteBeneficiary;
