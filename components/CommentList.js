
// components/CommentList.js
'use client';

import useSWR from 'swr';

// Use the built-in fetch API instead of importing 'unfetch'
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CommentList({ postId }) {
  const { data, error } = useSWR(`/api/posts/${postId}/comments`, fetcher);

  if (error) return <div>Failed to load comments</div>;
  if (!data) return <div>Loading comments...</div>;

  return (
    <div>
      {data.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
}