import Posts from "@/app/components/posts";
import { getPostsByCategory } from "@/app/lib/posts";
import { CATEGORIES } from "@/app/lib/constants";
import { notFound } from "next/navigation";
import { Category, getCategoryById } from "@/app/lib/categories";

export default async function Page({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;

  // Find the category by ID
  const categoryData = getCategoryById(category);

  if (categoryData === undefined) {
    // If the category does not exist, return a 404
    return notFound();
  }

  const posts = await getPostsByCategory({ category });

  return <Posts posts={posts} />;
}

export function generateStaticParams() {
  return CATEGORIES.map((category: Category) => ({
    category: category.id,
  }));
}
