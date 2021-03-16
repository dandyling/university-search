import {
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useSWR from "swr";
import { fetcher, University } from "./App";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

export const Home = () => {
  const [name, setName] = useState("");
  const apiPath = `http://universities.hipolabs.com/search?name=${name}`;
  const shouldFetch = name.length > 1;
  const { data, error } = useSWR<University[]>(
    shouldFetch ? apiPath : null,
    fetcher
  );

  return (
    <Flex direction="column" minH="100vh" p={4} justifyContent="flex-start">
      <Flex w="100%" justifyContent="space-between">
        <Heading as="h1">Search for the universities in the world here</Heading>
        <ColorModeSwitcher />
      </Flex>
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
      {error && (
        <Box>
          <Heading as="h2" color="red">
            Error: {error.message}
          </Heading>
        </Box>
      )}
      {!data && !error && shouldFetch && (
        <Center position="fixed" w="100vw" h="100vh">
          <Spinner />
        </Center>
      )}
      {data && data.length > 0 && (
        <>
          <Heading size="lg" as="h2">
            {data.length} results
          </Heading>
          <Box p={4}>
            <List>
              {data.map((d) => {
                const state = d["state-province"]
                  ? `, ${d["state-province"]}`
                  : "";
                return (
                  <ListItem>{`${d.name} - ${d.country}${state}`}</ListItem>
                );
              })}
            </List>
          </Box>
        </>
      )}
      {data && data.length === 0 && (
        <Heading as="h2" size="lg">
          Couldn't find any university with the name {name}
        </Heading>
      )}
    </Flex>
  );
};
