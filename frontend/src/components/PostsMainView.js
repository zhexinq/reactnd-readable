import React, { Component } from 'react'
import PostList from './PostList'


export default function PostMainView ({ posts, sort, category }) {
	const filtered = posts.filter( post => ( category === 'all' || post.category === category ) )
	filtered.sort( (p1, p2) => 
		(sort === 'date' ? p2.timestamp - p1.timestamp : p2.voteScore - p1.voteScore) )

	return (
		<div className="container">
        	<div className='row'>
            	<div className='col-md-12'>
            		<PostList posts={filtered} />
              	</div>
        	</div>
        </div>
	)
}