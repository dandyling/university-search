import {
  Box,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  List,
  ListItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useSWR from "swr";
import { fetcher, University } from "./App";
import { CenterSpinner } from "./components/CenterSpinner";
import { EmptyScreen } from "./components/EmptyScreen";
import { ErrorScreen } from "./components/ErrorScreen";
import { Layout } from "./components/Layout";

export const Home = () => {
  const [name, setName] = useState("malaysia");
  const apiPath = `http://universities.hipolabs.com/search?name=${name}`;
  const shouldFetch = name.length > 1;
  const { data, error } = useSWR<University[]>(
    shouldFetch ? apiPath : null,
    fetcher
  );
  const isLoading = !data && !error && shouldFetch;
  return (
    <Layout>
      <Flex direction="column" maxH="100%" justifyContent="flex-start">
        <Box>
          <Heading as="h1">
            Search for the universities in the world here
          </Heading>
          <Box py={4}>
            <InputGroup>
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
                      <Heading
                        as="h3"
                        size="md"
                      >{`${d.name} - ${d.country}${state}`}</Heading>
                      <List display="flex" flexDirection="column">
                        {d.domains.map((domain, j) => (
                          <ListItem key={`${j}-${domain}`}>
                            <Link as="a" href={`http://${domain}`} isExternal>
                              {domain}
                            </Link>
                          </ListItem>
                        ))}
                      </List>
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
