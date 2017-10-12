import * as ReadableAPI from '../utils/ReadableAPI'
import { GET_CATEGORIES } from './types'

/* category */
export const receiveCategories = (categories) => ({
  type: GET_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch => (
  ReadableAPI.getAllCategories().then(categories => dispatch(receiveCategories(categories)))
)