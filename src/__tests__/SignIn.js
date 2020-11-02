import React from "react";
import { View } from "react-native";
import { Formik } from "formik";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import { SignInForm } from "../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button

      const onSubmit = jest.fn();
      const initialValues = {
        username: "",
        password: "",
      };
      const { getByTestId } = render(
        <View>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
          </Formik>
        </View>
      );

      fireEvent.changeText(getByTestId("usernameField"), "TestUser");
      fireEvent.changeText(getByTestId("passwordField"), "TestPassword");
      fireEvent.press(getByTestId("submitBttn"));

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "TestUser",
          password: "TestPassword",
        });
      });
    });
  });
});
