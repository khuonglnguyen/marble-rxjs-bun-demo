import { combineRoutes, r } from "@marblejs/http";
import { map, mergeMap } from "rxjs/operators";
import { PostCreateDto, PostUpdateDto } from "../interfaces/posts.interface";
import { createPost, deletePost, readPosts, updatePost } from "../services/post.service";


const createPost$ = r.pipe(
  r.matchPath("/"),
  r.matchType("POST"),
  r.useEffect((req$) =>
    req$.pipe(
      mergeMap((req) => createPost(req.body as PostCreateDto)),
      map((body) => ({ body }))
    )
  )
);

const readPosts$ = r.pipe(
  r.matchPath("/"),
  r.matchType("GET"),
  r.useEffect((req$) =>
    req$.pipe(
      mergeMap(readPosts),
      map((body) => ({ body }))
    )
  )
);
 
const updatePost$ = r.pipe(
  r.matchPath("/:id"),
  r.matchType("PUT"),
  r.useEffect((req$) =>
    req$.pipe(
      map((req) => req as typeof req & { params: { id: number } }),
      mergeMap((req) => updatePost(req.params.id, req.body as PostUpdateDto)),
      map((body) => ({ body }))
    )
  )
);
 
const deletePost$ = r.pipe(
  r.matchPath("/:id"),
  r.matchType("DELETE"),
  r.useEffect((req$) =>
    req$.pipe(
      map((req) => req as typeof req & { params: { id: number } }),
      map((req) => req.params.id),
      mergeMap(deletePost),
      map((id) => ({ body: { id } }))
    )
  )
);

export const postsApi$ = combineRoutes("/posts", [
  readPosts$,
  createPost$,
  updatePost$,
  deletePost$
]);