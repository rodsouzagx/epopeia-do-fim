import Image from "next/image";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { urlFor } from "../sanity/client";

const components: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-8 flex flex-col items-center">
          <div className="relative w-full max-w-2xl h-80 rounded-xl overflow-hidden border border-amber-500/20 shadow-2xl">
            <Image
              src={urlFor(value).url()}
              alt={value.caption || "Ilustração do Capítulo"}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-xs text-slate-400 mt-2 italic font-mono">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-2xl md:text-3xl font-bold text-amber-200 mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl md:text-2xl font-semibold text-amber-300 mt-6 mb-3">{children}</h2>
    ),
    normal: ({ children }) => <p className="mb-6 leading-relaxed font-light">{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-amber-200">{children}</strong>,
    em: ({ children }) => <em className="italic text-slate-200">{children}</em>,
  },
};

export default function SanityPortableText({ value }: { value: any }) {
  if (!value) return null;
  return <PortableText value={value} components={components} />;
}
