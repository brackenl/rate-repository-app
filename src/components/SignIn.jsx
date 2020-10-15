import React from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import FormikTextInput from "./FormikTextInput";
import theme from "../theme";

const styles = StyleSheet.create({
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
  username: yup
    .string()
    .min(3, `Username must be at least 3 characters`)
    .required("Username is required"),
  password: yup
    .string()
    .min(5, `Password must be at least 5 characters`)
    .required("Password is required"),
});

const onSubmit = (values) => {
  console.log(values);
};

const initialValues = {
  username: "",
  password: "",
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text style={styles.submit}>Log in</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignIn = () => {
  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;
