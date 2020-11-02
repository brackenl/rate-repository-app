import React from "react";
import { StyleSheet, View } from "react-native";
import { Route, Switch, Redirect } from "react-router-native";

import AppBar from "./AppBar";
import CreateReview from "./CreateReview";
import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SingleRepoView from "./SingleRepoView";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "rgb(220,225,228)",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/signin" exact>
          <SignIn />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/review" exact>
          <CreateReview />
        </Route>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/repo/:repo">
          <SingleRepoView />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
