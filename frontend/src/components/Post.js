import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBlock, CardLink, CardTitle, CardSubtitle } from 'reactstrap'
import like from "../assets/like.svg"
import dislike from "../assets/dislike.svg"



export default function Post({ post, showDetail }) {
  const {id, title, author, timestamp, body, category, voteScore, deleted } = post
  const date = new Date(timestamp).toLocaleString()
  const trim = (title) => {
    return title.length > 27 ? title.slice(0, 24) + '...' : title
  }

  return (
    showDetail ? <div>Post detail view</div> :
    <Card className='Post'>
      <CardBlock>
        <CardTitle>{trim(title)}</CardTitle>
        <CardSubtitle>{`${author}, ${date}`}</CardSubtitle>
      </CardBlock>
      <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
      <CardBlock>
        <CardText>{`Category: ${category}`}</CardText>
        <CardLink href="#"><img src={like} className='voteButton' /></CardLink>
        <CardLink href="#"><img src={dislike} className='voteButton' /></CardLink>
        <CardLink href="#" className='voteCount'>{voteScore}</CardLink>
      </CardBlock>
    </Card>
  )
}
