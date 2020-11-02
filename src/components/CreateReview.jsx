import React from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { useHistory } from "react-router-native";
import { Formik } from "formik";
import * as yup from "yup";

import FormikTextInput from "./FormikTextInput";
import FormikNumInput from "./FormikNumInput";
import useCreateReview from "../hooks/useCreateReview";

import theme from "../theme";

const styles = StyleSheet.create({
  container: { backgroundColor: "white" },
  input: {
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderStyle: "solid",
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  submit: {
    color: "white",
    backgroundColor: theme.colors.primary,
    marginVertical: 5,
    marginHorizontal: 10,
    textAlign: "center",
    borderRadius: 5,
    padding: 10,
    overflow: "hidden",
  },
});

const validationSchema = yup.object().shape({
  repoOwner: yup
    .string()
    .min(3, `Username must be at least 3 characters`)
    .required("Username is required"),
  repoName: yup
    .string()
    .min(3, `Repository name must be at least 3 characters`)
    .required("Repository name is required"),
  rating: yup
    .number()
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100")
    .required("Rating is required"),
});

const initialValues = {
  repoOwner: "",
  repoName: "",
  rating: "",
  review: "",
};

export const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput
        name="repoOwner"
        placeholder="Repository owner Github username"
        testID="usernameField"
      />
      <FormikTextInput
        name="repoName"
        placeholder="Repository Name"
        testID="repoNameField"
      />

      <FormikNumInput
        name="rating"
        placeholder="Rating (0 - 100)"
        testID="ratingField"
      />

      <FormikTextInput
        name="review"
        placeholder="Review"
        testID="reviewField"
        multiline
        numberOfLines={3}
      />

      <TouchableWithoutFeedback onPress={onSubmit} testID="submitBttn">
        <View>
          <Text style={styles.submit}>Create a review</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const CreateReview = () => {
  const [createReview] = useCreateReview();
  let history = useHistory();

  const onSubmit = async (values) => {
    const { repoOwner, repoName, rating, review } = values;
    const ratingAsInt = Number(rating);
    try {
      const data = await createReview({
        repoOwner,
        repoName,
        ratingAsInt,
        review,
      });
      history.push(`/repo/${data.createReview.repository.id}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default CreateReview;
