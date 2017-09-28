import React, { Component } from 'react'
import VoteBox from './VoteBox'

export default function Comment({ comment, toDate }) {
  const commentStyle = {
    'border': '2px solid black',
    'borderRadius': '5px',
    'marginBottom': '5px'
  }

  const avatarStyle = {
    'margin': '10px auto'
  }

  return (
    <div className="row" style={commentStyle}>
        <div className="col-sm-12">
          <div>
              <img src="http://bootdey.com/img/Content/user_1.jpg" style={avatarStyle} alt="user profile image" />
              <div>
                  <div className="title h5">
                      <a href="#"><b>{comment.author} </b></a>
                      made a post.
                  </div>
                  <h6 className="text-muted">{toDate(comment.timestamp)}</h6>
              </div>
          </div>
          <div className="comment-description">
              <p>{comment.body}</p>
              <VoteBox comment={comment}/>
          </div>
        </div>
    </div>
  )
}
