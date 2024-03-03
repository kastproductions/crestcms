"use client";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, Link, RouterProvider, useMatches, useParams } from "react-router-dom";
import {
  Box,
  Button,
  ChakraProvider,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";

import { proxy, useSnapshot } from "valtio";
import { Schema } from ".";
import { useCollection, useCollectionItem, useCollectionList, useDatabase } from "./hooks";
import { TRPCReactProvider, api } from "./trpc/react";

const router = createBrowserRouter([
  {
    path: "/crest",
    element: <Root />,
    children: [
      {
        path: "collection/:collectionId",
        element: <EntityList />,
      },
      {
        path: "collection/:collectionId/:id",
        element: <EntityForm />,
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
      <ChakraProvider>
        <TRPCReactProvider>
          <RouterProvider router={router} />
        </TRPCReactProvider>
      </ChakraProvider>
    </React.StrictMode>
  );
}

function Root() {
  let { collectionId } = useParams();

  return (
    <Stack direction="row" spacing={0}>
      <SideNavigation />
      <Stack spacing={0} w="full">
        <Header />
        <Stack height="calc(100vh - 12rem)" direction="row" spacing={0} overflowY="hidden">
          {!collectionId && <Dashboard />}
          {collectionId && <Outlet />}
        </Stack>
      </Stack>
    </Stack>
  );
}

function Dashboard() {
  const { schema } = useStore();
  const summary = api.collections.summary.useQuery();

  return (
    <Stack w="full" spacing={0}>
      <SimpleGrid columns={6} spacing={6} p={6}>
        {summary.data?.map(({ collection, count }) => {
          return (
            <Button
              key={collection}
              as={Link}
              to={`collection/${collection}`}
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
                {collection} ({count})
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
        <HStack height={14}>
          <Button
            fontWeight="black"
            as={Link}
            to="/crest"
            variant="link"
            color="gray.900"
            _hover={{ textDecoration: "none" }}
          >
            Crest CMS
          </Button>
        </HStack>
      </Container>
    </Box>
  );
}

function SideNavigation() {
  const { collectionNames } = useStore();
  let { collectionId } = useParams();
  const summary = api.collections.summary.useQuery();

  const activeStyles = (name: string) => {
    const active = collectionId === name;
    if (!active) return {};
    return {
      borderLeftColor: "gray.900",
      bg: "gray.50",
    };
  };

  return (
    <Stack
      h="100vh"
      spacing={0}
      minW={72}
      maxW={72}
      overflowY="hidden"
      borderRightColor="gray.200"
      borderRightWidth="1px"
    >
      <Text mb={4} color="gray.500" textTransform="uppercase" pt={5} px={4} fontSize="sm" fontWeight="semibold">
        Collections
      </Text>
      {summary.data?.map(({ collection }) => {
        return (
          <Button
            key={collection}
            w="full"
            px={4}
            color="gray.900"
            as={Link}
            to={`collection/${collection}`}
            variant="link"
            rounded="none"
            textAlign="left"
            justifyContent="flex-start"
            borderLeftColor="transparent"
            borderLeftWidth={5}
            whiteSpace="normal"
            h={14}
            bg="transparent"
            _hover={{ textDecor: "none" }}
            {...activeStyles(collection)}
          >
            <Text as="span" noOfLines={1}>
              {collection}
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
  const list = api.collections.documents.useQuery(collectionId!, { enabled: !!collectionId });

  return (
    <Stack spacing={4} w="full" px={12} py={4}>
      {/* <Heading textTransform="capitalize">{collectionId}</Heading> */}
      <Stack spacing={4}>
        <FormControl>
          <FormLabel textTransform="capitalize" fontSize="5xl">
            {collectionId}
          </FormLabel>
          <Input />
        </FormControl>
        <Stack spacing={1} w="full">
          {list.data?.map(({ id: cuid, ...rest }) => {
            const [key, value] = Object.entries(rest)?.[0] || ["", ""];
            return (
              <Button
                px={4}
                variant="link"
                key={cuid}
                as={Link}
                to={String(id)}
                rounded="none"
                textAlign="left"
                justifyContent="flex-start"
                color="gray.900"
                w="full"
                whiteSpace="normal"
                h={14}
                bg="gray.50"
                // bg={String(id) === String(cuid) ? "gray.100" : "transparent"}
              >
                <Text as="span" noOfLines={1}>
                  {value as string}
                </Text>
              </Button>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
}

function EntityForm() {
  let { collectionId, id } = useParams();
  const { schema } = useStore();
  const item = api.collections.documents.useQuery(
    { id: id!, name: collectionId! },
    { enabled: !!collectionId && !!id }
  );

  // const { data, status } = useCollection(collectionId!);
  // console.log({ data });
  // const result = React.useMemo(() => {
  //   if (!data) return {};
  //   // @ts-ignore
  //   return data.find((it) => String(it.id) === String(id));
  // }, [id, data]);
  // @ts-expect-error ...
  const entity = schema.collections[collectionId];
  // console.log({ entity });
  const list = Object.entries(entity);

  // console.log(item.data );
  return (
    <Stack py={4} w="full">
      <Container maxW="3xl" w="full">
        <Stack spacing={4}>
          {list.map(([key, value]) => {
            // @ts-expect-error ...
            if (value.type === "string") {
              return (
                <FormControl key={key}>
                  <FormLabel textTransform="capitalize">{key}</FormLabel>
                  <Input defaultValue={item.data?.[key] ?? ""} />
                </FormControl>
              );
            }
            // @ts-expect-error ...
            if (value.type === "markdown") {
              return (
                <FormControl key={key}>
                  <FormLabel textTransform="capitalize">{key}</FormLabel>
                  <Textarea defaultValue={item.data?.[key] ?? ""} />
                </FormControl>
              );
            }
            // @ts-expect-error ...
            if (value.type === "hasMany") {
              // @ts-expect-error ...
              const entity = value.schema._def.value;
              const ids = item.data?.[key] as string[];
              return <HasMany key={key} name={entity} ids={ids} />;
            }
            // @ts-expect-error ...
            if (value.type === "hasOne") {
              console.log({ item });
              // @ts-expect-error ...
              const entity = value.schema._def.value;
              const id = item.data?.[key] as string;
              console.log({ id, entity, item });
              return <HasOne key={key} name={entity} id={id} />;
            }
          })}
        </Stack>
      </Container>
    </Stack>
  );
}

function HasMany({ name, ids }: { name: string; ids: string[] }) {
  const item = api.collections.getRelated.useQuery({ ids, name }, { enabled: !!ids && !!name });
  return <Box as="pre">{JSON.stringify(item.data ?? {}, null, 2)}</Box>;
}
function HasOne({ name, id }: { name: string; id: string }) {
  const item = api.collections.getRelatedOne.useQuery({ id, name }, { enabled: !!id && !!name });
  return <Box as="pre">{JSON.stringify(item.data ?? {}, null, 2)}</Box>;
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
