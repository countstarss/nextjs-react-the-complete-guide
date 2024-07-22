import { useRouter } from "next/router"

// 用于识别任意路由地址
const BlogPostPage = () => {

    const router = useRouter();
    console.log(router.query);

  return (
    <div>BlogPostPage</div>
  )
}

export default BlogPostPage