import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import CommentItem from './CommentItem'

const CommentFeed = ({comments}) => {
  
  const commentItems = comments.map(comment=> <CommentItem key={comment.id} comment={comment} />)
  
  return(
  <Comment.Group className="commentFeed">
    <Header as='h3' dividing>
      Comments
    </Header>
    {commentItems}

    <Form reply>
      <Form.TextArea />
      <Button content='Add Reply' labelPosition='left' icon='edit' primary />
    </Form>
  </Comment.Group>
)}

export default CommentFeed