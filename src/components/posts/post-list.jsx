import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useHttp } from "../../hooks/http";
import PostItem from "./post-item";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const { request } = useHttp();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = useCallback(async () => {
    try {
      const posts = await request("/api/post/", "GET", null);

      setPosts(posts);
    } catch (e) {}
  }, []);

  return (
    <div className="container post-list">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
