import { Flex, Link, List, ListItem } from "@chakra-ui/react";
import React from "react";
import { Link as RLink } from "react-router-dom";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

export const NavBar = (props: any) => {
  return (
    <Flex
      as="header"
      justifyContent="space-between"
      alignItems="center"
      {...props}
    >
      <Flex as="nav">
        <List display="flex" flexDirection="row">
          <ListItem mr={4}>
            <Link fontSize="lg" as={RLink} to="/">
              Home
            </Link>
          </ListItem>
          <ListItem mr={4}>
            <Link fontSize="lg" as={RLink} to="/newsletter">
              Newsletter
            </Link>
          </ListItem>
          <ListItem>
            <Link fontSize="lg" as={RLink} to="/about">
              About
            </Link>
          </ListItem>
        </List>
      </Flex>
      <ColorModeSwitcher />
    </Flex>
  );
};
