import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Layout } from "./components/Layout";

export const About = () => {
  return (
    <Layout>
      <Flex direction="column" justifyContent="flex-start">
        <Heading as="h1">About</Heading>
        <Text>
          This website allows you to search for university from all around the
          world
        </Text>
      </Flex>
    </Layout>
  );
};
