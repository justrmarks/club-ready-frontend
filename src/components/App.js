import React, { Component } from 'react';
import Navbar from './layout/navbar'
import style from './stylesheets/app.css'
import CalendarPage from './calendarPage'
import { connect } from 'react-redux'
import { fetchCurrentUser} from '../store/actions/auth'
import {Route, Switch } from 'react-router-dom'
import LoginForm from './AuthForms/loginForm'
import EventCreateForm from './Events/EventCreateForm'
import EventShowPage from './Events/EventShowPage'
import EventListPage from './Events/EventListPage'

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
          <Route exact path="/login"><LoginForm/> </Route>
          <Route exact path="/events/new" component={EventCreateForm} /> 
          <Route exact path="/events/attending"> <EventListPage events={this.props.attending}/></Route>
          <Route exact path="/events/hosting"  > <EventListPage events={this.props.hosting}/> </Route>
          <Route exact path="/events/:id" render={routeProps => (
          <EventShowPage {...routeProps} />)} />
        
        </Switch>
      </main>
    </div>
  );}
}

const mapStateToProps = (state) => {
  return {
    hosting: state.Event.hosting,
    attending: state.Event.attending
  }
}

const mapDispatchToProps = (dispatch) => {
  return { attemptSignIn: () => dispatch(fetchCurrentUser()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
