
// app/pages.js
// 'use client';

// import PostList from '../components/PostList';
// import { useState } from 'react';
// import { useSession } from 'next-auth/react';

// export default function Home() {
//   const { data: session } = useSession();
//   const [content, setContent] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await fetch('/api/posts', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ content }),
//     });
//     setContent("");
//   };

//   return (
//     <div>
//       {session && (
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             maxLength={50}
//             minLength={1}
//             required
//           />
//           <button type="submit">Post</button>
//         </form>
//       )}
//       <PostList />
//     </div>
//   );
// }

'use client';

import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();
  console.log('Session data:', session);
  console.log('Session status:', status);

  return (
    <div>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : session ? (
        <p>Welcome, {session.user.name}</p>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
}