import { IRole } from "./role";

export namespace IUser {
  export interface UserPayload {
    id: number;
    email: string;
    username: string;
    role: string;
  }

  export interface Attributes {
    id: number;
    username: string;
    email: string;
    password: string;
    role_id: number;
    bio: string | null;
    avatar: string | null;
    lastLogin: Date | null;
    resetPasswordToken: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    role?: IRole.Role;
  }

  export interface AttributeCreate {
    username: string;
    email: string;
    password: string;
    role_id: number;
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
