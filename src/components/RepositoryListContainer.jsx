import React from "react";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import { useHistory } from "react-router-native";

import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ repositories, onEndReach }) => {
  let history = useHistory();

  const renderItem = ({ item }) => {
    const handlePress = () => {
      history.push(`/repo/${item.id}`);
    };

    return (
      <TouchableOpacity onPress={handlePress}>
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
          id={item.id}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={repositories}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        testID="testy"
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default RepositoryListContainer;
