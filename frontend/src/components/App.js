import React, { Component } from 'react'
import logo from '../anonymous-logo.svg'
import '../App.css';
import uuid from 'uuid/v4'
import { connect } from 'react-redux'
import { fetchCategories, addPost, fetchPosts } from '../actions'
import PostList from './PostList'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button,
Modal, ModalHeader, ModalBody } from 'reactstrap'
import AddOrEditPostForm from './AddOrEditPostForm'
import { Route } from 'react-router-dom'
import PostDetailView from './PostDetailView'
import { withRouter } from 'react-router'

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

  render() {
    const { posts, categories } = this.props
    posts.sort( (p1, p2) => (this.state.selectedSort === 'vote' ? p2.voteScore - p1.voteScore : p2.timestamp - p1.timestamp) )

    return (
      <div className="main">

        <Route path="/" exact render={() => (
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
                  } />
                </div>
              </div>
            </div>

            <Modal isOpen={this.state.addPostModal} toggle={this.toggleAddPost}>
              <ModalHeader toggle={this.toggleAddPost}>Add a new post</ModalHeader>
              <ModalBody><AddOrEditPostForm categories={categories} onSubmit={this.onAddPost} /></ModalBody>
            </Modal>
          </div>
        )} />

        <Route path="/post" render={() => (<PostDetailView />)} />

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
