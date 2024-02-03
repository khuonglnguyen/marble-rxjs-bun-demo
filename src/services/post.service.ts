import { HttpError, HttpStatus } from "@marblejs/http";
import { of } from "rxjs";
import { Post, PostCreateDto, PostUpdateDto } from "../interfaces/posts.interface";


const posts: Post[] = [];
let lastID = 0;

const createID = () => {
    lastID++;
    return lastID;
}

export const createPost = (input: PostCreateDto) => {
    const post: Post = {
        id: createID(),
        title: input.title,
        content: input.content,
        createdAt: new Date(),
    };

    posts.push(post);
    return of(post);
}

export const readPosts = () => {
    return of(posts);
}

export const updatePost = (postID: number, input: PostUpdateDto) => {
    const index = posts.findIndex((p) => p.id == postID);
    if (index >= 0) {
        posts[index].title = input.title;
        posts[index].content = input.content;
        return of(posts[index]);
    }

    throw new HttpError(`Post ${postID} not found`, HttpStatus.NOT_FOUND);
}

export const deletePost = (postID: number) => {
    const index = posts.findIndex((p) => p.id == postID);
    if (index >= 0) {
        const id = posts[index].id;
        posts.splice(index, 1);
        return of(id);
    }

    throw new HttpError(`Post ${postID} not found`, HttpStatus.NOT_FOUND);
}