export interface Comment {
  name: string;
  email: string;
  comment: string;
  createdAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  desc: string;
  content: string;
  image?: string;
  category: string;
  tags: string[];
  author: User;
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
