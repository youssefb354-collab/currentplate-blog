import { getTranslations, getLocale } from 'next-intl/server'; // <-- Fixed Imports!
import AdSlot from '@/components/AdSlot';
import { getAllRecipes } from '@/lib/recipes';
import Link from 'next/link';
import Image from 'next/image';

export default async function RecipeIndex({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // <-- Fixed: Using the proper Server-Side translation tools
  const t = await getTranslations('nav');
  const locale = await getLocale();

  // 1. Unwrap the searchParams to see if the user is searching for something
  const resolvedSearchParams = await searchParams;
  const rawQuery = typeof resolvedSearchParams?.query === 'string' ? resolvedSearchParams.query : '';
  const query = rawQuery.toLowerCase();

  // 2. Fetch all recipes and filter them if there is a search term
  const allRecipes = getAllRecipes();
  const filteredRecipes = query
    ? allRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.tags?.some(tag => tag.toLowerCase().includes(query)) ||
        recipe.category.toLowerCase().includes(query)
      )
    : allRecipes;

  const filters = ['Vegan', 'Vegetarian', 'Gluten Free', '30 Min', 'Trending'];

  return (
    <main className="flex-1">
      {/* Search Section with Frosted Glass */}
      <section className="relative py-12">
        <div className="absolute inset-0 glass z-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-instrument-serif text-5xl text-graphite mb-6">
            {query ? `Results for "${rawQuery}"` : "Recipe Library"}
          </h1>
          
          <form method="GET" action={`/${locale}/recipes`} className="relative max-w-xl mx-auto">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-graphite/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            <input
              type="search"
              name="query"
              defaultValue={rawQuery}
              placeholder={t('search')}
              className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-primary/20 rounded-lg focus:outline-none focus:border-primary text-graphite smooth-transition"
            />
          </form>
        </div>
      </section>

      {/* Filter Tags */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {filters.map((filter) => (
            <Link
              href={`/${locale}/recipes?query=${filter.toLowerCase()}`}
              key={filter}
              className="px-4 py-2 text-sm font-medium rounded-full border border-primary/30 text-graphite hover:bg-primary hover:text-white smooth-transition"
            >
              {filter}
            </Link>
          ))}
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <Link href={`/${locale}/recipe/${recipe.slug}`} key={recipe.slug}>
                <article className="group h-full rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md smooth-transition flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden shrink-0">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      className="object-cover group-hover:scale-105 smooth-transition"
                    />
                  </div>
                  <div className="p-5 space-y-3 flex-1 flex flex-col">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary/60 text-graphite/80">
                        {recipe.time}
                      </span>
                      <span className="text-xs font-medium px-3 py-1 rounded-full border border-primary/20 text-graphite/80">
                        {recipe.category}
                      </span>
                    </div>
                    <h3 className="font-instrument-serif text-xl text-graphite">
                      {recipe.title}
                    </h3>
                    <p className="text-sm text-graphite/60 line-clamp-2">
                      {recipe.description}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/50 rounded-2xl border border-primary/10">
            <h2 className="font-instrument-serif text-3xl text-graphite mb-3">No recipes found</h2>
            <p className="text-graphite/70">
              We couldn't find anything matching "{rawQuery}". Try searching for something else!
            </p>
            <Link 
              href={`/${locale}/recipes`}
              className="inline-block mt-6 px-6 py-2.5 rounded-full bg-primary text-white font-medium hover:bg-primary/90 smooth-transition"
            >
              Clear Search
            </Link>
          </div>
        )}
      </section>

      {/* In-Feed Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdSlot slotId="infeed-library-slot-id" />
      </div>
    </main>
  );
}
