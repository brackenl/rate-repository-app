import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import { Link } from "react-router-native";
import Constants from "expo-constants";

import AuthStorageContext from "../contexts/AuthStorageContext";

import { VERIFY_AUTH_USER } from "../graphql/queries";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  text: {
    color: "white",
    fontSize: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
  },
});

const AppBar = () => {
  const authStorage = useContext(AuthStorageContext);
  const client = useApolloClient();
  const { data, error, loading } = useQuery(VERIFY_AUTH_USER);

  useQuery(VERIFY_AUTH_USER, {
    fetchPolicy: "cache-and-network",
    // Other options
  });

  const signOut = async () => {
    await authStorage.removeAccessToken(); // update??
    client.resetStore();
  };

  let signIn = (
    <TouchableWithoutFeedback>
      <Link to="/signin" component={TouchableOpacity}>
        <Text style={styles.text}>Sign In</Text>
      </Link>
    </TouchableWithoutFeedback>
  );

  if (data && data.authorizedUser) {
    signIn = (
      <TouchableWithoutFeedback onPress={signOut}>
        <View>
          <Text style={styles.text}>Sign Out</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <TouchableWithoutFeedback>
          <Link to="/" component={TouchableOpacity}>
            <Text style={styles.text}>Repositories</Text>
          </Link>
        </TouchableWithoutFeedback>
        {signIn}
      </ScrollView>
    </View>
  );
};

export default AppBar;
