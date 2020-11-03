import { useQuery } from "@apollo/react-hooks";

import { GET_AUTH_USER_REVIEWS } from "../graphql/queries";

const useRepositories = (variables) => {
  const { data, loading, refetch, ...result } = useQuery(
    GET_AUTH_USER_REVIEWS,
    {
      variables,
      fetchPolicy: "cache-and-network",
    }
  );

  return {
    reviews: data ? data.authorizedUser.reviews : undefined,
    loading,
    refetch,
    ...result,
  };
};

export default useRepositories;
