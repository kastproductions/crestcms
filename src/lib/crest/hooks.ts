import { useQuery } from "@tanstack/react-query";

export const useCollection = (collection: string) => {
  return useQuery({
    queryKey: [collection],
    queryFn: () => fetch(`http://localhost:8000/${collection}`).then((res) => res.json()),
  });
};

export const useDatabase = (keys: string[]) => {
  function getDatabase() {
    const promises = keys.map((k) => {
      return fetch(`http://localhost:8000/${k}`)
        .then((res) => res.json())
        .then((data) => ({ [k]: data }));
    });
    return Promise.all(promises);
  }

  return useQuery({
    queryKey: keys,
    queryFn: getDatabase,
  });
};

async function getCollectionItem({ queryKey }: { queryKey: string[] }) {
  const url = `https://raw.githubusercontent.com/kastproductions/crestcms/main/src/crest/collections/${queryKey[0]}/${queryKey[1]}.json`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

export const useCollectionItem = (queryKey: string[]) => {
  return useQuery({
    queryKey,
    queryFn: getCollectionItem,
  });
};

async function getSingletonItem({ queryKey }: { queryKey: string[] }) {
  const url = `https://raw.githubusercontent.com/kastproductions/crestcms/main/src/crest/singletons/${queryKey[0]}/${queryKey[1]}.json`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

export const useSingletonItem = (queryKey: string[]) => {
  return useQuery({
    queryKey,
    queryFn: getSingletonItem,
  });
};

// if private repo then add header:

// const response = await fetch(baseUrl, { headers });

async function getCollectionList() {
  const owner = "kastproductions";
  const repo = "crestcms";
  const branch = "main";
  const path = "src/crest/collections/authors";
  const baseUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;

  const response = await fetch(baseUrl);
  const files = await response.json();
  if (!Array.isArray(files)) throw new Error("Expected an array of files");
  const jsonFiles = files.filter((file) => file.name.endsWith(".json"));
  return Promise.all(
    jsonFiles.map(async (file) => {
      const fileResponse = await fetch(file.download_url);
      return await fileResponse.json();
    })
  );
}

export const useCollectionList = (queryKey: string[]) => {
  return useQuery({
    queryKey,
    queryFn: getCollectionList,
  });
};

async function getSampleData() {
  const response = await fetch(`/api/crest/hello/world`);
  return response.json();
}

export const useGetTestData = (queryKey: string[]) => {
  return useQuery({
    queryKey,
    queryFn: getSampleData,
  });
};
