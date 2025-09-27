import About from "./components/About";
import BlogListPage from "./components/BlogListPage";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

async function getBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/blogs`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const data = await res.json();
  return data.blogs;
}

export default async function Home() {
  const blogs = await getBlogs();

  return (
    <>
      <Navbar />
      <Hero />
      <BlogListPage blogs={blogs} />
      <Blogs />
      <About />
      <Footer />
    </>
  );
}
