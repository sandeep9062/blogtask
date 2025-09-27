"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDeleteBlogMutation, useGetBlogsByUserQuery } from "@/services/blogsApi";
import { Spin, message } from "antd";
import BlogCard from "./BlogCard";
import { Blog } from "./types";

export default function BlogListPage() {
  const router = useRouter();
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();
  const { data: userBlogs, isLoading: areBlogsLoading, isError } = useGetBlogsByUserQuery();

  const handleDelete = async (id: string) => {
    try {
      await deleteBlog(id).unwrap();
      message.success("Blog post deleted successfully!");
    } catch (error) {
      console.error("Failed to delete blog:", error);
      message.error("Failed to delete blog post.");
    }
  };

  if (areBlogsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading your blogs..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-12">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p>Please log in to manage your blog posts.</p>
        <button
          onClick={() => router.push("/auth")}
          className="mt-6 px-6 py-3 rounded-lg font-semibold transition"
          style={{ backgroundColor: "var(--primary)", color: "var(--background)" }}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      <div className="max-w-7xl mx-auto p-4 md:p-6 rounded-lg shadow-lg" style={{ backgroundColor: "var(--background)" }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold">My Blog Posts</h2>
          <button
            onClick={() => router.push("/blog/new")}
            className="px-6 py-3 rounded-lg font-semibold transition"
            style={{ backgroundColor: "var(--primary)", color: "var(--background)" }}
          >
            New Blog
          </button>
        </div>

        <Spin spinning={isDeleting} size="large" tip="Loading...">
          <div className="overflow-x-auto">
            {userBlogs && userBlogs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-6 md:hidden">
                  {/* Mobile Card View */}
                  {userBlogs.map((blog: Blog) => (
                    <BlogCard
                      key={blog._id}
                      blog={blog}
                      handleDelete={handleDelete}
                      isDeleting={isDeleting}
                      view="mobile"
                    />
                  ))}
                </div>
                <table className="hidden md:table w-full border-collapse">
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--primary)" }}>
                      <th className="p-3 text-left">Image</th>
                      <th className="p-3 text-left">Title</th>
                      <th className="p-3 text-left">Category</th>
                      <th className="p-3 text-left">Author</th>
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userBlogs.map((blog: Blog) => (
                      <BlogCard
                        key={blog._id}
                        blog={blog}
                        handleDelete={handleDelete}
                        isDeleting={isDeleting}
                        view="desktop"
                      />
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <p className="text-center py-8">You have not created any blog posts yet.</p>
            )}
          </div>
        </Spin>
      </div>
    </div>
  );
}
