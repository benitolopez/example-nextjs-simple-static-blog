import { type Post } from "@/app/lib/posts";
import Link from "next/link";
import { parseISO, format } from "date-fns";
import { CATEGORIES } from "@/app/lib/constants";
import { Category, getCategoryURL } from "@/app/lib/categories";

export default function Posts({ posts }: { posts: Post[] }) {
  return (
    <>
      {posts.map(({ slug, title, date, categories }) => (
        <div key={slug}>
          <h2>
            <Link href={`/blog/${slug}`}>{title}</Link>
          </h2>
          <span>{format(parseISO(date), "MMMM d, yyyy")}</span>
          {categories && categories.length > 0 && (
            <div>
              <span>Categories:</span>
              {categories.map((catId: string) => {
                const category = CATEGORIES.find((c) => c.id === catId) as
                  | Category
                  | undefined;

                if (!category) {
                  return null;
                }

                return (
                  <a href={getCategoryURL(category.id)} key={category.id}>
                    {category.name}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
