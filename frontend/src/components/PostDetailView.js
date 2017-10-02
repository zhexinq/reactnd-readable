import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Jumbotron, Button, CardLink, CardBlock, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { AvForm, AvField, AvInput } from 'availity-reactstrap-validation';
import VoteBox from './VoteBox'
import { withRouter } from 'react-router'
import { fetchPost, fetchComments, fetchEditPost, fetchAddComment, fetchDeletePost } from '../actions'
import Comment from './Comment'
import AddOrEditPostForm from './AddOrEditPostForm'
import AddOrEditCommentForm from './AddOrEditCommentForm'
import uuid from 'uuid/v4'

const REACT_SERVER = 'http://localhost:3000/'

class PostDetailView extends Component {
  constructor(props) {
    super(props)

    this.toggleEditPost = this.toggleEditPost.bind(this)
    this.onEditPostSubmit = this.onEditPostSubmit.bind(this)
    this.onDeletePost = this.onDeletePost.bind(this)
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

  onEditPostSubmit(event, values) {
    const { editPost } = this.props
    const { id, title, body } = values
    editPost(id, {
      title: title,
      body: body
    })
    this.toggleEditPost()
  }

  onDeletePost(event) {
    const post = JSON.parse(event.target.value)
    const { deletePost } = this.props
    deletePost(post.id)
    window.location.assign(REACT_SERVER)
  }

  toggleAddComment() {
    this.setState({
      addCommentModalOpen: !this.state.addCommentModalOpen
    })
  }

  onAddCommentSubmit(event, values) {
    const comment = {
      ...values,
      id: uuid(),
      timestamp: Date.now()
    }

    const { addComment } = this.props
    addComment(comment)
    this.toggleAddComment()
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
      id: post ? post.id : '',
      title: post ? post.title : '',
      body: post ? post.body : ''
    }
    const defaultCommentValues = {
      parentId: post ? post.id : ''
    }

    return ( post ?
      <div className="container" style={postStyle}>
        <Jumbotron>
          <h1 className="display-3">{post && post.title}</h1>
          <p className="lead">{post && post.author}, {post && this.toDate(post.timestamp)}</p>
          <hr className="my-2" />
          <p className="lead">{post && post.body}</p>
          <hr className="my-2" />
          <Button color="primary" style={buttonStyle} onClick={this.toggleEditPost}>Edit</Button>
          <Button color="secondary" style={buttonStyle} onClick={this.onDeletePost} value={JSON.stringify(post)}>Delete</Button>
          <Button color="secondary" style={buttonStyle} onClick={this.toggleAddComment}>Comment</Button>
          <VoteBox post={post} />
        </Jumbotron>

        <div className="container">
          {comments && comments.map(comment => comment && !comment.parentDeleted && (<Comment key={comment.id} comment={comment} toDate={this.toDate} />))}
          {(!comments || comments.length === 0) && post && <p>No one leaves a comment yet.</p>}
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
            <AddOrEditCommentForm onSubmit={this.onAddCommentSubmit} defaultValues={defaultCommentValues} />
          </ModalBody>
        </Modal>

      </div> :
      <div>The post doesn't exist</div>
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
    getComments: (id) => fetchComments(id)(dispatch),
    editPost: (id, edit) => fetchEditPost(id, edit)(dispatch),
    deletePost: (id) => fetchDeletePost(id)(dispatch),
    addComment: (comment) => fetchAddComment(comment)(dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetailView))
