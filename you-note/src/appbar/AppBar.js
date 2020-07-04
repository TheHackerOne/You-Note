import React, { useState } from 'react';
import { MoreVert } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Menu, MenuItem, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import { useAuth } from '../auth/auth';

const CustomAppBar = () => {

  const [shouldOpenMenu, setOpenMenu] = useState(false)
  const [menuAnchor, setMenuAnchor] = useState(null)

  const { setUsername, username, setAuthToken } = useAuth();

  const closeMenu = () => {
    setOpenMenu(false);
  }

  const openMenu = (e) => {
    setOpenMenu(true);
    setMenuAnchor(e.currentTarget);
  }

  const logout = () => {
    setUsername();
    setAuthToken();
    closeMenu();
  }

  return (
    <AppBar position="static">
      { username ? 
      <Menu
        id="simple-menu"
        anchorEl={menuAnchor}
        keepMounted
        open={shouldOpenMenu}
        onClose={() => closeMenu()}
      >
        <MenuItem onClick={() => closeMenu()}><Link to="/">Home</Link></MenuItem>
        <MenuItem onClick={() => logout()}>Logout</MenuItem>
      </Menu> : null }
      <Toolbar>
        { username ? 
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={e => openMenu(e)}>
          <MoreVert />
        </IconButton> : null }
        <Typography variant="h6">
          YouNote
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default CustomAppBar;