import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_REPOSITORIES } from "../graphql/queries";

import RepositoryListContainer from "./RepositoryListContainer";

const RepositoryList = () => {
  const { data } = useQuery(GET_REPOSITORIES);

  useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    // Other options
  });

  // Get the nodes from the edges array
  let repositoryNodes = [];
  if (data) {
    repositoryNodes = data.repositories.edges.map((edge) => edge.node);
  }

  return <RepositoryListContainer repositories={repositoryNodes} />;
};

export default RepositoryList;
