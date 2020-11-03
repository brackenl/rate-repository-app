import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

import useRepositories from "../hooks/useRepositories";

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
  const [sort, setSort] = useState("oldest");
  const [variables, setVariables] = useState({
    orderBy: "RATING_AVERAGE",
    orderDirection: "DESC",
    searchKeyword: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const onChangeSearch = (query) => setSearchQuery(query);

  const { repositories, fetchMore } = useRepositories({
    first: 8,
    ...variables,
  });

  useEffect(() => {
    switch (sort) {
      case "oldest":
        setVariables({
          orderBy: "CREATED_AT",
          orderDirection: "DESC",
          searchKeyword: debouncedSearchQuery,
        });
        break;
      case "latest":
        setVariables({
          orderBy: "CREATED_AT",
          orderDirection: "ASC",
          searchKeyword: debouncedSearchQuery,
        });
        break;
      case "highestRated":
        setVariables({
          orderBy: "RATING_AVERAGE",
          orderDirection: "DESC",
          searchKeyword: debouncedSearchQuery,
        });
        break;
      case "lowestRated":
        setVariables({
          orderBy: "RATING_AVERAGE",
          orderDirection: "ASC",
          searchKeyword: debouncedSearchQuery,
        });
        break;
    }
  }, [sort, debouncedSearchQuery]);

  const onEndReach = () => {
    fetchMore();
  };

  // Get the nodes from the edges array
  let repositoryNodes = [];
  if (repositories) {
    repositoryNodes = repositories.edges.map((edge) => edge.node);
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
      <RepositoryListContainer
        repositories={repositoryNodes}
        onEndReach={onEndReach}
      />
    </>
  );
};

export default RepositoryList;
