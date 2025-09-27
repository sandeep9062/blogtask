"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Blog } from "./types";

interface BlogCardProps {
  blog: Blog;
  handleDelete: (id: string) => void;
  isDeleting: boolean;
  view: "mobile" | "desktop";
}

export default function BlogCard({ blog, handleDelete, isDeleting, view }: BlogCardProps) {
  const router = useRouter();
  const [formattedDate, setFormattedDate] = React.useState("");

  React.useEffect(() => {
    setFormattedDate(new Date(blog.date).toLocaleDateString());
  }, [blog.date]);

  if (view === "mobile") {
    return (
      <div className="rounded-lg p-4 shadow-md" style={{ border: "1px solid var(--primary)" }}>
        <div className="flex items-center gap-4 mb-4">
          {blog.image ? (
            <Image src={blog.image} alt={blog.title} width={80} height={60} className="object-cover rounded-md" />
          ) : (
            <div className="w-20 h-16 flex items-center justify-center rounded-md" style={{ backgroundColor: "var(--foreground)" }}>
              <span className="text-xs" style={{ color: "var(--background)" }}>No Image</span>
            </div>
          )}
          <h3 className="font-bold text-lg">{blog.title}</h3>
        </div>
        <div className="space-y-2">
          <p><span className="font-semibold">Category:</span> {blog.category}</p>
          <p><span className="font-semibold">Author:</span> {blog.author}</p>
          <p><span className="font-semibold">Date:</span> {formattedDate}</p>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => router.push(`/blog/${blog.slug}`)}
            className="px-4 py-2 text-sm rounded-md"
            style={{ backgroundColor: "var(--primary)", color: "var(--background)" }}
          >
            View
          </button>
          <button
            onClick={() => router.push(`/blog/edit/${blog._id}`)}
            className="px-4 py-2 text-sm rounded-md"
            style={{ backgroundColor: "var(--primary)", color: "var(--background)" }}
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(blog._id)}
            disabled={isDeleting}
            className="px-4 py-2 text-sm rounded-md bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  return (
    <tr style={{ borderBottom: "1px solid var(--primary)" }}>
      <td className="p-3">
        {blog.image ? (
          <Image src={blog.image} alt="cover" width={80} height={60} className="object-cover rounded-md" />
        ) : (
          <div className="w-20 h-16 flex items-center justify-center rounded-md" style={{ backgroundColor: "var(--foreground)" }}>
            <span className="text-xs" style={{ color: "var(--background)" }}>No Image</span>
          </div>
        )}
      </td>
      <td className="p-3">{blog.title}</td>
      <td className="p-3">{blog.category}</td>
      <td className="p-3">{blog.author}</td>
      <td className="p-3">{formattedDate}</td>
      <td className="p-3">
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/blog/${blog.slug}`)}
            className="px-4 py-2 text-sm rounded-md"
            style={{ backgroundColor: "var(--primary)", color: "var(--background)" }}
          >
            View
          </button>
          <button
            onClick={() => router.push(`/blog/edit/${blog._id}`)}
            className="px-4 py-2 text-sm rounded-md"
            style={{ backgroundColor: "var(--primary)", color: "var(--background)" }}
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(blog._id)}
            disabled={isDeleting}
            className="px-4 py-2 text-sm rounded-md bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
