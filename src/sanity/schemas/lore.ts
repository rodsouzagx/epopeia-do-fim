import { defineField, defineType } from "sanity";

export const lore = defineType({
  name: "lore",
  title: "Universo & Lore",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome do Personagem / Local / Deus",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "Personagens", value: "personagens" },
          { title: "Deuses & Divindades", value: "deuses" },
          { title: "Locais & Facções", value: "locais" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Título / Epíteto (ex: 'O Portador da Centelha')",
      type: "string",
    }),
    defineField({
      name: "affinity",
      title: "Afinidade / Domínio",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Retrato / Arte do Local",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "quote",
      title: "Citação Marcante",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Descrição Breve",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "details",
      title: "Registros e Arquivos Históricos",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
