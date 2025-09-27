"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, User, Heart } from "lucide-react";

import { useGetBlogsQuery, useLikeBlogMutation } from "../../services/blogsApi";
import { Spin } from "antd"; // ✅ For loading

// ✅ Define types
interface Comment {
  name: string;
  email: string;
  comment: string;
  createdAt: string;
}

interface Blog {
  _id: string;
  title: string;
  slug: string;
  desc: string;
  content: string;
  image?: string;
  category: string;
  tags: string[];
  author: string;
  authorImage?: string;
  date: string;
  readTime: number;
  views: number;
  likes: number;
  isFeatured: boolean;
  seoMetaTitle?: string;
  seoMetaDescription?: string;
  status: "draft" | "published" | "archived";
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

const categories = [
  "All",
  "SaaS",
  "AI",
  "DevTools",
  "UI/UX",
  "Web Development",
  "Product",
  "SEO",
  "Marketing",
  "Cloud & DevOps",
  "Case Studies",
];

const POSTS_PER_PAGE = 9;

export default function Blogs() {
  const { data = [], isLoading, isError } = useGetBlogsQuery();
  const blogs = data as Blog[];
  const [likeBlog] = useLikeBlogMutation();
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const handleLike = (id: string) => {
    likeBlog(id);
    setLikedPosts((prev) =>
      prev.includes(id) ? prev.filter((postId) => postId !== id) : [...prev, id]
    );
  };

  // ✅ Filter blogs
  const filteredBlogs = useMemo(() => {
    return activeCategory === "All"
      ? blogs
      : blogs.filter((b) => b.category === activeCategory);
  }, [activeCategory, blogs]);

  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  return (
    <main
      id="blogs"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      {/* Categories Filter */}
      <div className="flex justify-center gap-2 md:gap-3 mt-10 flex-wrap px-4">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === cat
                ? "shadow-md"
                : "hover:opacity-80"
            }`}
            style={{
              backgroundColor:
                activeCategory === cat ? "var(--primary)" : "var(--background)",
              color:
                activeCategory === cat ? "var(--background)" : "var(--foreground)",
              border: `1px solid ${
                activeCategory === cat ? "var(--primary)" : "var(--foreground)"
              }`,
            }}
            aria-pressed={activeCategory === cat}
            aria-label={`Filter by ${cat}`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Blog Grid */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <Spin spinning={isLoading} size="large" tip="Loading blogs...">
          {isError && (
            <p className="text-center" style={{ color: "red" }}>
              Failed to load blogs.
            </p>
          )}

          {!isError && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {paginatedBlogs.map((blog, i) => (
                  <motion.div
                    key={blog._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="group rounded-xl min-h-[480px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
                    style={{
                      border: "1px solid var(--foreground)",
                      backgroundColor: "var(--background)",
                    }}
                  >
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="flex flex-col h-full"
                    >
                      <div className="h-64 w-full relative overflow-hidden">
                        {blog.image && (
                          <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            priority={i < 3} // only prioritize first 3
                            className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-500"
                          />
                        )}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleLike(blog._id);
                          }}
                          className="absolute top-2 right-2 bg-white rounded-full p-2"
                        >
                          <Heart
                            size={24}
                            className={
                              likedPosts.includes(blog._id)
                                ? "text-red-500"
                                : "text-gray-500"
                            }
                            fill={
                              likedPosts.includes(blog._id)
                                ? "red"
                                : "none"
                            }
                          />
                        </button>
                      </div>

                      <div className="flex flex-col justify-between flex-1 p-4">
                        <div>
                          <h3
                            className="text-lg font-semibold mb-1 transition-colors"
                            style={{ color: "var(--foreground)" }}
                          >
                            {blog.title}
                          </h3>
                          <p
                            className="text-sm mb-4 line-clamp-3"
                            style={{ color: "var(--foreground)" }}
                          >
                            {blog.desc}
                          </p>
                        </div>
                        <div
                          className="flex justify-between items-center text-xs mt-auto"
                          style={{ color: "var(--foreground)" }}
                        >
                          <span className="flex items-center gap-1">
                            <User size={14} /> {blog.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <CalendarDays size={14} />
                            {new Date(blog.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {filteredBlogs.length === 0 && (
                <p
                  className="text-center mt-10"
                  style={{ color: "var(--foreground)" }}
                >
                  No posts found for “{activeCategory}”
                </p>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-1 md:gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                    style={{
                      backgroundColor: "var(--background)",
                      color: "var(--foreground)",
                      border: "1px solid var(--foreground)",
                    }}
                  >
                    Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                        currentPage === i + 1 ? "" : "hover:opacity-80"
                      }`}
                      style={{
                        backgroundColor:
                          currentPage === i + 1
                            ? "var(--primary)"
                            : "var(--background)",
                        color:
                          currentPage === i + 1
                            ? "var(--background)"
                            : "var(--foreground)",
                        borderColor:
                          currentPage === i + 1
                            ? "var(--primary)"
                            : "var(--foreground)",
                      }}
                      aria-current={currentPage === i + 1 ? "page" : undefined}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                    style={{
                      backgroundColor: "var(--background)",
                      color: "var(--foreground)",
                      border: "1px solid var(--foreground)",
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </Spin>
      </section>
    </main>
  );
}
