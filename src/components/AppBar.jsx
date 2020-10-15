import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <TouchableWithoutFeedback>
          <Link to="/" component={TouchableOpacity}>
            <Text style={styles.text}>Repositories</Text>
          </Link>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Link to="/signin" component={TouchableOpacity}>
            <Text style={styles.text}>Sign In</Text>
          </Link>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

export default AppBar;
