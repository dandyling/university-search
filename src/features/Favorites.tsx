import { Flex, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { db } from "..";
import { University, userState } from "../App";
import { Layout } from "../components/Layout";
import { UniversityList } from "../components/UniversityList";

export const Favorites = () => {
  const user = useRecoilValue(userState);
  const [data, setData] = useState<University[]>([]);

  const fetchFavorites = async (uid: string) => {
    const favorites = await db.collection("favorites").doc(uid).get();
    const dataFavorites = favorites.data() as any;
    setData(dataFavorites.favorites);
  };

  useEffect(() => {
    const { uid } = user as any;
    fetchFavorites(uid);
  }, [user]);

  return (
    <Layout>
      <Flex direction="column" justifyContent="flex-start">
        <Heading px={4} fontWeight={600} as="h1">
          Favorites
        </Heading>
        <UniversityList data={data} />
      </Flex>
    </Layout>
  );
};
