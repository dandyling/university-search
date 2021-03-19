import {
  Box,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
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
import debounce from "lodash.debounce";

const Home = (props: ReactRouterProps) => {
  const [name, setName] = useState("malaysia");
  const [search, setSearch] = useState("malaysia");
  const apiPath = `http://universities.hipolabs.com/search?name=${search}`;
  const shouldFetch = search.length > 4;
  const { data, error } = useSWR<University[]>(
    shouldFetch ? apiPath : null,
    fetcher
  );
  const isLoading = !data && !error && shouldFetch;

  const debouncedSearch = useCallback(
    debounce((nextValue: string) => setSearch(nextValue), 1000),
    []
  );

  return (
    <Layout>
      <Flex direction="column" maxH="100%" justifyContent="flex-start">
        <Box px={4}>
          <Heading textAlign="center" as="h1" fontWeight={600}>
            Search for universities
          </Heading>
          <InputGroup my={4}>
            <Input
              size="lg"
              pb={1}
              pl={5}
              borderRadius={48}
              backgroundColor="white"
              boxShadow="md"
              value={name}
              onChange={(e) => {
                setName(e.currentTarget.value);
                debouncedSearch(e.currentTarget.value);
              }}
              placeholder="Search here"
            />
            <InputRightElement
              alignSelf="center"
              pointerEvents="none"
              children={
                <Flex h="100%" alignItems="center">
                  <Icon mt={2} mr={2} as={FaSearch} />
                </Flex>
              }
            />
          </InputGroup>
        </Box>
        {data && data.length > 0 && (
          <UniversityList data={data} showFavorites />
        )}
        {data && data.length === 0 && (
          <EmptyScreen
            message={` Couldn't find any university with the name ${search}`}
          />
        )}
        {error && <ErrorScreen message={error.message} />}
        {isLoading && <CenterSpinner />}
      </Flex>
    </Layout>
  );
};

export default withRouter(Home);
