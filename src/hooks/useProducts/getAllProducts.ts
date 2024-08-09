import { gql, useQuery } from "@apollo/client";

import { GetAllProducts } from "@/graphql/queries";

// Custom Hook for fetching all products
export const useGetAllProducts = () => {
  const { loading, error, data, refetch } = useQuery(GetAllProducts, {
    variables: { pageNo: 0, pageSize: 100},
  });

  const fetchAllProducts = async () => {
    try {
      const response = await refetch();
      if (!response.data) {
        throw new Error('No data returned from the server.');
      }
      return response.data.getAllProducts;
    } catch (error) {
      console.error('Error fetching all products:', error);
      throw error;
    }
  };

  return { fetchAllProducts, loading, error, data };
};
