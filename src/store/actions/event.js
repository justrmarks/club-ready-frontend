const AUTH_TOKEN_NAME = "project-sploopy authorization"

const EVENTS_INDEX = process.env.API_ROOT+'/events'

export const FETCH_ATTENDING = "FETCH_ATTENDING"
export const SET_ATTENDING = "SET_ATTENDING"
export const setAttendingEvents = (events)=> {return {type:SET_ATTENDING, events}}
export const fetchAttendingEvents = () => {
  return async (dispatch) => {
    try {
      const reqObj = {
        method: 'GET',
        headers: { 'Content-Type' : 'application/json',
          Authorization: localStorage.getItem(AUTH_TOKEN_NAME)
        }
      }
      dispatch({type: FETCH_ATTENDING})
      const resp = await fetch(EVENTS_INDEX + "/attending", reqObj)
      const json = await resp.json()
      console.log(json)
      const events = json.events.map(event => {
        const result = event.data.attributes
        return result })
        dispatch(setAttendingEvents(events))

    }
    catch (error) {
      console.error(error)
    }
  }
}


export const FETCH_HOST_EVENTS = "FETCH_HOST_EVENTS"
export const SET_HOST_EVENTS = "SET_HOST_EVENTS"
export const setHostEvents = (events) => {return{type:SET_HOST_EVENTS, events}}
export const fetchHostEvents = () => {
    return async (dispatch) => {

      try {
      const reqObj = {
        method: 'GET',
        headers: { 'Content-Type' : 'application/json',
          Authorization: localStorage.getItem(AUTH_TOKEN_NAME)
        }
      }
      dispatch({type: FETCH_HOST_EVENTS})
      const resp = await fetch(EVENTS_INDEX + "/hosting", reqObj)
      const json = await resp.json()
      console.log(json)
      const events = json.events.map(event => {
        const result = event.data.attributes
        return result })
        dispatch(setHostEvents(events)) } 

        catch (error) {
          console.log(error)
        }
      }
}





export const ATTEND_EVENT = "ATTEND_EVENT"
export const DELETE_ATTEND = "DELETE_ATTEND"

  export const toggleAttendance = (event, attending) => {
    let ATTENDING_INDEX = "http://localhost:3000/attendings"
    return async (dispatch) => {
      let reqObj;
      let type;
      if (!attending) {
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
        console.log(json)
        const comments = json.comments.map(comment=> comment.data.attributes)
        const event = {...json.event.data.attributes, comments}
        dispatch(setShow(event))
      
    }
      catch (error) {
        console.error(error)
      }
    
    }

  }


  export const CREATE_EVENT = "CREATE_EVENT"
  export const ADD_HOST_EVENT = "ADD_HOST_EVENT"
  export const addHostEvent = (event)=> {return {type: ADD_HOST_EVENT, event}}
  
  export const createEvent = newEvent => {
    return async dispatch => {
      try {

    const data = new FormData();
    console.log(newEvent)
    Object.keys(newEvent).forEach(function (key) {
        // console.log(this.state[item]); // value
        data.append(`event[${key}]`, newEvent[key])
        });

        const reqObj = {
          method: 'POST',
          headers: { 
            Authorization: localStorage.getItem(AUTH_TOKEN_NAME)
          },
          body: data
        }

     dispatch({type: CREATE_EVENT})
     const resp = await fetch(EVENTS_INDEX, reqObj)
     const json = await resp.json()
     console.log(json)
     const event = json.event.data.attributes
     dispatch(addHostEvent(event))

    } 
    catch (error) {
      console.error(error)
    } 
  }
}
  