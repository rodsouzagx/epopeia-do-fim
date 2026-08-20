import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

// Mapeamento direto de cada tipo do Sanity para as rotas que precisam atualizar
const REVALIDATION_MAP: Record<string, (slug?: string) => string[]> = {
  chapter: (slug) => ["/", "/capitulos", ...(slug ? [`/capitulos/${slug}`] : [])],
  volume: () => ["/", "/capitulos"],
  lore: (slug) => ["/universo", ...(slug ? [`/universo/${slug}`] : [])],
  news: (slug) => ["/", "/noticias", ...(slug ? [`/noticias/${slug}`] : [])],
};

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get("secret");

    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Token inválido" }, { status: 401 });
    }

    const body = await req.json();
    const type = body?._type as string;

    // Tratamento seguro para qualquer formato de payload do Sanity
    const rawSlug = body?.slug;
    const slug = typeof rawSlug === "string" ? rawSlug : rawSlug?.current;

    const getPaths = REVALIDATION_MAP[type];
    const pathsToRevalidate = getPaths ? getPaths(slug) : ["/"];

    // Executa a revalidação de todas as rotas mapeadas
    pathsToRevalidate.forEach((path) => revalidatePath(path));

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      paths: pathsToRevalidate,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Erro ao processar revalidação", error: err.message },
      { status: 500 },
    );
  }
}
