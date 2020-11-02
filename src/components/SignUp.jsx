import React from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { useHistory } from "react-router-native";
import { Formik } from "formik";
import * as yup from "yup";

import FormikTextInput from "./FormikTextInput";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";

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
  username: yup
    .string()
    .min(3, `Username must be at least 3 characters`)
    .max(30, "Username cannot be longer than 30 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, `Password must be at least 5 characters`)
    .max(50, "Password cannot be longer than 50 characters")
    .required("Password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("You must confirm your password"),
});

const initialValues = {
  username: "",
  password: "",
  passwordConfirm: "",
};

export const SignUpForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput
        name="username"
        placeholder="Username"
        testID="usernameField"
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry
        testID="passwordField"
      />
      <FormikTextInput
        name="passwordConfirm"
        placeholder="Confirm Password"
        secureTextEntry
        testID="passwordConfirmField"
      />
      <TouchableWithoutFeedback onPress={onSubmit} testID="submitBttn">
        <View>
          <Text style={styles.submit}>Log in</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  let history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });

      try {
        await signIn({ username, password });
        history.push("/");
      } catch (err) {
        console.log(err);
      }
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
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignUp;
