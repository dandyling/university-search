import {
  Box,
  Button,
  Flex,
  Icon,
  Link,
  List,
  ListItem,
  useBreakpointValue,
  useToast,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link as RLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../App";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import firebase from "firebase/app";
import { FaBars, FaTimes } from "react-icons/fa";

export const NavBar = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useRecoilValue(userState);
  const toast = useToast();
  const isSidebar = useBreakpointValue({ base: true, md: false });

  const handleSignOut = async () => {
    await firebase.auth().signOut();
    toast({
      title: "Signed out",
      description: `You have signed out successfully`,
      status: "info",
    });
  };

  const handleToggle = () => {
    setIsOpen((value) => !value);
  };

  const show = !isSidebar || (isSidebar && isOpen);

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      alignItems={{ base: "flex-start", md: "center" }}
    >
      <Box pl={[4, 4, 0]} pt={[4, 4, 0]}>
        <MenuToggle onToggle={handleToggle} isOpen={isOpen} />
      </Box>
      {show && (
        <Flex
          position={{ base: "fixed", md: "static" }}
          top={{ base: 8, md: 0 }}
          mb={4}
          w={{ base: "80vw", md: "100%" }}
          p={4}
          backgroundColor="white"
          zIndex={9999}
          as="header"
          justifyContent={{ base: "flex-start", md: "space-between" }}
          flexDirection={{ base: "column", md: "row" }}
          alignItems={{ base: "flex-start", md: "center" }}
          boxShadow="md"
          {...props}
        >
          <List
            as="nav"
            flexDirection={{ base: "column", md: "row" }}
            alignItems={{ base: "flex-start", md: "center" }}
            display="flex"
          >
            <ListItem
              w={{ base: "100%", md: "auto" }}
              mr={[0, 0, 4]}
              my={[2, 2, 0]}
            >
              <Link
                _active={{ textDecoration: "none" }}
                _hover={{ textDecoration: "none" }}
                fontSize="lg"
                as={RLink}
                to="/"
              >
                <Text minW="100%">Home</Text>
              </Link>
            </ListItem>
            <ListItem
              w={{ base: "100%", md: "auto" }}
              mr={[0, 0, 4]}
              my={[2, 2, 0]}
            >
              <Link
                _active={{ textDecoration: "none" }}
                _hover={{ textDecoration: "none" }}
                fontSize="lg"
                as={RLink}
                to="/newsletter"
              >
                <Text minW="100%">Newsletter</Text>
              </Link>
            </ListItem>
            <ListItem
              w={{ base: "100%", md: "auto" }}
              mr={[0, 0, 4]}
              my={[2, 2, 0]}
            >
              <Link
                _active={{ textDecoration: "none" }}
                _hover={{ textDecoration: "none" }}
                fontSize="lg"
                as={RLink}
                to="/favorites"
              >
                <Text minW="100%">Favorites</Text>
              </Link>
            </ListItem>
            <ListItem w={{ base: "100%", md: "auto" }} my={[2, 2, 0]}>
              <Link
                _active={{ textDecoration: "none" }}
                _hover={{ textDecoration: "none" }}
                fontSize="lg"
                as={RLink}
                to="/about"
              >
                <Text minW="100%">About</Text>
              </Link>
            </ListItem>
          </List>
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            alignItems={{ base: "flex-start", md: "center" }}
          >
            {user && (
              <Button
                pl={{ base: 0, md: 4 }}
                variant="ghost"
                onClick={handleSignOut}
              >
                Sign out
              </Button>
            )}
            {!user && (
              <Button
                pl={{ base: 0, md: 4 }}
                as={RLink}
                to="/signin"
                variant="ghost"
              >
                Sign in
              </Button>
            )}
            <ColorModeSwitcher />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

interface MenuToggleProps {
  onToggle(): void;
  isOpen: boolean;
}

const MenuToggle = ({ onToggle, isOpen }: MenuToggleProps) => {
  return (
    <Box
      display={{ base: "flex", md: "none" }}
      justifyContent="center"
      alignItems="center"
      onClick={onToggle}
    >
      {isOpen ? <Icon as={FaTimes} /> : <Icon as={FaBars} />}
    </Box>
  );
};
