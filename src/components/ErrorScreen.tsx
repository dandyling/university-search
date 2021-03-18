import { Box, Heading } from "@chakra-ui/react";
import React from "react";

interface Props {
  message: string;
}

export const ErrorScreen = (props: Props) => {
  const { message } = props;
  return (
    <Box p={4}>
      <Heading as="h2" color="red">
        Error: {message}
      </Heading>
    </Box>
  );
};
