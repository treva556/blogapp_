
// components/PostList.js
'use client';

import useSWR from 'swr';

// Use the built-in fetch API instead of importing 'unfetch'
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function PostList() {
  const { data, error } = useSWR('/api/posts', fetcher);

  if (error) return <div>Failed to load posts</div>;
  if (!data) return <div>Loading posts...</div>;

  return (
    <div>
      {data.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <CommentList postId={post.id} />
        </div>
      ))}
    </div>
  );
}