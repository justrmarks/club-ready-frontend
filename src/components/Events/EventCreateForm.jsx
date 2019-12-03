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

import ImageFieldCropper from '../Util/ImageFieldCropper'

import style from './EventCreateForm.css'



class EventCreateForm extends Component {

    state = {
        title: "",
        description: "",
        start_time: new Date(),
        end_time: new Date(),
        location: "",
        bathrooms: 0,
        water: 0,
        mobility: 0,
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
        console.log(e.target)
        if (e.target.type === 'checkbox') {
            this.setState({
                [name]: checked
            })
        }

        else if (e.target.type != 'file') {
        this.setState({
            [name]: value
        }) }

        console.log(this.state)
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

        // const data = new FormData();
        // const request = new XMLHttpRequest();
        // Object.keys(this.state).forEach(function (key) {
        //     // console.log(this.state[item]); // value
        // data.append(`event[${key}]`, this.state[key])
        // });

        // request.responseType = 'json';
        

        
    }

    renderDateTimeInput = (props)=> {
       return (<TextField inputProps={{...props}} label={props.label} />) 
    }

    render() {
        if (!this.props.validUser) {
            console.log("valid user",this.props.validUser)
            return <Redirect to='/calendar' /> }  
        
        else { return <form onChange={this.handleChange} onSubmit={this.handleSubmit} className="eventCreateForm" style={style}>
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
                            <MenuItem value={0}>No bathrooms</MenuItem>
                            <MenuItem value={1}>Porto-potties</MenuItem>
                            <MenuItem value={2}>Single stalls</MenuItem>
                            <MenuItem value={3}>Gendered Bathrooms only</MenuItem>
                            <MenuItem value={4}>All Gender bathrooms</MenuItem>
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
                            <MenuItem value={0}>No water</MenuItem>
                            <MenuItem value={1}>Water for sale</MenuItem>
                            <MenuItem value={2}>Free Water</MenuItem>
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
                            <MenuItem value={0}>Not an accessibile space</MenuItem>
                            <MenuItem value={1}>Partially accessible</MenuItem>
                            <MenuItem value={2}>Wheelchair </MenuItem>
                        </Select>
                        <FormHelperText>Is the space accessible for wheelchair users and others with disabilities?</FormHelperText>
                    </FormControl>

                    <FormControl className="selectComponent">
                        <FormControlLabel
                        control={<Checkbox color="primary" onChange={this.handleChange} inputProps={{name: 'flashing_lights'}} />}
                        label="Flashing lights?"
                        value="flashing_lights"
                        labelPlacement="end"
                        />
                    </FormControl>


                </div>
            <h3>Upload an image</h3>
                <ImageFieldCropper className="ImageField"fileInputName="picture_file" setPicture={this.setPicture} />

                <Button style={{margin: '20px'}}variant="contained" type="submit">Create Event</Button>
            </form>}
    }

}

const mapStateToProps = state => {
    const { currentUser, requesting } = state.Auth 

    const valid = currentUser ? currentUser.role === "organizer" || currentUser.role === "admin": requesting 
    return {
        validUser: valid
    };
  };
  
//   const mapDispatchToProps = (dispatch) => {
//       return { attemptLogin: (email, password) => dispatch(login(email,password)) };
//     };

export default connect(mapStateToProps)(EventCreateForm)
