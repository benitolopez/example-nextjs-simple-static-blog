import Posts from "@/app/components/posts";
import { getPosts } from "@/app/lib/posts";

export default async function Page() {
  const posts = await getPosts();

  return <Posts posts={posts} />;
}
