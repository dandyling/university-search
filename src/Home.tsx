import {
  Box,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { withRouter } from "react-router";
import useSWR from "swr";
import { fetcher, University } from "./App";
import { CenterSpinner } from "./components/CenterSpinner";
import { EmptyScreen } from "./components/EmptyScreen";
import { ErrorScreen } from "./components/ErrorScreen";
import { Layout } from "./components/Layout";
import { UniversityList } from "./components/UniversityList";
import { ReactRouterProps } from "./features/SignInRedirect";

const Home = (props: ReactRouterProps) => {
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
          <UniversityList data={data} showFavorites />
        )}
        {data && data.length === 0 && (
          <EmptyScreen
            message={` Couldn't find any university with the name ${name}`}
          />
        )}
        {error && <ErrorScreen message={error.message} />}
        {isLoading && <CenterSpinner />}
      </Flex>
    </Layout>
  );
};

export default withRouter(Home);
