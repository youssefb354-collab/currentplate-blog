import { getRecipeBySlug } from "@/lib/recipes";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function SingleRecipePage({ params }: { params: Promise<{ slug: string }> }) {
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
                <ul className="list-disc pl-6 space-y-3 mb-8 marker:text-secondary text-lg text-graphite/90" {...props} />
              ),
              ol: ({node, ...props}) => (
                <ol className="list-decimal pl-6 space-y-4 mb-8 marker:text-primary marker:font-bold text-lg text-graphite/90" {...props} />
              ),
              li: ({node, ...props}) => (
                <li className="pl-2 leading-relaxed" {...props} />
              ),
              p: ({node, ...props}) => (
                <p className="mb-6 leading-relaxed text-lg text-graphite/90" {...props} />
              ),
              // Beautiful styling for Pro Tips (Blockquotes)
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-4 border-secondary bg-secondary/10 pl-6 py-4 pr-4 my-8 rounded-r-lg italic text-graphite/80 text-lg" {...props} />
              ),
              // Elegant styling for the Nutritional Info Table
              table: ({node, ...props}) => (
                <div className="overflow-x-auto my-10">
                  <table className="w-full text-left border-collapse" {...props} />
                </div>
              ),
              th: ({node, ...props}) => (
                <th className="border-b-2 border-primary/20 pb-4 pt-2 px-4 font-instrument-serif text-2xl text-graphite font-normal" {...props} />
              ),
              td: ({node, ...props}) => (
                <td className="border-b border-primary/10 py-4 px-4 text-graphite/80 text-lg" {...props} />
              ),
              strong: ({node, ...props}) => (
                <strong className="font-semibold text-graphite" {...props} />
              )
            }}
          >
            {recipe.content}
          </ReactMarkdown>
        </article>
      </div>

    </main>
  );
}