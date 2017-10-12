import {
	ADD_POST,
	GET_POSTS,
	GET_POST,
	VOTE_POST,
	EDIT_POST,
	DELETE_POST
} from '../actions/types'

export default function posts (state = [], action) {
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
    case DELETE_POST:
      return state.reduce((result, post) => {
        if (post.id !== action.post.id) {
          result.push(post)
        }
        return result
      }, [])
    default:
      return state
  }
}
