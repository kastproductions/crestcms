"use client";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, Link, RouterProvider, useMatches, useParams } from "react-router-dom";
import { Box, Button, ChakraProvider, Container, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { proxy, useSnapshot } from "valtio";
import { Schema } from ".";
import { useCollection, useDatabase } from "./hooks";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/crest",
    element: <Root />,
    children: [
      {
        path: "collection/:collectionId",
        element: <EntityList />,
        children: [
          {
            path: ":id",
            element: <EntityForm />,
          },
        ],
      },
    ],
  },
]);

export function renderAdminUi({ schema, rootId }: { schema: Schema; rootId: string }) {
  if (typeof window === "undefined") return;
  state.setSchema(schema);
  const appRoot = window.document.getElementById(rootId);
  ReactDOM.createRoot(appRoot!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <RouterProvider router={router} />
        </ChakraProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

function Root() {
  let { collectionId } = useParams();

  return (
    <Stack spacing={0}>
      <Header />
      <Stack height="calc(100vh - 5.6rem)" direction="row" spacing={0}>
        <SideNavigation />
        {!collectionId && <Dashboard />}
        {collectionId && <Outlet />}
      </Stack>
    </Stack>
  );
}

function Dashboard() {
  const { schema } = useStore();
  const keys = Object.keys(schema?.collections || {});
  const database = useDatabase(keys);
  console.log({ database });
  return (
    <Stack w="full" spacing={0}>
      <HStack px={6} h={16} borderBottomColor="gray.200" borderBottomWidth="1px">
        <Text fontWeight="bold" fontSize="lg">
          Dashboard
        </Text>
      </HStack>
      <SimpleGrid columns={6} spacing={6} p={6}>
        {database.data?.map((item) => {
          console.log({ item });
          const [name, values] = Object.entries(item)[0];
          return (
            <Button
              key={name}
              as={Link}
              to={`collection/${name}`}
              textAlign="left"
              justifyContent="flex-start"
              borderColor="gray.200"
              borderWidth="1px"
              w="full"
              whiteSpace="normal"
              h={14}
              bg="transparent"
              _hover={{
                bg: "gray.50",
              }}
            >
              <Text as="span" noOfLines={1}>
                {name} ({values.length})
              </Text>
            </Button>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
}

function Header() {
  return (
    <Box as="header" w="full" borderBottomColor="gray.200" borderBottomWidth="1px">
      <Container maxW="9xl" w="full">
        <HStack height={20}>
          <Text fontWeight="black">Crest CMS</Text>
        </HStack>
      </Container>
    </Box>
  );
}

function SideNavigation() {
  const { collectionNames } = useStore();
  let { collectionId } = useParams();
  return (
    <Stack spacing={0} minW={72} maxW={72} overflowY="hidden" borderRightColor="gray.200" borderRightWidth="1px">
      <Button
        h={14}
        color="gray.900"
        px={4}
        as={Link}
        variant="link"
        rounded="none"
        textAlign="left"
        justifyContent="flex-start"
        bg={!collectionId ? "gray.100" : "transparent"}
      >
        Dashboard
      </Button>
      <Text mt={8} color="gray.500" textTransform="uppercase" px={4} fontSize="sm" fontWeight="semibold">
        Collections
      </Text>
      {collectionNames?.map((name) => {
        return (
          <Button
            key={name}
            w="full"
            px={4}
            color="gray.900"
            as={Link}
            to={`collection/${name}`}
            variant="link"
            rounded="none"
            textAlign="left"
            justifyContent="flex-start"
            borderBottomColor="gray.200"
            borderBottomWidth="1px"
            whiteSpace="normal"
            h={14}
            bg={collectionId === name ? "gray.100" : "transparent"}
          >
            <Text as="span" noOfLines={1}>
              {name}
            </Text>
          </Button>
        );
      })}
    </Stack>
  );
}

function IframePreview() {
  return <Box as="iframe" id="website" src={"http://localhost:3000"} w="full" overflowY="hidden" />;
}

function EntityList() {
  let { collectionId, id } = useParams();
  const { data, status } = useCollection(collectionId!);
  const { schema } = useStore();
  const collectionSchema = schema?.collections?.[collectionId!];
  const key = Object.keys(schema?.collections?.[collectionId!])[0];
  console.log({ collectionId, id });
  return (
    <Stack direction="row">
      <Stack spacing={0} w={72} overflowY="hidden" borderRightColor="gray.200" borderRightWidth="1px">
        {/* @ts-ignore */}
        {data?.map((item) => {
          return (
            <Button
              key={item.id}
              as={Link}
              to={String(item.id)}
              rounded="none"
              textAlign="left"
              justifyContent="flex-start"
              borderBottomColor="gray.200"
              borderBottomWidth="1px"
              w="full"
              whiteSpace="normal"
              h={14}
              bg={String(id) === String(item.id) ? "gray.100" : "transparent"}
            >
              <Text as="span" noOfLines={1}>
                {item[key]}
              </Text>
            </Button>
          );
        })}
      </Stack>
      <Outlet />
    </Stack>
  );
}

function EntityForm() {
  let { collectionId, id } = useParams();
  const { data, status } = useCollection(collectionId!);
  console.log({ data });
  const result = React.useMemo(() => {
    if (!data) return {};
    // @ts-ignore
    return data.find((it) => String(it.id) === String(id));
  }, [id, data]);

  return (
    <Stack>
      <Box as="pre" maxW={72}>
        {JSON.stringify(result, null, 2)}
      </Box>
    </Stack>
  );
}

const state = proxy({
  schema: null as unknown as Schema,
  selected: { type: "", entity: "" },
  setSchema(value: Schema) {
    state.schema = value;
  },
  get collectionNames() {
    const collections = this?.schema?.collections;
    return Object.keys(collections || {});
  },
  // get entityList() {
  //   if (state.selected.type === "collection") {
  //     return [];
  //   }
  //   if (state.selected.type === "singleton") {
  //     return {};
  //   }
  //   return null;
  // },
});

function useStore(schema?: Schema) {
  const snap = useSnapshot(state);

  React.useEffect(() => {
    if (snap.schema) return;
    snap.setSchema(schema as Schema);
  }, [snap.schema]);

  return snap;
}
