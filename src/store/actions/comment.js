const AUTH_TOKEN_NAME = "project-sploopy authorization"

export const ADD_COMMENT = "ADD_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const CREATE_COMMENT = "CREATE_COMMENT"
const COMMENT_INDEX = process.env.API_ROOT+'/comments'

export const addComment = (comment)=> {return {type: ADD_COMMENT, comment}}
export const createComment = ({id, body})=> {
        return async dispatch => {
          try {
            const reqObj = {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem(AUTH_TOKEN_NAME)
              },
              body: JSON.stringify({
                  id,
                  body
              })
            }
    
         dispatch({type: CREATE_COMMENT})
         const resp = await fetch(COMMENT_INDEX, reqObj)
         const json = await resp.json()
         console.log(json)
         const comment = json.comment.data.attributes
         dispatch(addComment(comment))
        } 
        catch (error) {
          console.error(error)
        } 
      }
    }
    
