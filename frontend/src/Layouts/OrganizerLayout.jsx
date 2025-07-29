import React from "react";
import { Outlet, Link } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/system";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth = 240;

const GradientSidebar = styled("div")({
  height: "100%",
  background: "linear-gradient(145deg, #1e3c72, #2a5298)",
  color: "#fff",
  padding: "16px 0",
  backdropFilter: "blur(8px)",
  boxShadow: "4px 0 15px rgba(0,0,0,0.2)",
});

const StyledListItem = styled(ListItem)({
  borderRadius: "10px",
  margin: "8px",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    transform: "translateX(5px)",
  },
});

const OrganizerLayout = () => {
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/organizer" },
    { text: "Create Events", icon: <EventIcon />, path: "/manage-events" },
    { text: "View Bookings", icon: <BookOnlineIcon />, path: "/view-bookings" },
    { text: "Events", icon: <LocationOnIcon />, path: "/show-events" },
    { text: "Profile", icon: <PersonIcon />, path: "/organizer-profile" },
    { text: "Settings", icon: <SettingsIcon />, path: "/organizer-settings" },
  ];

  const drawer = (
    <GradientSidebar>
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ px: 2 }}>
          EBMS Organizer
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
      <List>
        {menuItems.map((item) => (
          <StyledListItem button key={item.text} component={Link} to={item.path}>
            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} sx={{ color: "white" }} />
          </StyledListItem>
        ))}
      </List>
    </GradientSidebar>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="sidebar"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default OrganizerLayout;
