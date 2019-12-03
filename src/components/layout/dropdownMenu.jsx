import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

class DropdownMenu extends Component {
  
    state = {
        anchorEl: null
    }

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
      };
    
    handleClose = () => {
        this.setState({anchorEl:null});
      };
    
  render() {
      const menuItems = this.props.children.map((child, index)=> <MenuItem key={index} onClick={this.handleClose}> {child} </MenuItem>)


  return ( <ClickAwayListener onClickAway={this.handleClose}>
      <div className="dropdownMenu"> 
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
        {this.props.name}
      </Button>
      <Menu
       id="simple-menu"
       anchorEl={this.state.anchorEl}
       keepMounted
       open={Boolean(this.state.anchorEl)}
       onClose={this.handleClose}
      >
        {menuItems}
      </Menu>
      </div>
    </ClickAwayListener>
  );}

  
}

export default DropdownMenu;