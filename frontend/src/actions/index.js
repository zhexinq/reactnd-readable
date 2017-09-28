import * as ReadableAPI from '../utils/ReadableAPI'

export const GET_CATEGORIES = 'GET_CATEGORIES'
export const ADD_POST = 'ADD_POST'
export const GET_POSTS = 'GET_POSTS'
export const GET_POST = 'GET_POST'
export const VOTE_POST = 'VOTE_POST'
export const GET_COMMENTS = 'GET_COMMENTS'
export const VOTE_COMMENT = 'VOTE_COMMENT'

/* category */
export const receiveCategories = (categories) => ({
  type: GET_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch => (
  ReadableAPI.getAllCategories().then(categories => dispatch(receiveCategories(categories)))
)

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
