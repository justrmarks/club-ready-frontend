const AUTH_TOKEN_NAME = "project-sploopy authorization"

const EVENTS_INDEX = 'http://localhost:3000/events'

export const ATTEND_EVENT = "ATTEND_EVENT"
export const DELETE_ATTEND = "DELETE_ATTEND"



  export const toggleAttendance = (event) => {
    let ATTENDING_INDEX = "http://localhost:3000/attendings"
    console.log(event)
    return async (dispatch) => {
      let reqObj;
      let type;
      if (!event.attending) {
        reqObj = {
          method: 'POST',
          headers: { 'Content-Type' : 'application/json',
            Authorization: localStorage.getItem(AUTH_TOKEN_NAME)
          },
          body: JSON.stringify({id: event.id})
        }
        type = ATTEND_EVENT
      }

      else {
        reqObj = {
          method: 'DELETE',
          headers: { 'Content-Type' : 'application/json',
            Authorization: localStorage.getItem(AUTH_TOKEN_NAME)
          }
        }
        type = DELETE_ATTEND
        ATTENDING_INDEX += `/${event.id}` 
      }

      
      const resp = await fetch(ATTENDING_INDEX, reqObj)
      const json = await resp.json()
      console.log(json)
      const resEvent = json.event.data.attributes 

      dispatch({type, event: resEvent})


    }

  }

export const GET_SHOW = "GET_SHOW"
export const SET_SHOW = "SET_SHOW"
export const setShow = (event) =>  { return {type: SET_SHOW, event}}
export const getEvent = (id) => {
    return async dispatch => {

      try {
        const reqObj = {
          method: 'GET',
          headers: { 'Content-Type' : 'application/json',
            Authorization: localStorage.getItem(AUTH_TOKEN_NAME)
          }
      }
        dispatch({type: GET_SHOW})
        const resp = await fetch(`${EVENTS_INDEX}/${id}`, reqObj)
        const json = await resp.json()
        const event = {...json.event.data.attributes, comments: json.comments}
        dispatch(setShow(event))
      
    }
      catch (error) {

      }
    
    }

  }


  export const CREATE_EVENT = "CREATE_EVENT"
  export const ADD_EVENT = "ADD_EVENT"

  export const createEvent = event => {
    return async dispatch => {
      try {

    const data = new FormData();
    
    Object.keys(event).forEach(function (key) {
        // console.log(this.state[item]); // value
        data.append(`event[${key}]`, event)
        });

        const reqObj = {
          method: 'GET',
          headers: { 
            Authorization: localStorage.getItem(AUTH_TOKEN_NAME)
          },
          body: data
        }

      dispatch({type: CREATE_EVENT})
     const resp = await fetch(EVENTS_INDEX, reqObj)
     const json = await resp.json()
     const event = json.event
    } 
    catch (error) {

    } 
  }
}
  