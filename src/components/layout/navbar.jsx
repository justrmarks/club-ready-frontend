import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/auth'
import Button from '@material-ui/core/Button'
import DropdownMenu from './dropdownMenu'
import {fetchAttendingEvents} from '../../store/actions/event'
import {fetchHostEvents} from '../../store/actions/event'


class Navbar extends Component {

  componentDidMount() {
    this.props.getAttendingEvents();
    this.props.fetchHosting();
  }

  render() {
    const props = this.props
    const attendingEventLinks = props.attendingEvents.map(event=> <Link key={event.id} to={`/events/${event.id}`}>{event.title}</Link>)
    const hostEventLinks = props.hostEvents.map(event=> <Link key={event.id} to={`/events/${event.id}`}>{event.title}</Link> )
  
  return (
    <nav className="navBar">
        <h1 className="header"> Club Ready</h1>
        
        <ul className="navLinkList">
          <NavLink to="/calendar" className="navLink" activeClassName="activeNavLink"><Button> Calendar </Button> </NavLink>
          <NavLink exact to='/' className="navLink" activeClassName="activeNavLink"> <Button> Feed </Button> </NavLink>
          <NavLink to='/events/attending' className="navLink" activeClassName="activeNavLink"> <Button> Attending Events </Button> </NavLink>
          {props.currentUser && props.currentUser.role == 'organizer' ? <> <NavLink to="/events/hosting" activeClassName="activeNavLink"> <Button>Hosting Events</Button></NavLink> <NavLink to="/events/new"> <Button>Add Events</Button></NavLink> </>: <></>}
        </ul>

        <div className="navAuth">
          {props.currentUser ? <> <NavLink to="/profile" activeClassName="activeNavLink"> {this.props.currentUser.name } </NavLink> <Button onClick={props.attemptLogout}>Logout</Button> </> : <Link to="/login"> <Button>Login</Button> </Link>}
        </div>
        
    </nav>
  );
}
}



const mapStateToProps = (state) => {
  return {
    currentUser: state.Auth.currentUser,
    attendingEvents: state.Event.attending,
    hostEvents: state.Event.hosting
  }
}

const mapDispatchToProps = (dispatch) => {
  return { attemptLogout: () => dispatch(logout()),
          getAttendingEvents: ()=> dispatch(fetchAttendingEvents()),
          fetchHosting: () => dispatch(fetchHostEvents())
        };
          
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
