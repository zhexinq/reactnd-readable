import * as ReadableAPI from '../utils/ReadableAPI'
import { 
  ADD_POST,
  GET_POSTS,
  GET_POST,
  VOTE_POST,
  EDIT_POST,
  DELETE_POST
} from './types'

/* post actions */
export const receiveAddedPost = (post) => ({
  type: ADD_POST,
  post
})

export const addPost = (post) => dispatch => (
  ReadableAPI.addPost(post).then(() => dispatch(receiveAddedPost(post)))
)

export const receivePosts = (posts) => ({
  type: GET_POSTS,
  posts
})

export const fetchPosts = (category) => dispatch => (
  category ? ReadableAPI.getPostsForCategory(category).then(posts => dispatch(receivePosts(posts)))
           : ReadableAPI.getPosts().then(posts => dispatch(receivePosts(posts)))
)

export const receivePost = (post) => ({
  type: GET_POST,
  post
})

export const fetchPost = (id) => dispatch => (
  ReadableAPI.getPost(id).then(post => dispatch(receivePost(post)))
)

export const receiveVotedPost = (post) => ({
  type: VOTE_POST,
  post
})

export const fetchVotePost = (id, voteOption) => dispatch => (
  ReadableAPI.votePost(id, voteOption).then(votedPost => dispatch(receiveVotedPost(votedPost)))
)

export const receiveEditPost = (post) => ({
  type: EDIT_POST,
  post
})

export const fetchEditPost = (id, edit) => dispatch => (
  ReadableAPI.editPost(id, edit).then(editedPost => dispatch(receiveEditPost(editedPost)))
)

export const receiveDeletePost = (post) => ({
  type: DELETE_POST,
  post
})

export const fetchDeletePost = (id) => dispatch => (
  ReadableAPI.deletePost(id).then(deletedPost => dispatch(receiveDeletePost(deletedPost)))
)