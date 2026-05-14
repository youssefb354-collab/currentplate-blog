import { getRecipeBySlug } from "@/lib/recipes";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import PrintRecipeButton from "@/components/PrintRecipeButton";

// Updated for Next.js 15 Promise params
type Props = {
  params: Promise<{ slug: string }>;
};

// Next.js runs this function behind the scenes to build the SEO before the page loads
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const recipe = getRecipeBySlug(resolvedParams.slug);

  if (!recipe) {
    return { title: "Recipe Not Found" };
  }

  return {
    title: `${recipe.title} | CurrentPlate`,
    description: recipe.description,
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      images: [
        {
          url: recipe.image,
        },
      ],
      type: "article",
    },
  };
}

export default async function SingleRecipePage({ params }: Props) {
  const resolvedParams = await params;
  const recipe = getRecipeBySlug(resolvedParams.slug);

  if (!recipe) {
    notFound();
  }

  return (
    // Added print:py-4 print:px-0 to kill empty margins on paper
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 print:py-4 print:px-0 print:max-w-none">
      
      {/* Top Section: Flexbox Asymmetric Layout */}
      {/* Added print:mb-6 print:block to stack elements tightly */}
      <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-center mb-16 print:mb-6 print:block">
        
        {/* Left Side: Text */}
        <div className="flex-1 w-full flex flex-col space-y-6 print:space-y-2">
          <div className="flex items-center gap-3 print:gap-2">
            {/* Stripped background colors for printing to save ink */}
            <span className="px-4 py-1.5 print:px-0 print:py-0 rounded-full bg-secondary print:bg-transparent text-graphite text-sm print:text-xs font-bold tracking-wide">
              {recipe.category}
            </span>
            <span className="text-graphite/60 font-medium tracking-wide print:text-xs">{recipe.time}</span>
          </div>
          {/* Shrunk the massive title for paper */}
          <h1 className="font-instrument-serif text-5xl md:text-6xl lg:text-7xl print:text-4xl text-graphite leading-[1.1]">
            {recipe.title}
          </h1>
          <p className="text-lg md:text-xl print:text-sm text-graphite/80 leading-relaxed print:leading-snug">
            {recipe.description}
          </p>
        </div>

        {/* Right Side: Vertical Image Constrained */}
        {/* ADDED print:hidden - This saves massive amounts of ink and paper! */}
        <div className="flex-1 w-full max-w-md mx-auto md:max-w-none print:hidden">
          <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-[10px] border-white">
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Bottom Section: The Content */}
      {/* Removed shadow, border, and massive padding for print */}
      <div className="max-w-3xl mx-auto bg-white/60 p-8 md:p-12 print:p-0 rounded-3xl print:rounded-none shadow-sm print:shadow-none border border-primary/10 print:border-none">
        <article className="text-graphite print:text-black">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Reduced all font sizes, margins, and added page-break controls
              h2: ({node, ...props}) => (
                <h2 className="font-instrument-serif text-4xl print:text-2xl mt-14 print:mt-6 mb-6 print:mb-2 text-graphite border-b border-primary/20 print:border-gray-300 pb-4 print:pb-1 print:break-after-avoid" {...props} />
              ),
              ul: ({node, ...props}) => (
                <ul className="list-disc pl-6 space-y-3 print:space-y-1 mb-8 print:mb-4 marker:text-secondary print:marker:text-black text-lg print:text-sm text-graphite/90" {...props} />
              ),
              ol: ({node, ...props}) => (
                <ol className="list-decimal pl-6 space-y-4 print:space-y-1 mb-8 print:mb-4 marker:text-primary print:marker:text-black marker:font-bold text-lg print:text-sm text-graphite/90" {...props} />
              ),
              li: ({node, ...props}) => (
                <li className="pl-2 leading-relaxed print:leading-normal" {...props} />
              ),
              p: ({node, ...props}) => (
                <p className="mb-6 print:mb-2 leading-relaxed print:leading-normal text-lg print:text-sm text-graphite/90" {...props} />
              ),
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-4 border-secondary print:border-gray-400 bg-secondary/10 print:bg-transparent pl-6 print:pl-3 py-4 print:py-1 pr-4 my-8 print:my-4 rounded-r-lg italic text-graphite/80 text-lg print:text-sm print:break-inside-avoid" {...props} />
              ),
              table: ({node, ...props}) => (
                <div className="overflow-x-auto my-10 print:my-4 print:break-inside-avoid">
                  <table className="w-full text-left border-collapse" {...props} />
                </div>
              ),
              th: ({node, ...props}) => (
                <th className="border-b-2 border-primary/20 print:border-gray-400 pb-4 print:pb-1 pt-2 px-4 print:px-2 font-instrument-serif text-2xl print:text-lg text-graphite font-normal" {...props} />
              ),
              td: ({node, ...props}) => (
                <td className="border-b border-primary/10 print:border-gray-200 py-4 print:py-1 px-4 print:px-2 text-graphite/80 text-lg print:text-sm" {...props} />
              ),
              strong: ({node, ...props}) => (
                <strong className="font-semibold text-graphite print:text-black" {...props} />
              )
            }}
          >
            {recipe.content}
          </ReactMarkdown>

          {/* The Print Button */}
          <PrintRecipeButton />

        </article>
      </div>

    </main>
  );
}