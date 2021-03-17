import { ChakraProvider, theme } from "@chakra-ui/react";
import firebase from "firebase/app";
import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { atom, useSetRecoilState } from "recoil";
import { About } from "./About";
import SignIn from "./features/SignIn";
import SignInRedirect from "./features/SignInRedirect";
import { Home } from "./Home";
import { Newsletter } from "./Newsletter";

export const App = () => {
  const setUser = useSetRecoilState<any>(userState);

  firebase?.auth().onAuthStateChanged(function (u) {
    if (u) {
      setUser(u);
    } else {
      setUser(null);
    }
  });

  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Switch>
          <Route path="/newsletter">
            <Newsletter />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signin-redirect">
            <SignInRedirect />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </ChakraProvider>
    </Router>
  );
};

export const userState = atom({
  key: "userState",
  default: null,
  dangerouslyAllowMutability: true,
});

export const fetcher = async (input: string, options: any) => {
  const response = await fetch(input, options);
  const data = await response.json();
  return data;
};

export interface University {
  web_pages: string[];
  country: string;
  "state-province": string;
  domains: string[];
  name: string;
  alpha_two_code: string;
}
