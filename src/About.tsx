import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

export const About = () => {
  return (
    <Flex direction="column" minH="100vh" p={4} justifyContent="flex-start">
      <Heading as="h1">About</Heading>
    </Flex>
  );
};
