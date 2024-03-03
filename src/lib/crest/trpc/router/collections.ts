import { z } from "zod";
import { Octokit } from "@octokit/rest";

// const octokit = new Octokit();
const octokit = new Octokit({
  auth: "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",
});

// import { desc, eq, schema } from "@acme/db";
// import { CreatePostSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const headers = new Headers({
  // Authorization: undefined,
  Authorization: "token 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",
});

const owner = "kastproductions";
const repo = "crestcms";
const branch = "main";

export const collectionRouter = createTRPCRouter({
  documents: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return getDocuments(input);
  }),
  summary: publicProcedure.query(async ({ ctx, input }) => {
    return getCollectionsSummary();
  }),
  document: publicProcedure.input(z.object({ id: z.string(), name: z.string() })).query(async ({ ctx, input }) => {
    return getDocument(input.name, input.id);
  }),
  getRelated: publicProcedure
    .input(z.object({ ids: z.array(z.string()), name: z.string() }))
    .query(async ({ ctx, input }) => {
      return {};
    }),
  getRelatedOne: publicProcedure.input(z.object({ id: z.string(), name: z.string() })).query(async ({ ctx, input }) => {
    return {};
  }),
});

async function getDocument(collection: string, documentId: string) {
  const pathPrefix = "src/crest/collections";
  const filePath = `${pathPrefix}/${collection}/${documentId}.json`;
  const response = await octokit.rest.repos.getContent({
    owner,
    repo,
    path: filePath,
  });
  const fileData = response.data;
  if (!fileData?.content) throw new Error("Content not found in fileData");
  const content = Buffer.from(fileData.content, "base64").toString("utf-8");
  return JSON.parse(content);
}

async function getCollectionsSummary() {
  const pathPrefix = "src/crest/collections";

  try {
    // Fetch directories (collections) in the specified path
    const { data: dirs } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: pathPrefix,
    });

    // Filter out directories and prepare a promise for each to count its JSON files
    const countPromises = dirs
      .filter((dir) => dir.type === "dir")
      .map(async (dir, index) => {
        const { data: files } = await octokit.rest.repos.getContent({
          owner,
          repo,
          path: dir.path,
        });

        // Count JSON files in the directory
        const jsonFilesCount = files.filter((file) => file.name.endsWith(".json")).length;

        return {
          id: String(index + 1), // ID based on index, adjust as needed
          collection: dir.name,
          count: jsonFilesCount,
        };
      });

    // Resolve all promises to get the counts for each collection
    return await Promise.all(countPromises);
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw error;
  }
}

async function getDocuments(collection: string) {
  const pathPrefix = "src/crest/collections";

  try {
    // Fetch the list of JSON files in the specified collection
    const { data: files } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: `${pathPrefix}/${collection}`,
    });

    // Filter out JSON files and prepare a promise for each to fetch its content
    const documentPromises = files
      .filter((file) => file.name.endsWith(".json"))
      .map(async (file) => {
        const { data: fileData } = await octokit.rest.repos.getContent({
          owner,
          repo,
          path: file.path,
        });

        // Decode the content from base64 and parse the JSON
        const content = Buffer.from(fileData.content, "base64").toString("utf-8");
        return JSON.parse(content);
      });

    // Resolve all promises to get the content of each JSON file
    return await Promise.all(documentPromises);
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
}
