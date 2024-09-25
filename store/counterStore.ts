import { createWithEqualityFn } from "zustand/traditional";

interface Posts {
  id: number;
  title: string;
  body: string;
}

interface PostId {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface CounterState {
  count: number;
  title: string;
  posts: Posts[];
  postId: PostId[];
  increment: (value: number) => void;
  getPosts: () => Promise<void>;
  getPostId: (id: string) => Promise<void>;
  clearStore: () => void;
  multiply: (value: number) => void;
}

export const useCounterStore = createWithEqualityFn<CounterState>(
  (set, get) => ({
    count: 10,
    title: "Hola Mundo!",
    posts: [],
    postId: [],
    increment: (value: number) =>
      set((state) => ({
        count: state.count + value,
      })),
    getPosts: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const posts = await res.json();
      set((state) => ({
        ...state,
        posts,
      }));
    },
    getPostId: async (id: string) => {
      set({ postId: [] });
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const postId = await res.json();
      set((state) => ({
        ...state,
        postId: [postId],
      }));
    },
    clearStore: () => {
      set((state) => ({
        ...state,
        count: 0,
        title: "",
        posts: [],
      }));
    },
    multiply: (value: number) => {
      const { count } = get();
      set({ count: count * value });
    },
  })
);
