import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// This is the "Vercel-proof" way to find your folder
const recipesDirectory = path.join(process.cwd(), 'content/recipes');

export interface RecipeData {
  slug: string;
  title: string;
  description: string;
  time: string;
  image: string;
  category: string;
  tags: string[];
  content: string;
}

export function getAllRecipes(): RecipeData[] {
  // Let's force Vercel to print exactly where it is looking in the logs
  console.log("🔍 ATTENTION: LOOKING FOR RECIPES IN THIS EXACT PATH ->", recipesDirectory);

  // We removed the safety net. If it can't find the folder, it will crash and tell us why.
  // Get all markdown files
  const fileNames = fs.readdirSync(recipesDirectory).filter(file => file.endsWith('.md'));
  
  const allRecipes = fileNames.map((fileName) => {
    // Remove ".md" to get the slug
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(recipesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the metadata section
    const matterResult = matter(fileContents);

    return {
      slug: id,
      content: matterResult.content,
      ...(matterResult.data as Omit<RecipeData, 'slug' | 'content'>),
    };
  });

  return allRecipes;
}

export function getRecipeBySlug(slug: string): RecipeData | null {
  try {
    const fullPath = path.join(recipesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      content: matterResult.content,
      ...(matterResult.data as Omit<RecipeData, 'slug' | 'content'>),
    };
  } catch (error) {
    return null; // Return null if the recipe file doesn't exist
  }
}