import { defineField, defineType } from "sanity";

export default defineType({
  name: "news",
  title: "Notícias & Avisos",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título da Notícia",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: ["Aviso", "Lançamento", "Lore", "Ilustração"],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Data de Lançamento",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Resumo Breve",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "content",
      title: "Conteúdo Completo",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
