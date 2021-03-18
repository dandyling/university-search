import { Heading } from "@chakra-ui/react";
import React from "react";

interface Props {
  message: string;
}

export const EmptyScreen = (props: Props) => {
  const { message } = props;
  return (
    <Heading p={4} as="h2" size="lg">
      {message}
    </Heading>
  );
};
