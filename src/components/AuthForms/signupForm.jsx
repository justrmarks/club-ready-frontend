import React, { Component } from 'react'
import { signup } from '../../store/actions/auth'
import { Redirect } from 'react-router-dom'
import { connect} from 'react-redux'
import Button  from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import style from './authForms.css'


class SignupForm extends Component {


    state = {
        email: "",
        name: "",
        password: "",
        passwordConfirm: "",
        passwordErrors: []
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })

        // validations 
        if (this.state.password != this.state.passwordConfirm) {
            this.setState((prevState) => {
                return {
                passwordErrors: [...prevState.passwordErrors, "Passwords do not match"]
                }
            })
        }
        else {
            this.setState({
                passwordErrors: []
            })
        }


    } 

     handleSubmit = async (e) => {
        e.preventDefault()
        if (this.state.passwordErrors.length < 1) {
            this.props.attemptSignup(this.state)
        }
        
    }

   

    render() {
        
        if (this.props.loggedIn) {return <Redirect to='/' /> }  
        
        else { return <div className="formContainer"> <form style={style} className="authForm" onChange={this.handleChange} onSubmit={this.handleSubmit}>

                { /* user  info fields */ }
                <TextField id="email" label="Email" inputProps={{name: "email"}} required/>
                <TextField id="name" label="name" inputProps={{name: "name"}} required/>

                {/* password fields */ }
                <TextField id="password" label="password" inputProps={{name: "password", type:"password"}} required {this.state.passwordErrors.length > 0 ? "error" : this.state.passwordErrors.join("\n")}/>
                <TextField id="passwordConfirm" label="Confirm Password" inputProps={{name: "passwordConfirm", type:"password"}} required {this.state.passwordErrors.length > 0 ? `error helperText=${this.state.passwordErrors[0]}` : ""} />
                <Button type="submit">Signup </Button>
            </form> </div>}
    }

}

const mapStateToProps = state => {
    return {
        loggedIn: !!state.Auth.currentUser 
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
      return { attemptSignup: (user) => dispatch(signup(user.email, user.password, user.name)) };
    };

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)
