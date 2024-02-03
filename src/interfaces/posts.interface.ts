export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}
 
export type PostCreateDto = Pick<Post, "title" | "content">;
export type PostUpdateDto = Pick<Post, "title" | "content">;