import React, { Component } from 'react';
import Navbar from './layout/navbar'
import style from './stylesheets/app.css'
import CalendarPage from './calendarPage'
import { connect } from 'react-redux'
import { fetchCurrentUser} from '../store/actions/auth'
import {Route, Switch } from 'react-router-dom'
import LoginForm from './loginForm'
import EventCreateForm from './Events/EventCreateForm'
import EventShowPage from './Events/EventShowPage'

class App extends Component {

  componentDidMount() {
    this.props.attemptSignIn()
  }

  render() {return (
    <div className="App" style={style}>
      <Navbar />
      <main className="ActivePage">
        <Switch >
          <Route path="/calendar"><CalendarPage/> </Route>
          <Route path="/login"><LoginForm/> </Route>
          <Route path="/events/new"><EventCreateForm/> </Route>
          <Route path="/events/:id" render={routeProps => (
          <EventShowPage {...routeProps} />)} />
        
        </Switch>
      </main>
    </div>
  );}
}

const mapDispatchToProps = (dispatch) => {
  return { attemptSignIn: () => dispatch(fetchCurrentUser()) };
};

export default connect(null, mapDispatchToProps)(App);
