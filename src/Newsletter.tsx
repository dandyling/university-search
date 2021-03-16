import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Layout } from "./components/Layout";

export const Newsletter = () => {
  return (
    <Layout>
      <Flex direction="column" justifyContent="flex-start">
        <Heading as="h1">Newsletter</Heading>
      </Flex>
    </Layout>
  );
};
