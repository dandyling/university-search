import { Box, Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { NavBar } from "./NavBar";

interface Props {
  children: ReactNode;
}

export const Layout = (props: Props) => {
  const { children } = props;
  return (
    <Flex
      minW="100wh"
      maxW="100wh"
      minH="100vh"
      maxH="100vh"
      direction="column"
    >
      <NavBar p={4} />
      <Box p={4} flex={1} overflowY="scroll">
        {children}
      </Box>
    </Flex>
  );
};
