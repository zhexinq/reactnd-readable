import React, { Component } from 'react'
import logo from '../anonymous-logo.svg'
import '../App.css';
import * as ReadableAPI from '../utils/ReadableAPI'
import uuid from 'uuid/v4'
import { connect } from 'react-redux'
import { fetchCategories, addPost, fetchPosts } from '../actions'
import Post from './Post'
import PostList from './PostList'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button,
Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import AddOrEditPostForm from './AddOrEditPostForm'

class App extends Component {
  constructor(props) {
    super(props)

    this.toggleFilter = this.toggleFilter.bind(this)
    this.toggleSort = this.toggleSort.bind(this)
    this.toggleAddPost  = this.toggleAddPost.bind(this)
    this.onAddPost = this.onAddPost.bind(this)
    this.selectFilter = this.selectFilter.bind(this)
    this.selectSort = this.selectSort.bind(this)
    this.state = {
      filterDropdownOpen: false,
      sortDropdownOpen: false,
      addPostModal: false,
      selectedFilter: 'all',
      selectedSort: 'vote'
    }
  }

  defaultValues = {
    title: 'defaultTitle',
    author: 'defaultAuthor',
    category: 'defaultCategory',
    body: 'defaultBody'
  }

  toggleFilter() {
    this.setState({
      filterDropdownOpen: !this.state.filterDropdownOpen
    })
  }

  selectFilter(event) {
    this.setState({
      selectedFilter: event ? event.target.innerText : ''
    })
  }

  toggleSort() {
    this.setState({
      sortDropdownOpen: !this.state.sortDropdownOpen
    })
  }

  selectSort(event) {
    this.setState({
      selectedSort: event ? event.target.innerText.toLowerCase() : ''
    })
  }

  toggleAddPost() {
    this.setState({
      addPostModal: !this.state.addPostModal
    })
  }

  componentDidMount() {
    const { getPosts, getCategories } = this.props
    getPosts()
    getCategories()
  }

  onPostSelect() {

  }

  onAddPost(event, values) {
    const post = {
      ...values,
      id: uuid(),
      timestamp: Date.now(),
      voteScore: 0
    }
    const { addPost } = this.props
    addPost(post)
    this.toggleAddPost()
  }

  testAPI() {
    const post = {
      "id": uuid(),
      "timestamp": 1467166872634,
      "title": "post title",
      "body": "test whether works",
      "author": "zhexin",
      "category": "react",
      "voteScore": 0,
      "deleted": false
    }

    const option = {
      option: 'upVote'
    }

    const edit = {
      title: 'change to different title',
      body: 'this is a different body.'
    }

    const comment = {
      id: uuid(),
      timestamp: new Date(),
      body: 'test comment :L',
      author: 'zhexin',
      parentId: '8xf0y6ziyjabvozdd253nd'
    }

    const commentEdit = {
      timestamp: new Date(),
      body: 'a lalala fuck that bitch'
    }

    ReadableAPI.addPost(post).then(data => alert(JSON.stringify(data)))
  }

  render() {
    console.log(this.props)
    const { posts, categories } = this.props
    posts.sort( (p1, p2) => (this.state.selectedSort === 'vote' ? p2.voteScore - p1.voteScore : p2.timestamp - p1.timestamp) )

    return (
      <div className="App">

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Readable!</h2>
        </div>

        <Button onClick={this.testAPI}>Test API</Button>

        <div className='container'>
          <div className='row'>
            <div className='col-md-10 align-self-start'>
              <Button outline color='primary' className='Action' onClick={this.toggleAddPost}>Add post</Button>
            </div>
            <div className='col-md-1 align-self-end'>
              <Dropdown className='Sort' tether isOpen={this.state.sortDropdownOpen} toggle={this.toggleSort}>
                <DropdownToggle caret>
                  Sort
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.selectSort}>Date</DropdownItem>
                  <DropdownItem onClick={this.selectSort}>Vote</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className='col-md-1 align-self-end'>
              <Dropdown className='Filter' tether isOpen={this.state.filterDropdownOpen} toggle={this.toggleFilter}>
                <DropdownToggle caret>
                  Category
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.selectFilter}>all</DropdownItem>
                  {categories.map((category) =>
                    (<DropdownItem key={category.path} onClick={this.selectFilter}>{category.name}</DropdownItem>))}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>

        <div className="container">
          <div className='row'>
            <div className='col-md-12'>
              <PostList posts={this.state.selectedFilter === 'all' ? posts :
                posts.filter(post => post.category === this.state.selectedFilter)
              } onSelect={this.onPostSelect} />
            </div>
          </div>
        </div>

        <Modal isOpen={this.state.addPostModal} toggle={this.toggleAddPost}>
          <ModalHeader toggle={this.toggleAddPost}>Add a new post</ModalHeader>
          <ModalBody><AddOrEditPostForm categories={categories} onSubmit={this.onAddPost} /></ModalBody>
        </Modal>

      </div>
    )
  }
}

function mapStateToProps({posts, categories}) {
  return {
    posts,
    categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => fetchCategories()(dispatch),
    getPosts: () => fetchPosts()(dispatch),
    addPost: (post) => addPost(post)(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
