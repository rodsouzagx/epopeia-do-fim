import { groq } from "next-sanity";
import { client } from "./client";

// Buscar todos os volumes com seus capítulos vinculados
export async function getSanityVolumesWithChapters() {
  return await client.fetch(
    groq`*[_type == "volume"] | order(volumeNumber asc) {
      _id,
      volumeNumber,
      title,
      "slug": slug.current,
      coverImage,
      synopsis,
      status,
      releaseDate,
      "chapters": *[_type == "chapter" && references(^._id)] | order(chapterNumber asc) {
        _id,
        chapterNumber,
        title,
        "slug": slug.current,
        releaseDate,
        isNew
      }
    }`,
    {},
    { next: { revalidate: 60 } },
  );
}

// Buscar todos os capítulos soltos (com dados do volume expandidos)
export async function getSanityChapters() {
  return await client.fetch(
    groq`*[_type == "chapter"] | order(volume->volumeNumber asc, chapterNumber asc) {
      _id,
      title,
      "slug": slug.current,
      chapterNumber,
      releaseDate,
      isNew,
      chapterImage,
      body,
      "volume": volume->{
        _id,
        volumeNumber,
        title,
        "slug": slug.current,
        coverImage
      }
    }`,
    {},
    { next: { revalidate: 60 } },
  );
}

// Buscar um capítulo específico pelo slug (trazendo volume, anterior e próximo)
export async function getSanityChapterBySlug(slug: string) {
  const allChapters = await client.fetch(
    groq`*[_type == "chapter"] | order(volume->volumeNumber asc, chapterNumber asc) {
      _id,
      title,
      "slug": slug.current,
      chapterNumber,
      releaseDate,
      chapterImage,
      body,
      "volume": volume->{
        _id,
        volumeNumber,
        title,
        "slug": slug.current,
        coverImage
      }
    }`,
    {},
    { next: { revalidate: 60 } },
  );

  if (!allChapters || allChapters.length === 0) return null;

  const currentIndex = allChapters.findIndex((c: any) => c.slug === slug);
  if (currentIndex === -1) return null;

  const current = allChapters[currentIndex];

  return {
    chapter: {
      ...current,
      displayImage: current.chapterImage || current.volume?.coverImage || null,
      volumeNumber: current.volume?.volumeNumber || 1,
      volumeTitle: current.volume?.title || "Volume Principal",
    },
    previousChapter: currentIndex > 0 ? allChapters[currentIndex - 1] : null,
    nextChapter: currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null,
  };
}

// Buscar itens de Lore / Universo
export async function getSanityLore() {
  return await client.fetch(
    groq`*[_type == "lore"] | order(_createdAt asc) {
      _id,
      name,
      "slug": slug.current,
      category,
      title,
      affinity,
      quote,
      description,
      details,
      image
    }`,
    {},
    { next: { revalidate: 60 } },
  );
}

// Buscar item específico de Lore por Slug
export async function getSanityLoreBySlug(slug: string) {
  return await client.fetch(
    groq`*[_type == "lore" && slug.current == $slug][0] {
      _id,
      name,
      "slug": slug.current,
      category,
      title,
      affinity,
      quote,
      description,
      details,
      image
    }`,
    { slug },
    { next: { revalidate: 60 } },
  );
}

// Buscar notícias
export async function getSanityNews() {
  return await client.fetch(
    groq`*[_type == "news"] | order(date desc) {
      _id,
      title,
      "slug": slug.current,
      category,
      date,
      excerpt,
      content
    }`,
    {},
    { next: { revalidate: 60 } },
  );
}

// Buscar notícia específica por Slug
export async function getSanityNewsBySlug(slug: string) {
  return await client.fetch(
    groq`*[_type == "news" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      category,
      date,
      excerpt,
      content
    }`,
    { slug },
    { next: { revalidate: 60 } },
  );
}
