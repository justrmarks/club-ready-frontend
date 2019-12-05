import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect} from 'react-redux'
import Datetime from 'react-datetime'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField'
import dateTimeStyle from 'react-datetime/css/react-datetime.css'
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button'
import moment from 'moment'

import ImageFieldCropper from '../Util/ImageFieldCropper'

import style from './EventCreateForm.css'
import { createEvent} from '../../store/actions/event'



class EventCreateForm extends Component {

    state = {
        title: "",
        description: "",
        start_time: new Date(),
        end_time: new Date(),
        location: "",
        bathrooms: "no_bathrooms",
        water: "no_water",
        mobility: "inaccessible",
        flashing_lights: true,
        picture_file: null
    }

    setPicture = (pictureFile) => {
        this.setState({
            picture_file: pictureFile
        })
    }

    handleChange = (e) => {
        const { checked, value, name } = e.target
        if (e.target.type === 'checkbox') {
            this.setState({
                [name]: checked
            })
        }

        else if (e.target.type != 'file') {
        this.setState({
            [name]: value
        }) }
    } 

    handleStartDateChange = (moment) => {
            this.setState({
                start_time: moment
        })}

    handleEndDateChange = (moment) => {
        this.setState({
            end_time: moment
        })
    }
    
    handleCheckboxChange = (e) => {
        const {checked, name} = e.target
        this.setState({
            [name]: checked
        })
    }


    handleSubmit = (e) => {
        e.preventDefault()
        const newEvent = this.state
        console.log(newEvent)
        if (moment.isMoment(newEvent.start_time)) {
        newEvent.start_time = newEvent.start_time.format() }
        if (moment.isMoment(newEvent.end_time)) {
        newEvent.end_time = newEvent.end_time.format() }
        console.log(newEvent)
        this.props.createEvent(newEvent)
        setTimeout(()=>this.props.history.push('/events/hosting'), 1000)
    }

    renderDateTimeInput = (props)=> {
       return (<TextField inputProps={{...props}} label={props.label} />) 
    }

    render() {
        if (!this.props.validUser) {
            console.log("valid user",this.props.validUser)
            return <Redirect to='/calendar' /> }  
        
        else { return <div className="eventCreatePage"> <form onChange={this.handleChange} onSubmit={this.handleSubmit} className="eventCreateForm" style={style}>
            <h2> Add an event to the calendar </h2>

                <div className="eventGeneralInfo">
                    <h3> General info</h3>
                    <TextField id="title" label="Title" inputProps={{name: "title"}} required/>
                    <TextField id="location" label="Location" inputProps={{name:"location"}} helperText="Enter an address, email for contact, or TBA" required />
                    <TextField id="description" label="Description" inputProps={{name:"description"}} multiline fullWidth rows="8" variant="outlined" required/>
                </div>
            
                <div className="datePicker" style={dateTimeStyle}>

                    <Datetime value={this.state.start_time} renderInput={this.renderDateTimeInput} onChange={this.handleStartDateChange} inputProps={{name: "start_time", label: "Start Time"}}/>
                    <Datetime value={this.state.end_time} renderInput={this.renderDateTimeInput} onChange={this.handleEndDateChange} inputProps={{name: "end_time", label: "End Time"}}/>
                </div>

            <h3>Accessiblity</h3>
                <div className="accessiblitySelect">
                
                    <FormControl className="selectComponent">
                        <Select
                        required
                        labelId="bathroom-select"
                        inputProps={{name: "bathrooms"}}
                        value={this.state.bathrooms}
                        onChange={this.handleChange}
                        >
                            <MenuItem value={"no_bathrooms"}>No bathrooms</MenuItem>
                            <MenuItem value={"portos"}>Porto-potties</MenuItem>
                            <MenuItem value={"single_stalls"}>Single stalls</MenuItem>
                            <MenuItem value={"gendered_bathrooms"}>Gendered Bathrooms only</MenuItem>
                            <MenuItem value={"all_gender"}>All Gender bathrooms</MenuItem>
                        </Select>
                        <FormHelperText>What's the bathroom situation?</FormHelperText>
                    </FormControl>

                    <FormControl className="selectComponent">
                        <Select
                        required
                        labelId="water-select"
                        inputProps={{name: "water"}}
                        value={this.state.water}
                        onChange={this.handleChange}
                        >
                            <MenuItem value={"no_water"}>No water</MenuItem>
                            <MenuItem value={"water_for_sale"}>Water for sale</MenuItem>
                            <MenuItem value={"free_water"}>Free Water</MenuItem>
                        </Select>
                        <FormHelperText>Is there water?</FormHelperText>
                    </FormControl>
                    <FormControl className="selectComponent">
                        <Select
                        required
                        labelId="mobility-select"
                        inputProps={{name: "mobility"}}
                        value={this.state.mobility}
                        onChange={this.handleChange}
                        >
                            <MenuItem value={"inaccessible"}>Not an accessibile space</MenuItem>
                            <MenuItem value={"partially_accessible"}>Partially accessible</MenuItem>
                            <MenuItem value={"wheelchair_accessible"}>Wheelchair accessibile</MenuItem>
                        </Select>
                        <FormHelperText>Is the space accessible for wheelchair users and others with disabilities?</FormHelperText>
                    </FormControl>

                    <FormControl className="selectComponent">
                        <FormControlLabel
                        control={<Checkbox color="primary" checked={this.state.flashing_lights} onChange={this.handleChange} inputProps={{name: 'flashing_lights'}} />}
                        label="Flashing lights?"
                        value="flashing_lights"
                        labelPlacement="end"
                        />
                    </FormControl>


                </div>
            <h3>Upload an image</h3>
                <ImageFieldCropper className="ImageField"fileInputName="picture_file" setPicture={this.setPicture} />

                <Button style={{margin: '20px'}}variant="contained" type="submit">Create Event</Button>
            </form> </div>}
    }

}

const mapStateToProps = state => {
    const { currentUser, requesting } = state.Auth 

    const valid = currentUser ? currentUser.role === "organizer" || currentUser.role === "admin": requesting 
    return {
        validUser: valid
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        createEvent: (event) => dispatch(createEvent(event))
    }
}
  
//   const mapDispatchToProps = (dispatch) => {
//       return { attemptLogin: (email, password) => dispatch(login(email,password)) };
//     };

export default connect(mapStateToProps, mapDispatchToProps)(EventCreateForm)
