import * as ReadableAPI from '../utils/ReadableAPI'
import { 
  GET_COMMENTS,
  VOTE_COMMENT,
  EDIT_COMMENT,
  ADD_COMMENT,
  DELETE_COMMENT
} from './types'

/* comment actions */
export const receiveComments = (comments) => ({
    type: GET_COMMENTS,
    comments
})

export const fetchComments = (id) => dispatch => (
  ReadableAPI.getComments(id).then(comments => dispatch(receiveComments(comments)))
)

export const receiveVotedComment = (comment) => ({
  type: VOTE_COMMENT,
  comment
})

export const fetchVoteComment = (id, voteOption) => dispatch => (
  ReadableAPI.voteComment(id, voteOption).then(votedComment => dispatch(receiveVotedComment(votedComment)))
)

export const receiveEditComment = (comment) => ({
  type: EDIT_COMMENT,
  comment
})

export const fetchEditComment = (id, edit) => dispatch => (
  ReadableAPI.editComment(id, edit).then(editedComment => dispatch(receiveEditComment(editedComment)))
)

export const receiveAddComment = (comment) => ({
  type: ADD_COMMENT,
  comment
})

export const fetchAddComment = (comment) => dispatch => (
  ReadableAPI.addComment(comment).then(addedComment => dispatch(receiveAddComment(addedComment)))
)

export const receiveDeleteComent = (comment) => ({
  type: DELETE_COMMENT,
  comment
})

export const fetchDeleteComment = (id) => dispatch => (
  ReadableAPI.deleteComment(id).then(deletedComment => dispatch(receiveDeleteComent(deletedComment)))
)
