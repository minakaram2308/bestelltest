import { gql, useQuery } from "@apollo/client";

import { GetProductUnits } from "@/graphql/queries";

// Custom Hook for fetching all products
export const useGetProductUnits = () => {
  const { loading, error, data, refetch } = useQuery(GetProductUnits,{});

  const fetchProductUnits = async () => {
    try {
      const response = await refetch();
      if (!response.data) {
        throw new Error('No data returned from the server.');
      }
      return response.data.getProductUnits;
    } catch (error) {
      console.error('Error fetching all products:', error);
      throw error;
    }
  };

  return { fetchProductUnits, loading, error, data };
};
