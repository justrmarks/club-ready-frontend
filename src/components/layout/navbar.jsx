import React from 'react';
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/auth'
import Button from '@material-ui/core/Button'
import DropdownMenu from './dropdownMenu'


function Navbar(props) {
    const style = {
        // position: 'fixed',
        // clear: 'both',
        
       
    }
    
  const attendingEventLinks = props.attendingEvents.map(event=> <Link key={event.id} to={`events/${event.id}`}>{event.title}</Link> )
  return (
    <nav className="navBar">
        <h1 className="header"> Club Ready</h1>
        <ul className="navLinkList">
          <NavLink to="/calendar" className="navLink" activeClassName="activeNavLink"><Button> Calendar </Button> </NavLink>
          <NavLink exact to='/' className="navLink" activeClassName="activeNavLink"> <Button> Feed </Button> </NavLink>
  <DropdownMenu className="navLink" name="Attending Events" >{attendingEventLinks}   </DropdownMenu>
        </ul>
        <div className="navAuth">
          {props.currentUser ? <> <NavLink to="/profile"> {props.currentUser.name } </NavLink> <Button onClick={props.attemptLogout}>Logout</Button> </> : <Link to="/login"> <Button>Login</Button> </Link>}
        </div>
        
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.Auth.currentUser,
    attendingEvents: state.Event.all
  }
}

const mapDispatchToProps = (dispatch) => {
  return { attemptLogout: () => dispatch(logout()),
          /* fetchAttendingEvents: ()=> dispatch(getAttendingEvents()) */ };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
