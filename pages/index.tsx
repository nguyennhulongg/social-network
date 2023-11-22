import FormCommon from "@/components/FormPostComponent";
import PostsFeed from "@/components/PostsComponent/PostsFeed";

export default function Home() {
  return (
    <div>
      <FormCommon placeholder="Post" />
      <PostsFeed />
    </div>
  );
}
