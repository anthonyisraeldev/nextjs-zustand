"use client";

import Link from "next/link";
import { useCounterStore } from "../store/counterStore";
import { shallow } from "zustand/shallow";

export default function Home() {
  const { count, title, increment, getPosts, posts, clearStore, multiply } =
    useCounterStore(
      (state) => ({
        count: state.count,
        title: state.title,
        increment: state.increment,
        getPosts: state.getPosts,
        posts: state.posts,
        clearStore: state.clearStore,
        multiply: state.multiply,
      }),
      shallow
      // Optimiza el re-render sólo cuando cambian las propiedades seleccionadas
      // Aplicamos shallow para evitar renders innecesarios
    );

  return (
    <div className="container flex m-auto items-center flex-col text-center mt-40 font-[family-name:var(--font-geist-sans)]">
      <h1>{title}</h1>
      <p>Counter: {count}</p>
      <button
        className="bg-blue-500 p-1 mt-10 rounded-md mb-1"
        onClick={() => {
          increment(10);
        }}
      >
        Increment by 10
      </button>

      <button
        className="bg-green-700 p-1 mt-10 rounded-md mb-1"
        onClick={() => {
          multiply(2);
        }}
      >
        Multiply by 2
      </button>

      <button
        className="bg-blue-500 p-1 mt-4 rounded-md mb-8"
        onClick={() => {
          getPosts();
        }}
      >
        Get Posts
      </button>

      <button
        className="bg-orange-600 p-1 mt-4 rounded-md mb-8"
        onClick={() => {
          clearStore();
        }}
      >
        Clear All State
      </button>

      <h2 className="text-xl mb-5">Posts:</h2>
      <h3 className="text-sm mb-5">Just Click a post:</h3>
      {posts.length > 0 ? (
        posts.map((item) => {
          return (
            <Link key={item.id} href={`/posts/${item.id}`}>
              <div className="bg-slate-600 p-2 mb-4 rounded-md">
                <p>{item.title}</p>
                <p>{item.body}</p>
              </div>
            </Link>
          );
        })
      ) : (
        <div>Nothig here yet</div>
      )}
    </div>
  );
}
