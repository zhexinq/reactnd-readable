import React, { Component } from 'react';
import logo from '../anonymous-logo.svg';
import '../App.css';
import * as ReadableAPI from '../utils/ReadableAPI'
import uuid from 'uuid/v4'
import { connect } from 'react-redux'
import { addPost, fetchPosts } from '../actions'
import Post from './Post'
import PostList from './PostList'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.toggleFilter = this.toggleFilter.bind(this)
    this.toggleSort = this.toggleSort.bind(this)
    this.state = {
      filterDropdownOpen: false,
      sortDropdownOpen: false
    };
  }

  toggleFilter() {
    this.setState({
      filterDropdownOpen: !this.state.filterDropdownOpen
    });
  }

  toggleSort() {
    this.setState({
      sortDropdownOpen: !this.state.sortDropdownOpen
    });
  }

  componentDidMount() {
    const { getPosts } = this.props
    getPosts()
  }

  onPostSelect() {

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
              <Button outline color='primary' className='Action'>Add post</Button>
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
      </div>
    );
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
