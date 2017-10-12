import React, { Component } from 'react'
import { Card, CardText, CardBlock, CardTitle, CardSubtitle, Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import VoteBox from './VoteBox'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as postActions from '../actions/posts'
import { REACT_SERVER } from './PostDetailView'
import AddOrEditPostForm from './AddOrEditPostForm'


class Post extends Component {
  constructor(props) {
    super(props)

    this.toggleEditPost = this.toggleEditPost.bind(this)
    this.onEditPostSubmit = this.onEditPostSubmit.bind(this)
    this.onDeletePost = this.onDeletePost.bind(this)

    this.state = {
      editPostModalOpen: false,
      addCommentModalOpen: false
    }
  }

  trim = (title) => {
    return title.length > 27 ? title.slice(0, 24) + '...' : title
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

  render() {
    const { post } = this.props
    const { id, title, author, timestamp, category } = post
    const date = new Date(timestamp).toLocaleString()
    const defaultPostValues = {
      id: post.id,
      title: post.title,
      body: post.body
    }

    return (
      <div>
        <Card className='Post'>
          <CardBlock>
            <CardTitle><Link to={{
              pathname: "/post",
              search: "?postId=" + id
            }}>{this.trim(title)}</Link></CardTitle>
            <CardSubtitle>{`${author}, ${date}`}</CardSubtitle>
          </CardBlock>
          <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card cap" />
          <CardBlock>
            <CardText>{`Category: ${category}`}</CardText>
            <Button color='primary' style={{ marginRight: '10px', marginLeft: '15px' }} onClick={this.toggleEditPost}>Edit</Button>
            <Button color="danger" onClick={this.onDeletePost} value={JSON.stringify(post)}>Delete</Button>
          </CardBlock>
          <VoteBox post={post} />
        </Card>

        <Modal isOpen={this.state.editPostModalOpen} toggle={this.toggleEditPost}>
          <ModalHeader toggle={this.toggleEditPost}>Edit post</ModalHeader>
          <ModalBody>
            <AddOrEditPostForm onSubmit={this.onEditPostSubmit} defaultValues={defaultPostValues} edit />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}


function mapStateToProps({ posts }) {
  return {
    posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editPost: (id, edit) => postActions.fetchEditPost(id, edit)(dispatch),
    deletePost: (id) => postActions.fetchDeletePost(id)(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
