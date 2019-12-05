//// component to handle fetches for event attendance 
import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {toggleAttendance} from '../../store/actions/event'


// props = { event, }
const GoingButton = ( props ) => {
const {attending} = props
const color = attending ? 'yellow' : undefined

    return (
    <Button icon labelPosition='left' color={color} onClick={()=>props.toggleGoing(attending)}>
      <Icon name='check' />
      Going
    </Button>
    )

}

const mapStateToProps = (state, ownProps) => {
  return {
    attending: state.Event.attending.map(event=> event.id).includes(ownProps.event.id)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleGoing: (attending) => dispatch(toggleAttendance(ownProps.event, attending)) 
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(GoingButton)