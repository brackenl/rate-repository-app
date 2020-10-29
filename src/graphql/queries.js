import { gql } from "apollo-boost";

export const GET_REPOSITORIES = gql`
  query repositories {
    repositories {
      edges {
        node {
          id
          ownerAvatarUrl
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
        }
      }
    }
  }
`;

export const VERIFY_AUTH_USER = gql`
  query checkAuthUser {
    authorizedUser {
      id
      username
    }
  }
`;
