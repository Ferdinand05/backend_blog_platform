export namespace IPost {
  export interface Post {
    id: number;
    title: string;
    slug: string;
    content: string;
    cover_image: string;
    status: "draft" | "published";
    author_id: number;
    category_id: number;
    views: number;
    createdAt?: string | Date;
    updatedAt?: string | Date;
  }

  export interface CreatePost {
    title: string;
    slug: string;
    content: string;
    cover_image: string;
    status?: "draft" | "published";
    author_id: number;
    category_id: number;
    views?: number;
  }

  export interface UpdatePost {
    title?: string;
    slug?: string;
    content?: string;
    cover_image?: string;
    status?: "draft" | "published";
    author_id?: number;
    category_id?: number;
    views?: number;
  }
}
