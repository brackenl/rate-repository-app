import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  FlatList,
} from "react-native";
import { useParams } from "react-router-native";
import * as Linking from "expo-linking";
import { format } from "date-fns";

import useReviews from "../hooks/useReviews";

import RepositoryItem from "./RepositoryItem";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginBottom: 10,
  },
  gitButton: {
    backgroundColor: theme.colors.primary,
    color: "white",
    height: 50,
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
  },
  reviewContainer: {
    backgroundColor: "white",
    flexDirection: "row",
  },
  reviewRatingContainer: {
    width: "20%",
  },
  ratingBorder: {
    width: 50,
    height: 50,
    margin: 10,
    borderColor: "rgb(0,93,165)",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  reviewTextContainer: {
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
  },
  separator: {
    height: 10,
  },
});

const RepositoryInfo = ({ repository }) => {
  const handlePress = () => {
    Linking.openURL(repository.url);
  };

  return (
    <View style={styles.container}>
      <RepositoryItem {...repository} />
      <View style={styles.gitButton}>
        <TouchableWithoutFeedback onPress={handlePress}>
          <Text style={styles.buttonText}>Open in Github</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewRatingContainer}>
        <View style={styles.ratingBorder}>
          <Text style={{ color: "rgb(0,93,165)" }}>{review.rating}</Text>
        </View>
      </View>
      <View style={styles.reviewTextContainer}>
        <Text style={{ fontWeight: "bold" }}>{review.user.username}</Text>
        <Text>{format(new Date(review.createdAt), "dd LLLL yyyy")}</Text>
        <Text style={{ marginTop: 5 }}>{review.text}</Text>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepoView = () => {
  const { repo } = useParams();

  const { repository, reviews, fetchMore, loading } = useReviews({
    first: 4,
    id: repo,
  });

  const onEndReach = () => {
    fetchMore();
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const reviewNodes = reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepoView;
