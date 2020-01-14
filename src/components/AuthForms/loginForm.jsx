import React, { Component } from 'react'
import { login } from '../../store/actions/auth'
import { Redirect } from 'react-router-dom'
import { connect} from 'react-redux'
import Button  from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import style from './authForms.css'


class LoginForm extends Component {

    state = {
        email: "",
        password: ""
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    } 

    handleSubmit = (e) => {
        e.preventDefault()
        const password = e.target.password.value;
        const email = e.target.email.value;
        this.props.attemptLogin(email,password)
        console.log("logged in", this.props.loggedIn)
    }

   

    render() {
        
        if (this.props.loggedIn) {return <Redirect to='/' /> }  
        
        else { return <div className="formContainer"> <form style={style} className="loginForm" onChange={this.handleChange} onSubmit={this.handleSubmit}>
              
                <TextField id="email" label="Email" inputProps={{name: "email"}} required/>

                
                <TextField id="password" label="password" inputProps={{name: "password", type:"password"}} required/>
                <Button type="submit">Login </Button>
            </form> </div>}
    }

}

const mapStateToProps = state => {
    return {
        loggedIn: !!state.Auth.currentUser 
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
      return { attemptLogin: (email, password) => dispatch(login(email,password)) };
    };

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
