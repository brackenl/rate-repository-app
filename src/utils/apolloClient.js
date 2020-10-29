import ApolloClient from "apollo-boost";

const createApolloClient = (authStorage) => {
  return new ApolloClient({
    request: async (operation) => {
      try {
        const accessToken = await authStorage.getAccessToken();
        operation.setContext({
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : "",
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
    uri: "http://192.168.1.115:5000/graphql",
  });
};

export default createApolloClient;
