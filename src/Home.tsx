import {
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  List,
  ListItem,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { withRouter } from "react-router";
import { useRecoilValue } from "recoil";
import useSWR from "swr";
import { db } from ".";
import { fetcher, University, userState } from "./App";
import { CenterSpinner } from "./components/CenterSpinner";
import { EmptyScreen } from "./components/EmptyScreen";
import { ErrorScreen } from "./components/ErrorScreen";
import { Layout } from "./components/Layout";
import { ReactRouterProps } from "./features/SignInRedirect";
import firebase from "firebase/app";

const Home = (props: ReactRouterProps) => {
  const [name, setName] = useState("malaysia");
  const user = useRecoilValue(userState);
  const toast = useToast();
  const apiPath = `http://universities.hipolabs.com/search?name=${name}`;
  const shouldFetch = name.length > 1;
  const { data, error } = useSWR<University[]>(
    shouldFetch ? apiPath : null,
    fetcher
  );
  const isLoading = !data && !error && shouldFetch;

  const handleFavorite = async (university: University) => {
    if (user) {
      const { uid } = user as any;
      const userFavorites = await db.collection("favorites").doc(uid).get();
      if (userFavorites.exists) {
        db.collection("favorites")
          .doc(uid)
          .update({
            favorites: firebase.firestore.FieldValue.arrayUnion(university),
          });
      } else {
        db.collection("favorites")
          .doc(uid)
          .set({
            favorites: [university],
          });
      }
    } else {
      props.history.push("/signin");
      toast({
        title: "Sign in",
        description: `Please sign in to use the favorites functionality`,
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Layout>
      <Flex direction="column" maxH="100%" justifyContent="flex-start">
        <Box>
          <Heading as="h1">
            Search for the universities in the world here
          </Heading>
          <InputGroup my={4}>
            <Input
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              placeholder="Search here"
            />
            <InputRightElement
              pointerEvents="none"
              children={<Icon as={FaSearch} />}
            />
          </InputGroup>
        </Box>
        {data && data.length > 0 && (
          <Flex direction="column" flex={1}>
            <Heading size="lg" as="h2">
              {data.length} results
            </Heading>
            <Box>
              <List>
                {data.map((d, i) => {
                  const state = d["state-province"]
                    ? `, ${d["state-province"]}`
                    : "";
                  return (
                    <ListItem key={`${i}-${d.name}`} py={4}>
                      <Flex justifyContent="space-between" alignItems="center">
                        <Flex direction="column">
                          <Heading
                            as="h3"
                            size="md"
                          >{`${d.name} - ${d.country}${state}`}</Heading>
                          <List display="flex" flexDirection="column">
                            {d.domains.map((domain, j) => (
                              <ListItem key={`${j}-${domain}`}>
                                <Link
                                  as="a"
                                  href={`http://${domain}`}
                                  isExternal
                                >
                                  {domain}
                                </Link>
                              </ListItem>
                            ))}
                          </List>
                        </Flex>
                        <IconButton
                          variant="ghost"
                          aria-label="Save as favorite"
                          icon={<Icon as={FaPlus} />}
                          onClick={() => handleFavorite(d)}
                          size="lg"
                        />
                      </Flex>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Flex>
        )}
        {error && <ErrorScreen message={error.message} />}
        {isLoading && <CenterSpinner />}
        {data && data.length === 0 && (
          <EmptyScreen
            message={` Couldn't find any university with the name ${name}`}
          />
        )}
      </Flex>
    </Layout>
  );
};

export default withRouter(Home);
