export namespace ICategory {
  export interface Attributes {
    id: number;
    name: string;
    slug: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

  export interface AttributeCreate {
    name: string;
    slug: string;
  }

  export interface UpdateCategory {
    name?: string;
    slug?: string;
  }

  // Back-compat aliases
  export interface Category extends Attributes {}
  export interface CreateCategory extends AttributeCreate {}
}
