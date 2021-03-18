import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";

export const Favorites = () => {
  return (
    <Layout>
      <Flex direction="column" justifyContent="flex-start">
        <Heading as="h1">Favorites</Heading>
      </Flex>
    </Layout>
  );
};
