import React from "react";

import { View, Text, Image, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 5,
  },
  fullName: {
    fontWeight: "bold",
    color: theme.colors.textPrimary,
  },
  secondary: { color: theme.colors.textSecondary },
  language: {
    backgroundColor: theme.colors.primary,
    color: "white",
    paddingHorizontal: 5,
    paddingVertical: 3,
    flexGrow: 0,
    borderRadius: 5,
    overflow: "hidden",
  },
  headingBox: {
    paddingVertical: 2,
    paddingLeft: 10,
    paddingRight: 2,
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    flexShrink: 1,
  },
  smallBox: {
    flexGrow: 1,
  },
  smallBoxtop: {
    color: theme.colors.textPrimary,
    textAlign: "center",
    fontWeight: "bold",
  },
  smallBoxbottom: {
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
});

const RepositoryItem = ({
  id,
  ownerAvatarUrl,
  fullName,
  description,
  language,
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
}) => {
  return (
    <View testID={id} style={{ backgroundColor: "white" }}>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Image
            style={styles.image}
            source={{
              uri: ownerAvatarUrl,
            }}
          />
        </View>

        <View
          style={{
            flex: 1,
            flexShrink: 1,
          }}
        >
          <View style={styles.headingBox}>
            <Text style={styles.fullName} testID="fullName">
              {fullName}
            </Text>
          </View>
          <View style={styles.headingBox}>
            <Text style={styles.secondary} testID="description">
              {description}
            </Text>
          </View>
          <View style={[styles.headingBox, { flexDirection: "row" }]}>
            <Text style={styles.language} testID="language">
              {language}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 5,
        }}
      >
        <View style={styles.smallBox}>
          <Text style={styles.smallBoxtop}>
            {(stargazersCount / 1000).toFixed(1) + "k"}
          </Text>
          <Text style={styles.smallBoxbottom}>Stars</Text>
        </View>

        <View style={styles.smallBox}>
          <Text style={styles.smallBoxtop}>
            {(forksCount / 1000).toFixed(1) + "k"}
          </Text>
          <Text style={styles.smallBoxbottom}>Forks</Text>
        </View>

        <View style={styles.smallBox}>
          <Text style={styles.smallBoxtop}>{reviewCount}</Text>
          <Text style={styles.smallBoxbottom}>Reviews</Text>
        </View>

        <View style={styles.smallBox}>
          <Text style={styles.smallBoxtop}>{ratingAverage}</Text>
          <Text style={styles.smallBoxbottom}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
