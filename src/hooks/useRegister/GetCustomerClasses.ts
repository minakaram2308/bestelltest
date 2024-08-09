import { gql, useQuery } from "@apollo/client";

import { GetCustomerClasses } from "@/graphql/queries";


export const useGetCustomerClasses = () => {
  const { loading, error, data, refetch } = useQuery(GetCustomerClasses,{});

  const fetchCustomerClasses = async () => {
    try {
      const response = await refetch();
      if (!response.data) {
        throw new Error('No data returned from the server.');
      }
      return response.data.getCustomerClasses;
    } catch (error) {
      console.error('Error fetching all products:', error);
      throw error;
    }
  };

  return { fetchCustomerClasses, loading, error, data };
};
