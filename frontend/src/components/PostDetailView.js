import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Jumbotron, Button, CardLink, CardBlock } from 'reactstrap'
import VoteBox from './VoteBox'

class PostDetailView extends Component {

  render() {
    const post = {
      id: 123,
      title: 'Game of Thrones',
      author: 'zhexin',
      voteScore: 100,
      body: 'This is a fucking article',
      date: '2017/05/12'
    }

    return (
      <Jumbotron>
        <h1>post.title</h1>
        <p>post.author, post.date</p>
        <hr />
        <p>post.body</p>
        <VoteBox post={post} />
      </Jumbotron>
    )

  }
}

function mapStateToProps({ posts }) {
  return {
    posts
  }
}

export default connect(mapStateToProps)(PostDetailView)
