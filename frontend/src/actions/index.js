import * as ReadableAPI from '../utils/ReadableAPI'

export const ADD_POST = 'ADD_POST'
export const GET_POSTS = 'GET_POSTS'

/* post actions */
export const receiveAddedPost = (post) => ({
  type: ADD_POST,
  post
})

export const addPost = (post) => dispatch => (
  ReadableAPI.addPost(post).then(addedPost => dispatch(receiveAddedPost(addedPost)))
)

export const receivePosts = (posts) => ({
  type: GET_POSTS,
  posts
})

export const fetchPosts = () => dispatch => (
  ReadableAPI.getPosts().then(posts => {
    dispatch(receivePosts(posts))
  })
)
