import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import { Link, useHistory } from "react-router-native";
import Constants from "expo-constants";

import AuthStorageContext from "../contexts/AuthStorageContext";

import { VERIFY_AUTH_USER } from "../graphql/queries";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    flexDirection: "row",
  },
  text: {
    color: "white",
    fontSize: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
  },
  appBarItem: {
    marginRight: 10,
  },
});

const AppBar = () => {
  const [, setSignedIn] = useState(false);
  const history = useHistory();

  const authStorage = useContext(AuthStorageContext);
  const client = useApolloClient();
  let { data } = useQuery(VERIFY_AUTH_USER, {
    fetchPolicy: "cache-and-network",
    // Other options
  });

  const signOut = async () => {
    console.log("clicked");
    await authStorage.removeAccessToken();
    client.resetStore();
    setSignedIn(false);
    history.push("/");
  };

  let signIn = (
    <>
      <TouchableWithoutFeedback>
        <Link to="/signin" component={TouchableOpacity}>
          <Text style={[styles.text, styles.appBarItem]}>Sign In</Text>
        </Link>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <Link to="/signup" component={TouchableOpacity}>
          <Text style={[styles.text, styles.appBarItem]}>Sign Up</Text>
        </Link>
      </TouchableWithoutFeedback>
    </>
  );
  console.log(data);
  if (data && data.authorizedUser) {
    signIn = (
      <>
        <TouchableWithoutFeedback>
          <Link to="/review" component={TouchableOpacity}>
            <Text style={[styles.text, styles.appBarItem]}>Review</Text>
          </Link>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Link to="/myreviews" component={TouchableOpacity}>
            <Text style={[styles.text, styles.appBarItem]}>My Reviews</Text>
          </Link>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={signOut}>
          <View>
            <Text style={[styles.text, styles.appBarItem]}>Sign Out</Text>
          </View>
        </TouchableWithoutFeedback>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-start" }}
      >
        <TouchableWithoutFeedback>
          <Link to="/" component={TouchableOpacity}>
            <Text style={[styles.text, styles.appBarItem]}>Repositories</Text>
          </Link>
        </TouchableWithoutFeedback>

        {signIn}
      </ScrollView>
    </View>
  );
};

export default AppBar;
