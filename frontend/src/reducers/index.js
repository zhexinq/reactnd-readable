import { ADD_POST, GET_POSTS } from '../actions'

import { combineReducers } from 'redux'

function posts (state = [], action) {
  switch (action.type) {
    case ADD_POST:
      const { post } = action
      state.posts.push(post)
      return state
    case GET_POSTS:
      const { posts } = action
      return posts
    default:
      return state
  }
}

export default combineReducers( { posts } )
