import {
	GET_COMMENTS,
	VOTE_COMMENT,
	EDIT_COMMENT,
	ADD_COMMENT,
	DELETE_COMMENT
} from '../actions/types'


export default function comments (state = [], action) {
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
    case DELETE_COMMENT:
      return state.reduce((result, comment) => {
        if (comment.id !== action.comment.id) {
          result.push(comment)
        }
        return result
      }, [])
    default:
      return state
  }
}
