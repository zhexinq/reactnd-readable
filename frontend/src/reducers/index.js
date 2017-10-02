import { ADD_POST, GET_POSTS, GET_CATEGORIES, VOTE_POST, EDIT_POST, GET_POST, GET_COMMENTS, VOTE_COMMENT, EDIT_COMMENT, ADD_COMMENT } from '../actions'
import { combineReducers } from 'redux'

function posts (state = [], action) {
  const posts = Object.assign([], state)

  switch (action.type) {
    case ADD_POST:
      posts.push(action.post)
      return posts
    case GET_POSTS:
      return action.posts
    case GET_POST:
      posts.push(action.post)
      return posts
    case VOTE_POST:
      return state.map(post => post.id === action.post.id ? action.post : post)
    case EDIT_POST:
      return state.map(p => p.id === action.post.id ? action.post : p)
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

function comments (state = [], action) {
  const comments = Object.assign([], state)

  switch (action.type) {
    case GET_COMMENTS:
      return action.comments
    case VOTE_COMMENT:
      return state.map(comment => comment.id === action.comment.id ? action.comment : comment)
    case EDIT_COMMENT:
      return state.map(comment => comment.id === action.comment.id ? action.comment : comment)
    case ADD_COMMENT:
      comments.push(action.comment)
      return comments
    default:
      return state
  }
}

export default combineReducers( { posts, categories, comments } )
