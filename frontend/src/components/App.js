import React, { Component } from 'react'
import logo from '../anonymous-logo.svg'
import '../App.css';
import * as ReadableAPI from '../utils/ReadableAPI'
import uuid from 'uuid/v4'
import { connect } from 'react-redux'
import { addPost, fetchPosts } from '../actions'
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
    this.state = {
      filterDropdownOpen: false,
      sortDropdownOpen: false,
      addPostModal: false
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

  toggleSort() {
    this.setState({
      sortDropdownOpen: !this.state.sortDropdownOpen
    })
  }

  toggleAddPost() {
    this.setState({
      addPostModal: !this.state.addPostModal
    })
  }

  componentDidMount() {
    const { getPosts } = this.props
    getPosts()
  }

  onPostSelect() {

  }

  onAddPost() {

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

    ReadableAPI.deleteComment('e43023de-d54e-46ee-a1d3-88df549e0000').then(data => alert(JSON.stringify(data)))
  }

  render() {
    console.log(this.props)
    const { posts } = this.props
    const posts_n = []

    for (let i = 1; i <= 10; i++) {
      posts.forEach( p => {
        const copy = Object.assign({}, p)
        copy.id = uuid()
        posts_n.push(copy)
      } )
    }

    return (
      <div className="App">

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Readable!</h2>
        </div>

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
                  <DropdownItem>Date</DropdownItem>
                  <DropdownItem>Vote</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className='col-md-1 align-self-end'>
              <Dropdown className='Filter' tether isOpen={this.state.filterDropdownOpen} toggle={this.toggleFilter}>
                <DropdownToggle caret>
                  Category
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Category1</DropdownItem>
                  <DropdownItem>Category2</DropdownItem>
                  <DropdownItem>Category3</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>

        <div className="container">
          <div className='row'>
            <div className='col-md-12'>
              <PostList posts={posts_n} />
            </div>
          </div>
        </div>

        <Modal isOpen={this.state.addPostModal} toggle={this.toggleAddPost}>
          <ModalHeader toggle={this.toggleAddPost}>Add a new post</ModalHeader>
          <ModalBody><AddOrEditPostForm defaultValues={this.defaultValues}/></ModalBody>
        </Modal>

      </div>
    )
  }
}

function mapStateToProps({posts}) {
  return {
    posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: () => fetchPosts()(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
