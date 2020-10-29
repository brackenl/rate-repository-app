import { useContext } from "react";
import { useMutation, useApolloClient } from "@apollo/react-hooks";

import AuthStorageContext from "../contexts/AuthStorageContext";

import { SIGN_IN } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const authStorage = useContext(AuthStorageContext);
  const client = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        username: username,
        password: password,
      },
    });
    await authStorage.setAccessToken(data.authorize.accessToken); // update??
    client.resetStore();
  };

  return [signIn, result];
};

export default useSignIn;
