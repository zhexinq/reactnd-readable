import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Jumbotron, Button, CardLink, CardBlock } from 'reactstrap'
import VoteBox from './VoteBox'
import { withRouter } from 'react-router'
import { fetchPost, fetchComments } from '../actions'
import Comment from './Comment'

class PostDetailView extends Component {

  getPostId(param) {
    return param.substring(param.indexOf('=')+1)
  }

  toDate(timestamp) {
    return new Date(timestamp).toLocaleString()
  }

  componentDidMount() {
    const { getPost, location, getComments } = this.props
    const postId = this.getPostId(location.search)
    getPost(postId)
    getComments(postId)
  }

  render() {
    const postStyle = {
      'marginTop': '30px',
      'marginBottom': '30px',
    }

    const addCommentBtnStyle = {
      'marginTop': '20px'
    }

    const { posts, location, comments } = this.props
    const post = posts.find(p => p.id == this.getPostId(location.search))


    return (
      <div className="container" style={postStyle}>
        <Jumbotron>
          <h1 className="display-3">{post && post.title}</h1>
          <p className="lead">{post && post.author}, {post && this.toDate(post.timestamp)}</p>
          <hr className="my-2" />
          <p className="lead">{post && post.body}</p>
          <hr className="my-2" />
          <Button color="primary" style={addCommentBtnStyle}>Add comment</Button>
          <VoteBox post={post} />
        </Jumbotron>

        {/* comments section */}
        <div className="container">
          {comments && comments.map(comment => (<Comment comment={comment} toDate={this.toDate} />))}
          {(!comments || comments.length === 0) && <p>No one leaves a comment yet.</p>}
        </div>
      </div>
    )

  }
}

function mapStateToProps({ posts, comments }) {
  return {
    posts,
    comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: (id) => fetchPost(id)(dispatch),
    getComments: (id) => fetchComments(id)(dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetailView))
