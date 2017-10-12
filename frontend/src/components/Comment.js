import React, { Component } from 'react'
import VoteBox from './VoteBox'
import { Button } from 'reactstrap'
import AddOrEditCommentForm from './AddOrEditCommentForm'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { connect } from 'react-redux'
import * as commentActions from '../actions/comments'

class Comment extends Component {
  constructor(props) {
    super(props)

    this.toggleEditComment = this.toggleEditComment.bind(this)
    this.onEditCommentSubmit = this.onEditCommentSubmit.bind(this)
    this.onDeleteComment = this.onDeleteComment.bind(this)
    this.state = {
      editCommentModalOpen: false
    }
  }

  toggleEditComment() {
    this.setState({
      editCommentModalOpen: !this.state.editCommentModalOpen
    })
  }

  onEditCommentSubmit(event, values) {
    const { editComment } = this.props
    const { id, body } = values
    const comment = {
      id,
      body,
      timestamp: Date.now()
    }
    editComment(id, comment)
    this.toggleEditComment()
  }

  onDeleteComment() {
    const { comment, deleteComment } = this.props
    deleteComment(comment.id)
  }

  render() {
    const commentStyle = {
      'border': '2px solid black',
      'borderRadius': '5px',
      'marginBottom': '5px'
    }

    const avatarStyle = {
      'margin': '10px auto'
    }

    const buttonStyle = {
      'marginRight': '10px'
    }

    const { comment, toDate } = this.props
    const defaultCommentValues = {
      id: comment.id,
      parentId: comment.parentId,
      author: comment.author,
      body: comment.body
    }

    return (
      <div className="row" style={commentStyle}>
          <div className="col-sm-12">
            <div>
                <img src="http://bootdey.com/img/Content/user_1.jpg" style={avatarStyle} alt="user profile" />
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
                  <Button color="primary" style={buttonStyle} onClick={this.toggleEditComment}>Edit</Button>
                  <Button color="secondary" style={buttonStyle} onClick={this.onDeleteComment}>Delete</Button>
                <VoteBox comment={comment}/>
            </div>
          </div>

          <Modal isOpen={this.state.editCommentModalOpen} toggle={this.toggleEditComment}>
            <ModalHeader toggle={this.toggleEditComment}>Edit comment</ModalHeader>
            <ModalBody>
              <AddOrEditCommentForm defaultValues={defaultCommentValues} onSubmit={this.onEditCommentSubmit} edit/>
            </ModalBody>
          </Modal>
      </div>
    )
  }
}

function mapStateToProps() {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    editComment: (id, edit) => commentActions.fetchEditComment(id, edit)(dispatch),
    deleteComment: (id) => commentActions.fetchDeleteComment(id)(dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Comment)
