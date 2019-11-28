import React, { Component } from 'react'
import { login } from '../store/actions/auth'
import { Redirect } from 'react-router-dom'


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

    render() {
        if (this.props.loggedIn) {return <Redirect to='/' /> }  
        
        else { return <form onChange={this.handleChange}>
                <label name="email">Email</label>
                <input name="email" />

                <label name="password">Password</label>
                <input name="password" />
            </form>}
    }

}

const mapStateToProps = state => {
    return {
        loggedIn: !!state.auth.currentUser 
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
      return { attemptLogin: (email, password) => dispatch(login(email,password)) };
    };

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
