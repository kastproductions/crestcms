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

async function fetchJsonFromGithub() {
  const url = "https://raw.githubusercontent.com/<username>/<repository>/<branch>/crest/author/2jhb53dio.json";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const jsonData = await response.json();
    console.log(jsonData);
    // Process your JSON data further here
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
  }
}
