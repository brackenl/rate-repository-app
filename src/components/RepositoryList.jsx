import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useLazyQuery } from "@apollo/react-hooks";
import RNPickerSelect from "react-native-picker-select";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

import { GET_REPOSITORIES } from "../graphql/queries";

import RepositoryListContainer from "./RepositoryListContainer";

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const RepositoryList = () => {
  let variables = { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
  const [getRepos, { data }] = useLazyQuery(GET_REPOSITORIES, {
    variables: variables,
  });

  const [sort, setSort] = useState("oldest");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const onChangeSearch = (query) => setSearchQuery(query);

  useEffect(() => {
    console.log(sort, searchQuery);
    switch (sort) {
      case "oldest":
        variables = {
          orderBy: "CREATED_AT",
          orderDirection: "DESC",
          searchKeyword: debouncedSearchQuery,
        };
        break;
      case "latest":
        variables = {
          orderBy: "CREATED_AT",
          orderDirection: "ASC",
          searchKeyword: debouncedSearchQuery,
        };
        break;
      case "highestRated":
        variables = {
          orderBy: "RATING_AVERAGE",
          orderDirection: "DESC",
          searchKeyword: debouncedSearchQuery,
        };
        break;
      case "lowestRated":
        variables = {
          orderBy: "RATING_AVERAGE",
          orderDirection: "ASC",
          searchKeyword: debouncedSearchQuery,
        };
        break;
    }
    console.log("variables: ", variables);
    getRepos({ variables: variables });
  }, [sort, debouncedSearchQuery]);

  // Get the nodes from the edges array
  let repositoryNodes = [];
  if (data) {
    repositoryNodes = data.repositories.edges.map((edge) => edge.node);
  }

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{ marginHorizontal: 10, marginTop: 5 }}
      />
      <RNPickerSelect
        onValueChange={(value) => {
          setSort(value);
        }}
        items={[
          { label: "Latest repositiories", value: "latest" },
          { label: "Oldest repositiories", value: "oldest" },
          { label: "Highest rated repositiories", value: "highestRated" },
          { label: "Lowest rated repositiories", value: "lowestRated" },
        ]}
        placeholder={{ label: "Sort by...", value: "latest" }}
        style={pickerSelectStyles}
      />
      <RepositoryListContainer repositories={repositoryNodes} />
    </>
  );
};

export default RepositoryList;
