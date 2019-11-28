import React, { Component } from 'react';
import Navbar from './layout/navbar'
import style from './stylesheets/app.css'
import CalendarPage from './calendarPage'
import { connect } from 'react-redux'
import { fetchCurrentUser} from '../store/actions/auth'
import {Route, Switch } from 'react-router-dom'

class App extends Component {

  componentDidMount() {
    this.props.attemptSignIn()
  }

  render() {return (
    <div className="App" style={style}>
      <Navbar />
      <main >
        <Switch >
          <Route path="/calendar"><CalendarPage/> </Route>
        </Switch>
      </main>
    </div>
  );}
}

const mapDispatchToProps = (dispatch) => {
  return { attemptSignIn: () => dispatch(fetchCurrentUser()) };
};

export default connect(null, mapDispatchToProps)(App);
