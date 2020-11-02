import { gql } from "apollo-boost";

export const SIGN_IN = gql`
  mutation($username: String!, $password: String!) {
    authorize(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const SIGN_UP = gql`
  mutation($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      id
      username
      createdAt
      reviewCount
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation(
    $repoOwner: String!
    $repoName: String!
    $rating: Int!
    $review: String
  ) {
    createReview(
      review: {
        ownerName: $repoOwner
        repositoryName: $repoName
        rating: $rating
        text: $review
      }
    ) {
      id
      userId
      repository {
        id
      }
    }
  }
`;
