import { gql } from "apollo-boost";

export const GET_REPOSITORIES = gql`
  query repositories(
    $orderBy: AllRepositoriesOrderBy!
    $orderDirection: OrderDirection!
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
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
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
`;

export const GET_ONE_REPO = gql`
  query repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id
      ownerAvatarUrl
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          totalCount
          hasNextPage
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

export const GET_AUTH_USER_REVIEWS = gql`
  query getAuthUserReviews {
    authorizedUser {
      id
      username
      reviews {
        edges {
          node {
            repository {
              ownerName
              name
              url
            }
            id
            rating
            createdAt
            text
          }
        }
      }
    }
  }
`;
