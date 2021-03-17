import { Center, Heading } from "@chakra-ui/react";
import firebase from "firebase/app";
import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { Layout } from "../components/Layout";

export interface ReactRouterProps {
  history?: any;
}

const SignInRedirect = (props: ReactRouterProps) => {
  const emailLinkComplete = () => {
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      var email = window.localStorage.getItem("emailForSignIn") ?? "";
      if (!email) {
        email =
          window.prompt("Please provide your email for confirmation") ?? "";
      }
      firebase
        .auth()
        .signInWithEmailLink(email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem("emailForSignIn");
          props.history.push("/");
        })
        .catch((error) => {
          console.error({ error });
        });
    }
  };

  useEffect(() => {
    emailLinkComplete();
  });

  return (
    <Layout>
      <Center direction="column" minH="100vh" justifyContent="center">
        <Heading as="h2" color="Highlight">
          Sign In Successful
        </Heading>
      </Center>
    </Layout>
  );
};

export default withRouter(SignInRedirect);
