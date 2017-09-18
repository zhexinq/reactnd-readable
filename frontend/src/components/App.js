import React, { Component } from 'react';
import logo from '../anonymous-logo.svg';
import '../App.css';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import * as ReadableAPI from '../utils/ReadableAPI'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap'
import uuid from 'uuid/v4'
import { connect } from 'react-redux'
import { addPost, fetchPosts } from '../actions'

class App extends Component {
  posts = []
  options = {
    defaultSortName: 'voteScore',
    defaultSortOrder: 'desc',
    onRowClick: e => alert(JSON.stringify(e))
  }

  populatePosts() {
    for (let i = 0; i < 100; i++) {
      this.posts.push(
        {
          id: uuid(),
          timestamp: i,
          title: 'post title',
          body: 'post body',
          author: 'author',
          category: 'category',
          voteScore: i,
          deleted: false
        }
      )
    }
  }

  componentDidMount() {
    const { getPosts } = this.props
    getPosts()
  }


  render() {
    console.log(this.props)
    const { posts } = this.props

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Readable!</h2>
        </div>

        <div className="container">
          <div className="Action">
            <Button bsStyle="primary">Add post</Button>
          </div>
          <div className="Filter">
            <DropdownButton title="Category" id="Dropdown">
              <MenuItem eventKey="1">Category1</MenuItem>
              <MenuItem eventKey="2">Category2</MenuItem>
            </DropdownButton>
          </div>
        </div>

        <BootstrapTable data={posts} options={this.options} className="PostsTable" pagination>
          <TableHeaderColumn dataField='id' isKey>Post Id</TableHeaderColumn>
          <TableHeaderColumn dataField='timestamp' dataSort>Created Time</TableHeaderColumn>
          <TableHeaderColumn dataField='title'>Title</TableHeaderColumn>
          <TableHeaderColumn dataField='author'>Author</TableHeaderColumn>
          <TableHeaderColumn dataField='category'>Category</TableHeaderColumn>
          <TableHeaderColumn dataField='voteScore' dataSort>Votes</TableHeaderColumn>
        </BootstrapTable>
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
