import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useQuery } from "@apollo/react-hooks";

import RepositoryItem from "./RepositoryItem";
// import useRepositories from "../hooks/useRepositories";
import { GET_REPOSITORIES } from "../graphql/queries";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "rgb(225, 229, 232)",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  // const { repositories } = useRepositories();
  const { data, error, loading } = useQuery(GET_REPOSITORIES);

  useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    // Other options
  });

  // Get the nodes from the edges array
  let repositoryNodes = [];
  if (data) {
    repositoryNodes = data.repositories.edges.map((edge) => edge.node);
  }

  const renderItem = ({ item }) => (
    <RepositoryItem
      key={item.id}
      ownerAvatarUrl={item.ownerAvatarUrl}
      fullName={item.fullName}
      description={item.description}
      language={item.language}
      forksCount={item.forksCount}
      stargazersCount={item.stargazersCount}
      ratingAverage={item.ratingAverage}
      reviewCount={item.reviewCount}
    />
  );

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;
