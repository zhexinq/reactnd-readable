const api = "http://localhost:3001"

const headers = {
  'Accept': 'application/json',
  'Authorization': 'ad5wvb5u'
}

export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getPostsForCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data.posts)

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

export const addPost = (post) => {
  fetch(`${api}/posts`, {
    method: 'PUT',
    headerss: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( post )
  }).then(res => res.json())
}
