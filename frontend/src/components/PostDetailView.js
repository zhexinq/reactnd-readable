import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Jumbotron, Button, CardLink, CardBlock, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { AvForm, AvField, AvInput } from 'availity-reactstrap-validation';
import VoteBox from './VoteBox'
import { withRouter } from 'react-router'
import { fetchPost, fetchComments } from '../actions'
import Comment from './Comment'
import AddOrEditPostForm from './AddOrEditPostForm'
import AddOrEditCommentForm from './AddOrEditCommentForm'

class PostDetailView extends Component {
  constructor(props) {
    super(props)

    this.toggleEditPost = this.toggleEditPost.bind(this)
    this.onEditPostSubmit = this.onEditPostSubmit.bind(this)
    this.toggleAddComment = this.toggleAddComment.bind(this)
    this.onAddCommentSubmit = this.onAddCommentSubmit.bind(this)
    this.state = {
      editPostModalOpen: false,
      addCommentModalOpen: false
    }
  }

  toggleEditPost() {
    this.setState({
      editPostModalOpen: !this.state.editPostModalOpen
    })
  }

  onEditPostSubmit() {

  }

  toggleAddComment() {
    this.setState({
      addCommentModalOpen: !this.state.addCommentModalOpen
    })
  }

  onAddCommentSubmit() {

  }

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

    const buttonStyle = {
      'marginTop': '20px',
      'marginRight': '10px'
    }

    const { posts, location, comments } = this.props
    const post = posts.find(p => p.id == this.getPostId(location.search))
    const defaultPostValues = {
      title: post ? post.title : '',
      body: post ? post.body : ''
    }

    return (
      <div className="container" style={postStyle}>
        <Jumbotron>
          <h1 className="display-3">{post && post.title}</h1>
          <p className="lead">{post && post.author}, {post && this.toDate(post.timestamp)}</p>
          <hr className="my-2" />
          <p className="lead">{post && post.body}</p>
          <hr className="my-2" />
          <Button color="primary" style={buttonStyle} onClick={this.toggleEditPost}>Edit</Button>
          <Button color="secondary" style={buttonStyle}>Delete</Button>
          <Button color="secondary" style={buttonStyle} onClick={this.toggleAddComment}>Comment</Button>
          <VoteBox post={post} />
        </Jumbotron>

        <div className="container">
          {comments && comments.map(comment => (<Comment key={comment.id} comment={comment} toDate={this.toDate} />))}
          {(!comments || comments.length === 0) && <p>No one leaves a comment yet.</p>}
        </div>

        <Modal isOpen={this.state.editPostModalOpen} toggle={this.toggleEditPost}>
          <ModalHeader toggle={this.toggleEditPost}>Edit post</ModalHeader>
          <ModalBody>
            <AddOrEditPostForm onSubmit={this.onEditPostSubmit} defaultValues={defaultPostValues} edit />
          </ModalBody>
        </Modal>

        <Modal isOpen={this.state.addCommentModalOpen} toggle={this.toggleAddComment}>
          <ModalHeader toggle={this.toggleAddComment}>Leave a comment</ModalHeader>
          <ModalBody>
            <AddOrEditCommentForm onSubmit={this.onAddCommentSubmit} />
          </ModalBody>
        </Modal>

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
