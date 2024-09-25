"use client";

import React from "react";
import { useParams } from "next/navigation";
import { shallow } from "zustand/shallow";
import { useCounterStore } from "@/store/counterStore";

const PostDetail = () => {
  const { id } = useParams();
  const { getPostid, postId } = useCounterStore(
    (state) => ({
      getPostid: state.getPostId,
      postId: state.postId,
    }),
    shallow
  );

  React.useEffect(() => {
    getPostid(id.toString());
  }, [getPostid, id]);

  if (!postId.length) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {postId.map((post) => {
        return (
          <div key={post.userId}>
            <h2>ID: {post.id}</h2>
            <h1>Title: {post.title}</h1>
            <p>Body:{post.body}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PostDetail;
