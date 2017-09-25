import { ADD_POST, GET_POSTS, GET_CATEGORIES, VOTE_POST } from '../actions'
import { combineReducers } from 'redux'

function posts (state = [], action) {
  switch (action.type) {
    case ADD_POST:
      const { post } = action
      const posts = Object.assign([], state)
      posts.push(post)
      return posts
    case GET_POSTS:
      return action.posts
    case VOTE_POST:
      return state.map(post => post.id === action.post.id ? action.post : post)
    default:
      return state
  }
}

function categories (state = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

export default combineReducers( { posts, categories } )
