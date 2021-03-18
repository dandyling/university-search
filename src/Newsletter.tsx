import { Button, Flex, Heading, Input, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { db } from ".";
import { Layout } from "./components/Layout";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      await db.collection("newsletter").add({ email });
      toast({
        title: "Suscribe successful",
        description: `You are successfully suscribed to our newsletter!`,
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Suscribe unsuccessful",
        description: `${error.code}: ${error.message}`,
        status: "error",
      });
    }
  };

  return (
    <Layout>
      <Flex p={4} direction="column" justifyContent="flex-start">
        <Heading fontWeight="600" pb={4} as="h1">
          Newsletter
        </Heading>
        <Heading pb={4} as="h2" fontWeight={500} size="sm">
          Suscribe to our newsletter by entering your email below and click
          submit!
        </Heading>
        <Input
          mb={4}
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </Flex>
    </Layout>
  );
};
