import React, { Component } from 'react'
import like from "../assets/like.svg"
import dislike from "../assets/dislike.svg"
import { connect } from 'react-redux'
import { fetchVotePost, fetchVoteComment } from '../actions'
import { CardBlock, CardLink } from 'reactstrap'


class VoteBox extends Component {

  likePost = () => {
    const { post, votePost, comment, voteComment } = this.props
    const voteOption = {
      option: 'upVote'
    }
    post && votePost(post.id, voteOption) || comment && voteComment(comment.id, voteOption)
  }

  dislikePost = () => {
    const { post, votePost, comment, voteComment } = this.props
    const voteOption = {
      option: 'downVote'
    }
    post && votePost(post.id, voteOption) || comment && voteComment(comment.id, voteOption)
  }

  render() {
    const voteBoxStyle = {
      'float': 'right'
    }
    const { post, comment } = this.props

    return (
      <CardBlock style={voteBoxStyle}>
        <CardLink href="#"><img src={like} className='voteButton' onClick={this.likePost} alt='like button' /></CardLink>
        <CardLink href="#"><img src={dislike} className='voteButton' onClick={this.dislikePost} alt='dislike button' /></CardLink>
        <CardLink href="#" className='voteCount'>{post && post.voteScore || comment && comment.voteScore}</CardLink>
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
    votePost: (id, voteOption) => fetchVotePost(id, voteOption)(dispatch),
    voteComment: (id, voteOption) => fetchVoteComment(id, voteOption)(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteBox)
