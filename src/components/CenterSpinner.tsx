import { Center, Spinner } from "@chakra-ui/react";
import React from "react";

export const CenterSpinner = () => {
  return (
    <Center position="fixed" w="100vw" h="100vh">
      <Spinner />
    </Center>
  );
};
