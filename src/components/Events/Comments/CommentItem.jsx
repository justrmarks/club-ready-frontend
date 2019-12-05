import React from 'react'
import {parseISO, formatDistance} from 'date-fns'
import {Comment } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const CommentItem = ({comment}) => {
    const parsedDateTime = parseISO(comment.created_at)
    const postTime = `${formatDistance(new Date(),parsedDateTime, {addSuffix: true})} ago`

    return (<Comment>
        <Comment.Content>
        <Comment.Author as={Link} to={`/organizers/${comment.user.id}`}> {comment.user.name}</Comment.Author>
        <Comment.Metadata>
            <div>{postTime}</div>
        </Comment.Metadata>
        <Comment.Text>{comment.body}}</Comment.Text>
        <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
        </Comment.Content>
    </Comment>
    )
}

export default CommentItem