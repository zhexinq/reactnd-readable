import React, { Component } from 'react'
import { Card, CardText, CardBlock, CardTitle, CardSubtitle } from 'reactstrap'
import VoteBox from './VoteBox'
import { Link } from 'react-router-dom'

class Post extends Component {
  trim = (title) => {
    return title.length > 27 ? title.slice(0, 24) + '...' : title
  }

  render() {
    const { post } = this.props
    const { id, title, author, timestamp, body, category, voteScore, deleted } = post
    const date = new Date(timestamp).toLocaleString()

    return (
      <div>
        <Card className='Post'>
          <CardBlock>
            <CardTitle><Link to="/post">{this.trim(title)}</Link></CardTitle>
            <CardSubtitle>{`${author}, ${date}`}</CardSubtitle>
          </CardBlock>
          <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
          <CardBlock>
            <CardText>{`Category: ${category}`}</CardText>
          </CardBlock>
          <VoteBox post={post} />
        </Card>
      </div>
    )
  }
}

export default Post
