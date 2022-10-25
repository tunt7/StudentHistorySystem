import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignIn from "./components/SignIn";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SchoolIcon from '@mui/icons-material/School';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import LogoutIcon from '@mui/icons-material/Logout';

import Homepage from "./components/Homepage";
import Behavior_Points from "./components/Behavior_Points";
import Behavior_PointCreate from "./components/BehaviorPointCreate";
import Activity from "./components/Activity";
import ActivityCreate from "./components/ActivityCreate";
import TCreate from "./components/TCreate";
import Teacher from "./components/TeacherShow";
import Ac_hisCreate from "./components/Ac_hisCreate";
import Activity_His from "./components/AcHis";

import BrCreate from "./components/BranchCreate";
import Branch from "./components/Branch";


import StudentCreate from "./components/StudentCreate";
import Student from "./components/Student";

import { GetCurrentAdmin } from "./services/HttpClientService"
import Activity_His_sum from "./components/Ac_his_sum";

import "./styles.css"

var adminName = "";

const getAdmin = async () => {
  let res = await GetCurrentAdmin();
  adminName = res.Aname;
  if (res) {
    console.log(res);
    console.log(adminName);
  }
};

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
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
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const menu = [
  { name: "หน้าแรก", icon: <HomeIcon />, path: "/" },
  { name: "นักศึกษา", icon: <PeopleIcon />, path: "/StudentShow" },
  { name: "อาจารย์", icon: <Diversity3Icon />, path: "/TeacherShow" },
  { name: "สาขา", icon: <SchoolIcon />, path: "/Branch" },
  { name: "กิจกรรม", icon: <Diversity2Icon />, path: "/Activity" },
  { name: "กิจกรรมของนักศึกษา", icon: <BadgeRoundedIcon />, path: "/Ac_his" },
  { name: "คะแนนวินัย", icon: <ContactPageIcon />, path: "/Behavior_Points" },
];


export default function App() {
  const [token, setToken] = useState<String>("");
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    getAdmin();

    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    };
  }, []);


  if (!token) {
    return <SignIn />;
  }

  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#98A8F8',
      },
      secondary: {
        main: '#FAF7F0',
      },
    },
    // typography: {
    //   fontFamily: {["Prompt"]}
    // }
  });

  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar color="primary" position="absolute" open={open}>
              <Toolbar
                sx={{
                  pr: "24px", // keep right padding when drawer closed
                }}
              >
                <IconButton
                  edge="start"
                  color="secondary"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: "36px",
                    ...(open && { display: "none" }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  component="h1"
                  variant="h6"
                  color="secondary"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                  <div className="good-font-big">
                    ระบบประวัตินักศึกษา
                  </div>
                </Typography>
                <Typography
                  variant="inherit"
                  sx={{ flexGrow: 0.1}}
                >
                  <span className="good-font-white">{adminName}</span><span className="good-font-green"> : กำลังใช้งาน</span>
                </Typography>
                <Button color="secondary" onClick={signout} variant="outlined">
                  <LogoutIcon />
                  <Typography
                    color="#FF6464"
                    variant="button">
                    <div className="good-font">
                      ออกจากระบบ
                    </div>
                  </Typography>
                </Button>
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
              <Toolbar
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  px: [1],
                }}
              >
                <IconButton onClick={toggleDrawer}>
                  <ChevronLeftIcon />
                </IconButton>
              </Toolbar>
              <Divider />
              <List>
                {menu.map((item, index) => (
                  <Link
                    to={item.path}
                    key={item.name}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItem button>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItem>
                  </Link>
                ))}
              </List>
            </Drawer>
            <Box
              component="main"
              sx={{
                backgroundColor: '#FAF7F0',
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
              }}
            >
              <Toolbar />
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/Activity" element={<Activity />} />
                  <Route path="/ActivityCreate" element={<ActivityCreate />} />
                  <Route path="/Ac_his" element={<Activity_His />} />
                  <Route path="/Ac_his_sum" element={<Activity_His_sum />} />
                  <Route path="/Ac_hisCreate" element={<Ac_hisCreate />} />
                  <Route path="/Behavior_points" element={<Behavior_Points />} />
                  <Route path="/Behavior_pointsCreate" element={<Behavior_PointCreate />} />
                  <Route path="/Branch" element={<Branch />} />
                  <Route path="/BranchCreate" element={<BrCreate />} />
                  <Route path="/TeacherShow" element={<Teacher />} />
                  <Route path="/TCreate" element={<TCreate />} />
                  <Route path="/StudentShow" element={<Student />} />
                  <Route path="/StudentCreate" element={<StudentCreate />} />
                </Routes>
              </Container>
            </Box>
          </Box>
        </ThemeProvider>
      </Router>
    </div>
  );

}
