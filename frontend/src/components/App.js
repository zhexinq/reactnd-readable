import React, { Component } from 'react'
import logo from '../anonymous-logo.svg'
import '../App.css';
import uuid from 'uuid/v4'
import { connect } from 'react-redux'
// import { fetchCategories, addPost, fetchPosts } from '../actions'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button,
Modal, ModalHeader, ModalBody, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import AddOrEditPostForm from './AddOrEditPostForm'
import { Route } from 'react-router-dom'
import PostDetailView from './PostDetailView'
import { withRouter } from 'react-router'
import PostsMainView from './PostsMainView'
import capitalize from 'capitalize'
import { addPost, fetchPosts } from '../actions/posts'
import { fetchCategories } from '../actions/categories'

class App extends Component {
  constructor(props) {
    super(props)

    this.toggleNavBar = this.toggleNavBar.bind(this)
    this.toggleSort = this.toggleSort.bind(this)
    this.toggleAddPost  = this.toggleAddPost.bind(this)
    this.onAddPost = this.onAddPost.bind(this)
    this.selectSort = this.selectSort.bind(this)
    this.state = {
      sortDropdownOpen: false,
      addPostModal: false,
      selectedFilter: null,
      selectedSort: null
    }
  }

  toggleNavBar() {
    this.setState({
      isNavBarOpen: !this.state.isNavBarOpen
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
    const { posts, categories, location } = this.props
    const hiddenStyle = {
      display: 'none'
    }
    const pathname = location.pathname

    return (
      <div className="main">

        <Navbar style={{ flexDirection: 'row' }} color="faded" light>
          <NavbarBrand href="/">Readable</NavbarBrand>
          <Nav style={{ flexDirection: 'row' }} className="ml-auto" navbar>
            {categories.map(category => (
              <NavItem key={category.path} >
                <NavLink 
                  href={`/${category.name}`}
                  active={pathname.substring(1) === category.name}>
                    {category.name}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </Navbar>          


        <div className="App" style={this.props.location.search ? hiddenStyle : {} }>
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
                    {this.state.selectedSort ? capitalize(this.state.selectedSort) : 'Sort'}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.selectSort} 
                                  active={this.state.selectedSort === 'date'}>
                                  Date
                    </DropdownItem>
                    <DropdownItem onClick={this.selectSort}
                                  active={this.state.selectedSort === 'vote'}>
                                  Vote
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>

          <Route path='/' exact render={ () =>
            <PostsMainView posts={posts} 
                           sort={this.state.selectedSort}
                           category='all'
            />} 
          />

          {categories.map( category => 
            (<Route
              key={category.path} 
              path={`/${category.name}`} 
              exact
              render={ () => (<PostsMainView 
                                posts={posts} 
                                sort={this.state.selectedSort}
                                category={category.name} 
                              />)}
              />) )} 

          <Modal isOpen={this.state.addPostModal} toggle={this.toggleAddPost}>
            <ModalHeader toggle={this.toggleAddPost}>Add a new post</ModalHeader>
            <ModalBody><AddOrEditPostForm categories={categories} onSubmit={this.onAddPost} /></ModalBody>
          </Modal>
        </div>


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
