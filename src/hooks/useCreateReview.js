import { useMutation } from "@apollo/react-hooks";

import { CREATE_REVIEW } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ repoOwner, repoName, ratingAsInt, review }) => {
    const { data } = await mutate({
      variables: {
        repoOwner: repoOwner,
        repoName: repoName,
        rating: ratingAsInt,
        review: review,
      },
    });
    return data;
  };

  return [createReview, result];
};

export default useSignIn;
