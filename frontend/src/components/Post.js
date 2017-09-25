import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBlock, CardLink, CardTitle, CardSubtitle } from 'reactstrap'
import like from "../assets/like.svg"
import dislike from "../assets/dislike.svg"
import { connect } from 'react-redux'
import { fetchVotePost } from '../actions'

class Post extends Component {
  trim = (title) => {
    return title.length > 27 ? title.slice(0, 24) + '...' : title
  }

  likePost = () => {
    const { post, votePost } = this.props
    const voteOption = {
      option: 'upVote'
    }
    votePost(post.id, voteOption)
  }

  dislikePost = () => {
    const { post, votePost } = this.props
    const voteOption = {
      option: 'downVote'
    }
    votePost(post.id, voteOption)
  }

  render() {
    const { post, showDetail } = this.props
    const { id, title, author, timestamp, body, category, voteScore, deleted } = post
    const date = new Date(timestamp).toLocaleString()

    return (
      showDetail ? <div>Post detail view</div> :
      <Card className='Post'>
        <CardBlock>
          <CardTitle>{this.trim(title)}</CardTitle>
          <CardSubtitle>{`${author}, ${date}`}</CardSubtitle>
        </CardBlock>
        <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
        <CardBlock>
          <CardText>{`Category: ${category}`}</CardText>
          <CardLink href="#"><img src={like} className='voteButton' onClick={this.likePost} /></CardLink>
          <CardLink href="#"><img src={dislike} className='voteButton' onClick={this.dislikePost} /></CardLink>
          <CardLink href="#" className='voteCount'>{voteScore}</CardLink>
        </CardBlock>
      </Card>
    )
  }
}

function mapStateToProps({ posts }) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    votePost: (id, voteOption) => fetchVotePost(id, voteOption)(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
