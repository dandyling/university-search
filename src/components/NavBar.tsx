import { Button, Flex, Link, List, ListItem, useToast } from "@chakra-ui/react";
import React from "react";
import { Link as RLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../App";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import firebase from "firebase/app";

export const NavBar = (props: any) => {
  const user = useRecoilValue(userState);
  const toast = useToast();

  const handleSignOut = async () => {
    await firebase.auth().signOut();
    toast({
      title: "Signed out",
      description: `You have signed out successfully`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

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
          <ListItem mr={4}>
            <Link fontSize="lg" as={RLink} to="/favorites">
              Favorites
            </Link>
          </ListItem>
          <ListItem>
            <Link fontSize="lg" as={RLink} to="/about">
              About
            </Link>
          </ListItem>
        </List>
      </Flex>
      <Flex>
        {user && (
          <Button variant="ghost" onClick={handleSignOut}>
            Sign out
          </Button>
        )}
        {!user && (
          <Button as={RLink} to="/signin" variant="ghost">
            Sign in
          </Button>
        )}
        <ColorModeSwitcher />
      </Flex>
    </Flex>
  );
};
