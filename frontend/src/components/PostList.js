import React from 'react';
import Post from './Post'

export default function PostList({ posts, onSelect }) {
  if (posts.length === 0) {
    return <p>There are no posts currently.</p>
  }

  return (
    <ul className='PostList'>
      {posts.map((post) => (
        <li key={post.id}>
          <Post post={post} />
        </li>
      ))
      }
    </ul>
  )
}
