import './dashboard.css';
import './leftbar.css';

import DashboardIcon from '@mui/icons-material/Dashboard';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';

import AddMovie from './AddMovie';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Dashboard() {
  const [open, setOpen] = React.useState(
    window.screen.availWidth < "730" ? false : true
  );

  const [openL1, setOpenL1] = React.useState(false);
  const [openL2, setopenL2] = React.useState(false);

  const [openL3, setopenL3] = React.useState(false);

  const navigate = useNavigate();
  return (
    <Box sx={{ display: "-webkit-box" }}>
      <CssBaseline />
      <AppBar className="Mui-Header-Custom" position="fixed" open={open}>
        <Toolbar
          className="header-tab"
          style={{
            margin: open && "10px 24px 0 24px",
          }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              setOpen(!open);
            }}
            edge="start"
            sx={{
              marginRight: 5,
            }}>
            <MenuIcon style={{ color: "#000" }} />
          </IconButton>
          <MenuItem
            style={{ color: "rgba(0, 0, 0, 0.54)" }}
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" style={{ border: "none" }} open={open}>
        <DrawerHeader>
          <div className="topLeft">
            {/* <img src={logo} alt="" className="logo" width="140" height="60" /> */}
          </div>
        </DrawerHeader>
        <List style={{ marginTop: "1rem" }}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <NavLink
              to=""
              // style={{ backgroundColor: "#fff!important" }}
              className="nav-links">
              <ListItemButton
                style={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                }}
                className="left-menue-list-button">
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1 : "auto",
                    justifyContent: "center",
                  }}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Dashboard"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>
        </List>
        {/* 
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <NavLink to="download" className="nav-links">
              <ListItemButton
                style={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                }}
                className="left-menue-list-button">
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1 : "auto",
                    justifyContent: "center",
                  }}>
                  <SaveAltIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Get CSV"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>
        </List> */}

        <Divider style={{ margin: "0.5rem 0 1rem 0" }} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<AddMovie />} />
        </Routes>
      </Box>
    </Box>
  );
}
