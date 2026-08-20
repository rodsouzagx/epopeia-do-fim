import { defineField, defineType } from "sanity";

export default defineType({
  name: "chapter",
  title: "Capítulos",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título do Capítulo",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL amigável)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "volumeNumber",
      title: "Número do Volume",
      type: "number",
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: "volumeTitle",
      title: "Título do Volume",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "chapterNumber",
      title: "Número do Capítulo",
      type: "number",
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: "coverImage",
      title: "Capa / Ilustração de Destaque",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "releaseDate",
      title: "Data de Publicação",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isNew",
      title: "Marcar como Novo?",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "body",
      title: "Conteúdo do Capítulo",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Legenda da Ilustração",
            },
          ],
        },
      ],
    }),
  ],
});
