import { ChakraProvider, theme } from "@chakra-ui/react";
import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { About } from "./About";
import { Home } from "./Home";
import { Newsletter } from "./Newsletter";

export const App = () => {
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
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </ChakraProvider>
    </Router>
  );
};

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
