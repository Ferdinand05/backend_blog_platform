export namespace IUser {
  export interface Attributes {
    id: number;
    username: string;
    email: string;
    password: string;
    role: "admin" | "author";
    bio: string | null;
    avatar: string | null;
    lastLogin: Date | null;
    resetPasswordToken: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }

  export interface AttributeCreate {
    username: string;
    email: string;
    password: string;
    role: "admin" | "author";
  }

  // Untuk login request
  export interface LoginRequest {
    email: string;
    password: string;
  }

  // Untuk register request
  export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
  }
}
