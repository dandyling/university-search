import { ChakraProvider, Flex, List, ListItem, theme } from "@chakra-ui/react";
import * as React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { About } from "./About";
import { Home } from "./Home";
import { Newsletter } from "./Newsletter";

export const App = () => {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Flex as="nav">
          <List display="flex" flexDirection="row">
            <ListItem mr={4}>
              <Link to="/">Home</Link>
            </ListItem>
            <ListItem mr={4}>
              <Link to="/newsletter">Newsletter</Link>
            </ListItem>
            <ListItem>
              <Link to="/about">About</Link>
            </ListItem>
          </List>
        </Flex>
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
