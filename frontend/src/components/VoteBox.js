import React, { Component } from 'react'
import like from "../assets/like.svg"
import dislike from "../assets/dislike.svg"
import { connect } from 'react-redux'
import { fetchVotePost } from '../actions'
import { CardBlock, CardLink } from 'reactstrap'


class VoteBox extends Component {

  likePost = () => {
    const { post, votePost, comment, voteComment } = this.props
    const voteOption = {
      option: 'upVote'
    }
    post ? votePost(post.id, voteOption) : voteComment(comment.id, voteOption)
  }

  dislikePost = () => {
    const { post, votePost, comment, voteComment } = this.props
    const voteOption = {
      option: 'downVote'
    }
    post ? votePost(post.id, voteOption) : voteComment(comment.id, voteOption)
  }

  render() {
    const { post, comment } = this.props

    return (
      <CardBlock>
        <CardLink href="#"><img src={like} className='voteButton' onClick={this.likePost} /></CardLink>
        <CardLink href="#"><img src={dislike} className='voteButton' onClick={this.dislikePost} /></CardLink>
        <CardLink href="#" className='voteCount'>{post ? post.voteScore : comment.voteScore}</CardLink>
      </CardBlock>
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

export default connect(mapStateToProps, mapDispatchToProps)(VoteBox)
