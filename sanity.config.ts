import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { chapter } from "./src/sanity/schemas/chapter"; // verifique o caminho correto do import
import { volume } from "./src/sanity/schemas/volume";
import { lore } from "./src/sanity/schemas/lore";
import { news } from "./src/sanity/schemas/news";

export default defineConfig({
  name: "default",
  title: "Epopeia do Fim - Studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [volume, chapter, lore, news],
  },
});
