import { getRecipeBySlug } from "@/lib/recipes";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";

// Updated for Next.js 15 Promise params
type Props = {
  params: Promise<{ slug: string }>;
};

// Next.js runs this function behind the scenes to build the SEO before the page loads
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 1. Await the params (Required for newer Next.js versions)
  const resolvedParams = await params;
  
  // 2. Fetch the data for this specific recipe
  const recipe = getRecipeBySlug(resolvedParams.slug);

  // Fallback just in case the recipe doesn't exist
  if (!recipe) {
    return { title: "Recipe Not Found" };
  }

  // 3. Automatically map your Markdown frontmatter to Google's SEO standards!
  return {
    title: `${recipe.title} | CurrentPlate`,
    description: recipe.description,
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      images: [
        {
          url: recipe.image, // This automatically pulls your Pollinations .jpg!
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
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      
      {/* Top Section: Flexbox Asymmetric Layout */}
      <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-center mb-16">
        
        {/* Left Side: Text */}
        <div className="flex-1 w-full flex flex-col space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 rounded-full bg-secondary text-graphite text-sm font-bold tracking-wide">
              {recipe.category}
            </span>
            <span className="text-graphite/60 font-medium tracking-wide">{recipe.time}</span>
          </div>
          <h1 className="font-instrument-serif text-5xl md:text-6xl lg:text-7xl text-graphite leading-[1.1]">
            {recipe.title}
          </h1>
          <p className="text-lg md:text-xl text-graphite/80 leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* Right Side: Vertical Image Constrained */}
        <div className="flex-1 w-full max-w-md mx-auto md:max-w-none">
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
      <div className="max-w-3xl mx-auto bg-white/60 p-8 md:p-12 rounded-3xl shadow-sm border border-primary/10">
        <article className="text-graphite">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({node, ...props}) => (
                <h2 className="font-instrument-serif text-4xl mt-14 mb-6 text-graphite border-b border-primary/20 pb-4" {...props} />
              ),
              ul: ({node, ...props}) => (
                <ul className="list-disc pl-6 space-y-3 mb-8 marker:text-secondary text-lg text-graphite/90" {...props
