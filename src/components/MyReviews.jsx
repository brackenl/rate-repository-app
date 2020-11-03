import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { format } from "date-fns";
import * as Linking from "expo-linking";

import useAuthUserReviews from "../hooks/useAuthUserReviews";
import useDeleteReview from "../hooks/useDeleteReview";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
  },
  button: {
    color: "white",
    height: 40,
    width: "40%",
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  successButton: {
    backgroundColor: theme.colors.primary,
  },
  dangerButton: {
    backgroundColor: theme.colors.danger,
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

const ReviewItem = ({ review, refetch }) => {
  const [deleteReview] = useDeleteReview();

  const handleViewRepo = (url) => {
    Linking.openURL(url);
  };

  const handleDeleteRepo = (id) => {
    Alert.alert(
      "Confirmation",
      "Are you sure that you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => {
            console.log("cancelled!");
          },
        },
        {
          text: "Delete",
          onPress: () => {
            deleteReview(id);
            refetch();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <View style={styles.reviewContainer}>
        <View style={styles.reviewRatingContainer}>
          <View style={styles.ratingBorder}>
            <Text style={{ color: "rgb(0,93,165)" }}>{review.rating}</Text>
          </View>
        </View>
        <View style={styles.reviewTextContainer}>
          <Text style={{ fontWeight: "bold" }}>
            {review.repository.ownerName}/{review.repository.name}
          </Text>
          <Text>{format(new Date(review.createdAt), "dd LLLL yyyy")}</Text>
          <Text style={{ marginTop: 5 }}>{review.text}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={[styles.button, styles.successButton]}>
          <TouchableWithoutFeedback
            onPress={() => handleViewRepo(review.repository.url)}
          >
            <Text style={styles.buttonText}>View repository</Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={[styles.button, styles.dangerButton]}>
          <TouchableWithoutFeedback onPress={() => handleDeleteRepo(review.id)}>
            <Text style={styles.buttonText}>Delete review</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { reviews, loading, refetch } = useAuthUserReviews({});

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
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;
