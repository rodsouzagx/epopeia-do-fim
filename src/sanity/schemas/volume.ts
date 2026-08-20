import { defineField, defineType } from "sanity";

export const volume = defineType({
  name: "volume",
  title: "Volumes",
  type: "document",
  fields: [
    defineField({
      name: "volumeNumber",
      title: "Número do Volume",
      type: "number",
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: "title",
      title: "Título do Volume",
      type: "string",
      placeholder: "ex: O Crepúsculo dos Deuses",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (doc) => `volume-${doc.volumeNumber}-${doc.title}`,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Capa Oficial do Volume",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "synopsis",
      title: "Sinopse do Volume",
      type: "text",
      rows: 4,
      placeholder: "Breve resumo sobre os acontecimentos deste volume...",
    }),
    defineField({
      name: "status",
      title: "Status do Volume",
      type: "string",
      options: {
        list: [
          { title: "Em Lançamento", value: "ongoing" },
          { title: "Concluído", value: "completed" },
          { title: "Em Breve", value: "upcoming" },
        ],
        layout: "radio",
      },
      initialValue: "ongoing",
    }),
    defineField({
      name: "releaseDate",
      title: "Data de Início/Lançamento",
      type: "date",
    }),
  ],
  preview: {
    select: {
      volumeNumber: "volumeNumber",
      title: "title",
      media: "coverImage",
    },
    prepare({ volumeNumber, title, media }) {
      return {
        title: `Volume ${volumeNumber}: ${title}`,
        media,
      };
    },
  },
});
