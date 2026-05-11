import { getAllRecipes } from '@/lib/recipes';
import Link from 'next/link';
import Image from 'next/image';

export default async function CategoryPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  // 1. Await the dynamic URL parameters (Next.js 16 requirement)
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;

  // 2. Format the URL slug for the Page Title (e.g., "pasta" -> "Pasta")
  const displayTitle = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // 3. Fetch ALL recipes from your database
  const allRecipes = getAllRecipes();

  // 4. FILTER: Keep only recipes where the category OR tag matches the URL slug
  const filteredRecipes = allRecipes.filter(recipe => {
    const matchCategory = recipe.category?.toLowerCase() === slug.replace('-', ' ').toLowerCase();
    const matchTag = recipe.tags?.some(tag => tag.toLowerCase() === slug.replace('-', ' ').toLowerCase());
    return matchCategory || matchTag;
  });

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      
      {/* Category Header */}
      <div className="text-center mb-16">
        <span className="text-sm font-bold tracking-widest uppercase text-primary mb-2 block">
          Category
        </span>
        <h1 className="font-instrument-serif text-5xl md:text-6xl text-graphite">
          {displayTitle}
        </h1>
        <p className="text-graphite/60 mt-4 text-lg">
          {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} found
        </p>
      </div>

      {/* Conditional Rendering: If no recipes found, show a message */}
      {filteredRecipes.length === 0 ? (
        <div className="text-center py-20 bg-white/50 rounded-2xl border border-primary/10">
          <p className="text-xl text-graphite/60">We're still cooking up recipes for this category.</p>
          <Link href={`/${locale}/recipes`} className="inline-block mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 smooth-transition">
            Back to All Recipes
          </Link>
        </div>
      ) : (
        /* The Recipe Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <Link href={`/${locale}/recipe/${recipe.slug}`} key={recipe.slug}>
              <article className="group h-full rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 smooth-transition flex flex-col border border-transparent hover:border-primary/10">
                <div className="relative aspect-[4/3] overflow-hidden shrink-0">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover group-hover:scale-105 smooth-transition duration-500"
                  />
                </div>
                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-secondary/80 text-graphite">
                      {recipe.time}
                    </span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full border border-primary/20 text-graphite">
                      {recipe.category}
                    </span>
                  </div>
                  <h3 className="font-instrument-serif text-2xl text-graphite leading-tight">
                    {recipe.title}
                  </h3>
                  <p className="text-sm text-graphite/70 line-clamp-2 leading-relaxed">
                    {recipe.description}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}