import React from 'react';
import { Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import "../../styles/Sidebar.css";  // Adjust the import to go up one folder level

const Sidebar = () => {
  return (
    <Box className="sidebar">
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider className="sidebar-divider" />
        <ListItem button component={Link} to="/profile">
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button component={Link} to="/settings">
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button component={Link} to="/donations">
          <ListItemText primary="Donations" />
        </ListItem>
        <ListItem button component={Link} to="/campaigns">
          <ListItemText primary="Campaigns" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
