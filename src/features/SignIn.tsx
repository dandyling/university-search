import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import firebase from "firebase/app";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { actionCodeSettings } from "../config";
import { ReactRouterProps } from "./SignInRedirect";

const SignIn = (props: ReactRouterProps) => {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      toast({
        title: "Email sent succesfully",
        description: `Please check your email ${email} and click on the link to sign in`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Signup with email failed",
        description: `${error.code} - ${error.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleBack = () => {
    props.history.goBack();
  };

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      minW="100vw"
      minH="100vh"
      p={4}
    >
      <Flex w="100%" p={4} direction="column">
        <FormControl py={2} id="username">
          <FormLabel fontSize="md" mb={2}>
            Email
          </FormLabel>
          <Input
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Please enter your email here"
          />
        </FormControl>
        <ButtonGroup mt={4} display="flex" flexDirection="column" isAttached>
          <Button w="100%" size="lg" mb={2} onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="ghost" w="100%" onClick={handleBack}>
            Back
          </Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
};

export default withRouter(SignIn);
