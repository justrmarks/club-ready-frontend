import React from 'react';
import { NavLink} from 'react-router-dom'

function Navbar(props) {
    const style = {
        // position: 'fixed',
        top: 0,
        backgroundColor: 'var(--bright-pink)',
        margin: 0,
        padding: '15px'
    }
    
  return (
    <nav style={style}>
        <h1> Navbar</h1>
        <ul>
          <NavLink to="/calendar" className="navLink" activeClassName="activeNavLink">Calendar </NavLink>
          <NavLink exact to='/' className="navLink" activeClassName="activeNavLink"> Feed </NavLink>
        </ul>
    </nav>
  );
}

export default Navbar;
