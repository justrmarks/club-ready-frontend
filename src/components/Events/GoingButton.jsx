//// component to handle fetches for event attendance 
import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {toggleAttendance} from '../../store/actions/event'


// props = { event, }
const GoingButton = ( props ) => {
const {event} = props
const attending = event.attending
const color = attending ? 'yellow' : undefined

    return (
    <Button icon labelPosition='left' color={color} onClick={props.toggleGoing}>
      <Icon name='check' />
      Going
    </Button>
    )

}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleGoing: () => dispatch(toggleAttendance(ownProps.event)) 
  }
}

export default connect(null,mapDispatchToProps)(GoingButton)