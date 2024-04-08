import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,

  ListItemText,
  Typography,
  CssBaseline,
  Box,
  ListItemIcon,
  IconButton,
  ListItemButton,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { isDrawerClose } from "../../utils/signals";
import SiteSnackbar from "../../components/snackbar";
import { useSignals } from "@preact/signals-react/runtime";

const drawerWidth = 240;

const DashboardLayout: React.FC = () => {
  useSignals();
  const drawerItems = [
    { text: "Recipes", icon: <MenuBookIcon /> },
    { text: "Categories", icon: <CategoryIcon /> },
    { text: "Tags", icon: <LocalOfferIcon /> },
  ];

  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    isDrawerClose.value = false;
    setOpen(true);
  };
  const handleDrawerClose = () => {
    isDrawerClose.value = true;
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap fontWeight={600}>
            Gustus CMS
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : (theme) => theme.spacing(7) + 1,
          flexShrink: 0,
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          ...(open && {
            width: drawerWidth,
            [`& .MuiDrawer-paper`]: { width: drawerWidth },
          }),
          ...(!open && {
            [`& .MuiDrawer-paper`]: { width: (theme) => theme.spacing(7) + 1 },
          }),
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {drawerItems.map((item) => (
              <ListItemButton
                key={item.text}
                component={Link}
                to={`/dashboard/${item.text.toLowerCase()}`}
              >
                <ListItemIcon sx={{ display: "flex", justifyContent: "center"}}>{item.icon}</ListItemIcon>
                {open && <ListItemText primary={item.text} />}
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "rgb(245, 245, 245)",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
      <SiteSnackbar />
    </Box>
  );
};

export default DashboardLayout;
