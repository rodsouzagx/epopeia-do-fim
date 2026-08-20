import { defineField, defineType } from "sanity";

export const chapter = defineType({
  name: "chapter",
  title: "Capítulos",
  type: "document",
  fields: [
    defineField({
      name: "volume",
      title: "Volume Pertencente",
      type: "reference",
      to: [{ type: "volume" }],
      validation: (Rule) => Rule.required(),
      description: "Selecione o volume ao qual este capítulo pertence.",
    }),
    defineField({
      name: "chapterNumber",
      title: "Número do Capítulo",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "title",
      title: "Título do Capítulo",
      type: "string",
      placeholder: "ex: Prólogo: O Fim dos Tempos",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
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
      name: "chapterImage",
      title: "Ilustração do Capítulo (Opcional)",
      type: "image",
      options: { hotspot: true },
      description: "Se deixado em branco, o leitor usará a capa do volume correspondente.",
    }),
    defineField({
      name: "body",
      title: "Conteúdo do Capítulo",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Título 1", value: "h1" },
            { title: "Título 2", value: "h2" },
            { title: "Citação", value: "blockquote" },
          ],
        },
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
  preview: {
    select: {
      title: "title",
      chapterNumber: "chapterNumber",
      volumeTitle: "volume.title",
      volumeNumber: "volume.volumeNumber",
      media: "chapterImage",
    },
    prepare({ title, chapterNumber, volumeTitle, volumeNumber, media }) {
      return {
        title: `Cap. ${chapterNumber}: ${title}`,
        subtitle: volumeNumber ? `Vol. ${volumeNumber} - ${volumeTitle}` : "Sem Volume",
        media,
      };
    },
  },
});
