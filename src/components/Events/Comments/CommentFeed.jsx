import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import {connect} from 'react-redux'
import CommentItem from './CommentItem'
import { createComment } from '../../../store/actions/comment'

const CommentFeed = (props) => {

  const {event,comments} = props
  
  const commentItems = comments.map(comment=> <CommentItem key={comment.id} comment={comment} />)

  const handleCommentSubmit = (event) => {
    const target = event.target
    event.preventDefault()
    const input = target.input.value
    props.makeComment({id: event.id, body: input})
    target.reset()
    
  }
  
  return(
  <Comment.Group className="commentFeed">
    <Header as='h3' dividing>
      Comments
    </Header>
    {commentItems.length > 0 ? commentItems : <p>No comments</p>}

    {props.validUser ? <Form reply onSubmit={handleCommentSubmit}>
      <Form.TextArea name="input"/>
      <Button content='Add Reply' labelPosition='left' icon='edit' primary type="submit"/>
    </Form> : <></>}

  </Comment.Group>
)}


const mapDispatchToProps = (dispatch) => {
  return {
    makeComment: (payload) => dispatch(createComment(payload))
  }
}

const mapStateToProps = (state) => {
  return {
    validUser: !!(state.Auth.currentUser) 
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(CommentFeed)