// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
// import { ChakraProvider } from "@chakra-ui/react";

// const rootElement = document.getElementById("root");
// ReactDOM.createRoot(rootElement!).render(
//   <React.StrictMode>
//     <ChakraProvider>
//       <App />
//     </ChakraProvider>
//   </React.StrictMode>
// );

// function createLabel(str: string) {
//   let result = str.replace(/([A-Z])/g, " $1");
//   result = result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
//   return result;
// }

import { z, ZodLiteral, ZodObject, ZodRawShape, ZodString } from "zod";

function field({
  type,
  label,
  defaultValue,
  isCollection = true,
  required = false,
  schema = z.string(),
}: {
  type: "hasMany" | "hasOne" | "string" | "text" | "url" | "markdown" | "html";
  label?: string;
  defaultValue?: string;
  required?: boolean;
  isCollection?: boolean;
  schema?: ZodString | ZodObject<ZodRawShape> | ZodLiteral<string> | ZodRawShape;
  component?: React.ElementType;
}) {
  return {
    type,
    defaultValue,
    required,
    schema,
    isCollection,
    label,
  };
}

type Entity = ReturnType<typeof field>;

type Model = {
  [key: string]: Entity;
};

export type Schema = {
  collections: Record<string, Model>;
  singletons: Record<string, Model>;
};

const htmlRegex = /<\/?[a-z0-9]+(?:\s+[a-z0-9-]+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)*\s*\/?>/gi;

function html() {
  const schema = z.string().regex(htmlRegex, {
    message: "Invalid HTML format",
  });
  return field({ type: "html", schema });
}

const markdownRegex =
  /^\s*#.*|^\s*(?:-|\*|\+|\d+\.)\s+|\n(?:```(?:[a-z]+)?\s+[\s\S]+?```|~~~\s+[\s\S]+?~~~)|`[^`]+`|\*\*[^*]+\*\*|_[^_]+_|!\[.*\]\(.*\)|\[(?:[^[\]]+)\]\((?:[^()\s]+)\)/gm;

function markdown() {
  const schema = z.string().regex(markdownRegex, {
    message: "Invalid markdown format",
  });
  return field({ type: "markdown", schema });
}

function hasOne(target: string) {
  return field({ type: "hasOne" as const, schema: z.literal(target) });
}

function hasMany(target: string) {
  return field({ type: "hasMany" as const, schema: z.literal(target) });
}

function schema({
  collections,
  singletons,
}: {
  collections: Record<string, ReturnType<typeof model>>;
  singletons: Record<string, ReturnType<typeof model>>;
}) {
  return { collections, singletons };
}

function model(
  target: Record<
    string,
    ReturnType<typeof string> | ReturnType<typeof url> | ReturnType<typeof hasOne> | ReturnType<typeof hasMany>
  >
) {
  return target;
}

function config({ schema }: { schema: ReturnType<typeof c.schema> }) {
  return { schema };
}

function string(params?: { label?: string; defaultValue?: string; required?: boolean }) {
  return field({ type: "string", ...params });
}

function url(params?: { label?: string; defaultValue?: string; required?: boolean }) {
  return field({ type: "url", schema: z.string().url(), ...params });
}

function text(params?: { label?: string; defaultValue?: string; required?: boolean }) {
  return field({ type: "text", schema: z.string(), ...params });
}

export const c = {
  schema,
  model,
  hasOne,
  hasMany,
  markdown,
  html,
  config,
  string,
  url,
  text,
};

export * from "./useCrestCMS";
export * from "./buildAdminUi";
