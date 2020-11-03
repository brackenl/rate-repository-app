import { useQuery } from "@apollo/react-hooks";

import { GET_ONE_REPO } from "../graphql/queries";

const useReviews = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_ONE_REPO, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_ONE_REPO,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...fetchMoreResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
            },
          },
        };

        return nextResult;
      },
    });
  };

  return {
    repository: data ? data.repository : undefined,
    reviews: data ? data.repository.reviews : undefined,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useReviews;
