import { gql, useQuery } from "@apollo/client";

import { GetIndividuals } from "@/graphql/queries";


export const useGetIndividuals = () => {
  const { loading, error, data, refetch } = useQuery(GetIndividuals,{});

  const fetchtIndividuals = async () => {
    try {
      const response = await refetch();
      if (!response.data) {
        throw new Error('No data returned from the server.');
      }
      return response.data.getIndividuals;
    } catch (error) {
      console.error('Error fetching all products:', error);
      throw error;
    }
  };

  return { fetchtIndividuals, loading, error, data };
};
