/**
 * This module handles the retrieval and processing of blog posts.
 * It includes functions to fetch all posts.
 * The posts are sourced from a directory based on the blog slug constant.
 */
import { promises as fs } from "fs";
import path from "path";

export type Post = {
  slug: string;
  title: string;
  date: string;
  categories: string[];
};

/**
 * Fetches all posts from the blog directory, extracts their metadata,
 * and sorts them from newest to oldest based on the publish date.
 *
 * @returns {Promise<Post[]>} A promise that resolves to an array of posts.
 */
export async function getPosts(): Promise<Post[]> {
  const blogDirPath = path.join(process.cwd(), `app/blog/(posts)`);

  // Retrieve slugs from post routes by filtering directories
  const slugs = (await fs.readdir(blogDirPath, { withFileTypes: true })).filter(
    (dirent) =>
      dirent.isDirectory() &&
      !dirent.name.startsWith("[") &&
      dirent.name !== "page"
  );

  // Retrieve metadata from MDX files
  const posts = await Promise.all(
    slugs.map(async ({ name }) => {
      const { metadata } = await import(`./../blog/(posts)/${name}/page.mdx`);
      return { slug: name, ...metadata };
    })
  );

  // Sort posts from newest to oldest based on the publish date
  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return posts;
}

/**
 * Fetches all posts that belong to a specified category.
 * This function first retrieves all available posts and then filters them
 * to return only those that include the specified category in their categories list.
 *
 * @param {Object} params - The parameters for filtering posts.
 * @param {string} params.category - The category by which to filter posts.
 * @returns {Promise<Post[]>} A promise that resolves to an array of posts belonging to the specified category.
 */
export async function getPostsByCategory({
  category,
}: {
  category: string;
}): Promise<Post[]> {
  const allPosts = await getPosts();

  // Filter posts by specified category
  const posts = allPosts.filter((post) => post.categories?.includes(category));

  return posts;
}
