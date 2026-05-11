import { useTranslations, useLocale } from "next-intl";
import NewsletterForm from "@/components/NewsletterForm";
import { getAllRecipes } from "@/lib/recipes";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <main className="flex-1">
      {/* Hero Section - Asymmetric Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="hero-asymmetric">
          <div className="flex flex-col justify-center space-y-6">
            <span className="inline-block text-sm font-medium tracking-wide uppercase text-primary">
              {t("trending")}
            </span>
            <h1 className="font-instrument-serif text-5xl md:text-7xl leading-tight text-graphite">
              The Perfect
              <br />
              <span className="text-primary">Plate</span>
            </h1>
            <p className="text-lg text-graphite/70 max-w-md">
              Discover curated recipes and culinary trends with a Scandi-elegant touch.
            </p>
            <a
              href="#recipes"
              className="inline-flex items-center px-6 py-3 bg-primary text-base rounded-lg text-white hover:bg-primary/90 smooth-transition w-fit"
            >
              {t("viewRecipe")}
            </a>
          </div>
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src="/images/hero-image.jpg"
              alt="Featured recipe"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Bento Grid - Recipe Cards */}
      <section id="recipes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-instrument-serif text-4xl mb-8 text-graphite">
          {t("classics")}
        </h2>
        <div className="bento-grid">
          {getAllRecipes().map((recipe) => (
            <Link href={`/${locale}/recipe/${recipe.slug}`} key={recipe.slug}>
              <article className="group rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md smooth-transition">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover group-hover:scale-105 smooth-transition"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-secondary text-graphite/80">
                    {recipe.time}
                  </span>
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
      </section>

      {/* Meet the Chef Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center text-center">
        <div className="relative w-48 h-48 md:w-56 md:h-56 mb-8">
          <Image
            src="/images/chef.jpg"
            alt="Portrait of the Chef"
            fill
            className="rounded-full object-cover shadow-md border-4 md:border-8 border-base"
          />
        </div>
        <h2 className="font-instrument-serif text-3xl md:text-4xl text-graphite mb-4">
          Meet Chef Sofia Moretti
        </h2>
        <p className="text-graphite/80 text-base md:text-lg leading-relaxed">
          Welcome to CurrentPlate. I believe that elegant cooking shouldn't be complicated.
          Here, we explore curated recipes, modern culinary trends, and the beauty of a perfectly balanced plate.
        </p>
      </section>

      {/* Newsletter Subscription Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 mt-8">
        <div className="bg-secondary/10 rounded-3xl p-8 md:p-16 text-center border border-primary/10 shadow-sm">
          <h2 className="font-instrument-serif text-4xl md:text-5xl text-graphite mb-4">
            Join the Table
          </h2>
          <p className="text-graphite/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Get curated recipes, modern culinary trends, and Scandi-elegant inspiration delivered directly to your inbox every Sunday.
          </p>
          
          {/* 👇 Here is the updated working component! 👇 */}
          <NewsletterForm />
          
          <p className="text-xs text-graphite/40 mt-4">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </section>

    </main>
  );
}