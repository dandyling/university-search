import {
  Flex,
  Heading,
  Box,
  List,
  ListItem,
  IconButton,
  Icon,
  Link,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { db } from "..";
import { University, userState } from "../App";
import { ReactRouterProps } from "../features/SignInRedirect";
import firebase from "firebase/app";

interface Props {
  data: University[];
  showFavorites?: boolean;
}

export const UniversityList = (props: Props & ReactRouterProps) => {
  const { data, history, showFavorites } = props;
  const user = useRecoilValue(userState);
  const toast = useToast();

  const handleFavorite = async (university: University) => {
    if (user) {
      const { uid } = user as any;
      const userFavorites = await db.collection("favorites").doc(uid).get();
      try {
        if (userFavorites.exists) {
          await db
            .collection("favorites")
            .doc(uid)
            .update({
              favorites: firebase.firestore.FieldValue.arrayUnion(university),
            });
        } else {
          await db
            .collection("favorites")
            .doc(uid)
            .set({
              favorites: [university],
            });
        }
        toast({
          title: "Succesfully added to favorite",
          description: `The university is successfully added to your favorite list`,
          status: "success",
        });
      } catch (error) {
        toast({
          title: "Add to favorite failed",
          description: `${error.code}: ${error.message}`,
          status: "error",
        });
      }
    } else {
      history.push("/signin");
      toast({
        title: "Sign in",
        description: `Please sign in to use the favorites functionality`,
        status: "info",
      });
    }
  };

  return (
    <Flex direction="column" flex={1}>
      <Heading size="lg" as="h2">
        {data.length} results
      </Heading>
      <Box>
        <List>
          {data.map((d, i) => {
            const state = d["state-province"] ? `, ${d["state-province"]}` : "";
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
                          <Link as="a" href={`http://${domain}`} isExternal>
                            {domain}
                          </Link>
                        </ListItem>
                      ))}
                    </List>
                  </Flex>
                  {showFavorites && (
                    <IconButton
                      variant="ghost"
                      aria-label="Save as favorite"
                      icon={<Icon as={FaPlus} />}
                      onClick={() => handleFavorite(d)}
                      size="lg"
                    />
                  )}
                </Flex>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Flex>
  );
};
