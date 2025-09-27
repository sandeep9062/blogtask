"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  CalendarDays,
  Eye,
  ThumbsUp,
  Clock,
  ArrowLeft,
  User,
  Heart,
} from "lucide-react";
import {
  useGetBlogBySlugQuery,
  useLikeBlogMutation,
  useUnlikeBlogMutation,
} from "../../../services/blogsApi";
import { Spin } from "antd";
import { useState, useEffect } from "react";

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, duration: 0.4 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const {
    data: blog,
    isLoading,
    isError,
  } = useGetBlogBySlugQuery(slug, { skip: !slug });

  const [likeBlog] = useLikeBlogMutation();
  const [unlikeBlog] = useUnlikeBlogMutation();
  const [isLiked, setIsLiked] = useState(false);

  // Ensure this runs only in client
  useEffect(() => {
    if (blog && typeof window !== "undefined") {
      const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "[]");
      if (likedBlogs.includes(blog._id)) {
        setIsLiked(true);
      }
    }
  }, [blog]);

  const handleLike = async () => {
    if (!blog) return;
    try {
      if (isLiked) {
        await unlikeBlog(blog._id).unwrap();
        setIsLiked(false);
        const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "[]");
        localStorage.setItem(
          "likedBlogs",
          JSON.stringify(likedBlogs.filter((id: string) => id !== blog._id))
        );
      } else {
        await likeBlog(blog._id).unwrap();
        setIsLiked(true);
        const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs") || "[]");
        localStorage.setItem("likedBlogs", JSON.stringify([...likedBlogs, blog._id]));
      }
    } catch (error) {
      console.error("Like/unlike error: ", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-500 dark:text-gray-400">
        <Spin size="large" tip="Loading blog..." />
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6">
        <p className="text-xl text-red-500 dark:text-red-400 font-semibold">
          Error: Blog not found.
        </p>
      </div>
    );
  }

  const {
    title,
    author,
    authorImage,
    date,
    views,
    likes,
    readTime,
    desc,
    image,
    content,
    tags,
    comments,
    status,
  } = blog;

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen mt-10 bg-white dark:bg-[#0D1321] py-16 sm:py-24 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.div variants={itemVariants} className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Blog List</span>
          </Link>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-6"
        >
          {title}
        </motion.h1>

        {/* Meta */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 items-center text-sm text-gray-600 dark:text-gray-400 mb-8"
        >
          <span className="flex items-center gap-1 font-semibold text-gray-800 dark:text-white">
            {authorImage && (
              <Image
                src={authorImage}
                alt={author || "Author"}
                width={40}
                height={40}
                className="rounded-full mr-2 object-cover"
              />
            )}
            <User size={16} /> {author}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays size={16} />
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={16} /> {readTime || 5} min read
          </span>
          <span className="flex items-center gap-1">
            <Eye size={16} /> {views || 0} views
          </span>
          <span className="flex items-center gap-1">
            <ThumbsUp size={16} /> {likes || 0} likes
          </span>
          {status && (
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold uppercase ${
                status === "published"
                  ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
              }`}
            >
              {status}
            </span>
          )}
        </motion.div>

        {/* Image */}
        {image && (
          <motion.div
            variants={itemVariants}
            className="relative w-full h-[400px] md:h-[500px] mb-10 rounded-xl overflow-hidden shadow-lg"
          >
            <Image src={image} alt={title} fill className="object-cover" />
            <button
              aria-label={isLiked ? "Unlike blog" : "Like blog"}
              onClick={(e) => {
                e.preventDefault();
                handleLike();
              }}
              className="absolute top-2 right-2 bg-white rounded-full p-2"
            >
              <Heart
                size={24}
                className={isLiked ? "text-red-500" : "text-gray-500"}
                fill={isLiked ? "red" : "none"}
              />
            </button>
          </motion.div>
        )}

        {/* Description */}
        {desc && (
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-700 dark:text-gray-300 mb-8 italic border-l-4 border-yellow-500 pl-4"
          >
            {desc}
          </motion.p>
        )}

        {/* Content */}
        {content && (
          <motion.div
            variants={itemVariants}
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: content.replace(/\n/g, "<br />"),
            }}
          />
        )}

        {/* Tags */}
        {tags?.length > 0 && (
          <motion.div variants={itemVariants} className="mt-10">
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Comments */}
        {comments?.length > 0 && (
          <motion.div variants={containerVariants} className="mt-12">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Comments ({comments.length})
            </h3>
            <div className="space-y-4">
              {comments.map((c, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                >
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {c.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </p>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    {c.comment}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
