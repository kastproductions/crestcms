import { z } from "zod";

// import { desc, eq, schema } from "@acme/db";
// import { CreatePostSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const headers = new Headers({
  Authorization: "token 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",
});

const owner = "kastproductions";
const repo = "crestcms";
const branch = "main";

export const collectionRouter = createTRPCRouter({
  list: publicProcedure.input(z.string().optional()).query(async ({ ctx, input }) => {
    const path = `src/crest/collections/${input}`;
    if (input) {
      const baseUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
      const response = await fetch(baseUrl, { headers });
      const files = await response.json();
      if (!Array.isArray(files)) throw new Error("Expected an array of files");
      const jsonFiles = files.filter((file) => file.name.endsWith(".json"));
      return Promise.all(
        jsonFiles.map(async (file) => {
          const fileResponse = await fetch(file.download_url, { headers });
          return await fileResponse.json();
        })
      );
    }
    const baseUrl = `https://api.github.com/repos/${owner}/${repo}/contents/src/crest/collections?ref=${branch}`;
    const response = await fetch(baseUrl, { headers });
    const json = await response.json();
    if (!Array.isArray(json)) throw new Error("Woops");
    return json.filter((item) => item.type === "dir").map((folder) => folder.name);
  }),
  summary: publicProcedure.query(async ({ ctx, input }) => {
    const baseUrl = `https://api.github.com/repos/${owner}/${repo}/contents/src/crest/collections?ref=${branch}`;
    let folderDetails = [];
    // Step 1: Fetch all folders under the basePath
    const response = await fetch(baseUrl, { headers });
    const folders = await response.json();
    if (!Array.isArray(folders)) throw new Error("Woops");
    // Filter for directories only
    const directoryItems = folders.filter((item) => item.type === "dir");
    // Step 2: For each folder, fetch its contents and count JSON files
    for (const [index, folder] of directoryItems.entries()) {
      const folderResponse = await fetch(folder.url, { headers });
      const folderContents = await folderResponse.json();
      // Filter for .json files and count them
      // @ts-expect-error ...
      const jsonFileCount = folderContents.filter((file) => file.name.endsWith(".json")).length;
      // Step 3: Construct the data structure
      folderDetails.push({
        id: index + 1, // Assuming ID starts at 1 and increments
        name: folder.name,
        count: jsonFileCount,
      });
    }
    return folderDetails;
  }),
  get: publicProcedure.input(z.object({ id: z.string(), name: z.string() })).query(async ({ ctx, input }) => {
    const url = `https://raw.githubusercontent.com/kastproductions/crestcms/main/src/crest/collections/${input.name}/${input.id}.json`;
    const response = await fetch(url, { headers });
    const json = await response.json();
    return json;
  }),
  getRelated: publicProcedure
    .input(z.object({ ids: z.array(z.string()), name: z.string() }))
    .query(async ({ ctx, input }) => {
      const path = `src/crest/collections/${input.name}`;
      const baseUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
      const response = await fetch(baseUrl, { headers });
      const files = await response.json();
      if (!Array.isArray(files)) throw new Error("Expected an array of files");
      const jsonFiles = files.filter((file) => file.name.endsWith(".json"));
      const resolver = await Promise.all(
        jsonFiles.map(async (file) => {
          const fileResponse = await fetch(file.download_url, { headers });
          return await fileResponse.json();
        })
      );
      return resolver.filter((it) => input.ids.includes(it.id));
    }),
  getRelatedOne: publicProcedure.input(z.object({ id: z.string(), name: z.string() })).query(async ({ ctx, input }) => {
    const path = `src/crest/collections/${input.name}`;
    const baseUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
    const response = await fetch(baseUrl, { headers });
    const files = await response.json();
    if (!Array.isArray(files)) throw new Error("Expected an array of files");
    const jsonFiles = files.filter((file) => file.name.endsWith(".json"));
    const resolver = await Promise.all(
      jsonFiles.map(async (file) => {
        const fileResponse = await fetch(file.download_url, { headers });
        return await fileResponse.json();
      })
    );
    return resolver.find((it) => input.id === it.id) ?? {};
  }),
});
