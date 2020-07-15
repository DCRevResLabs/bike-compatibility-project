import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import { NavLink, useLocation } from "react-router-dom";
import { useStoreContext } from "../utils/UserState";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import HomeIcon from "@material-ui/icons/Home";
import API from "../utils/API";
import { logout } from "../utils/auth";
import { LOGOUT_ACTION } from "../utils/actions";
import { useHistory } from "react-router-dom";

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;
//   const location = useLocation();
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "fixed",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "100vh",
  },
  tabs: {
    borderRight: `3px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const history = useHistory();
  const [state, dispatch] = useStoreContext();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  function logout(event) {
    event.preventDefault();
    console.log(event);
    API.logoutAPI();
    dispatch({ type: LOGOUT_ACTION });
    history.push("/");
  }

  const signinMenu = () => {
    if (state.user.role === "admin") {
      return (
        <>
          <NavLink
            to="/home"
            activeStyle={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            <Tab label="Home" />
          </NavLink>
          <NavLink
            to="/about"
            activeStyle={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            <Tab label="About"></Tab>
          </NavLink>
          <NavLink
            to="/components"
            activeStyle={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            <Tab label="Component Database" />
          </NavLink>
          <NavLink
            to="/add_component"
            activeStyle={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            <Tab label="Add a Component" />
          </NavLink>
          <NavLink
            to="/edit_component"
            activeStyle={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            <Tab label="Edit a Component" />
          </NavLink>
          <NavLink
            to="/account"
            activeStyle={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            <Tab label="Account" />
          </NavLink>
          <Tab label="Logout" onClick={logout} />
        </>
      );
    } else if (state.user.role === "user") {
      return (
        <>
          <NavLink
            to="/home"
            activeStyle={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            <Tab label="Home" />
          </NavLink>
          <NavLink
            to="/about"
            activeStyle={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            <Tab label="About"></Tab>
          </NavLink>
          <NavLink
            to="/components"
            activeStyle={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            <Tab label="Component Database" />
          </NavLink>
          <NavLink
            to="/account"
            activeStyle={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            <Tab label="Account" />
          </NavLink>
          <Tab label="Logout" onClick={logout} />
        </>
      );
    } else {
      return (
        <>
          <NavLink
            to="/home"
            activeStyle={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            <Tab label="Home" />
          </NavLink>
          <NavLink
            to="/about"
            activeStyle={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            <Tab label="About"></Tab>
          </NavLink>
          <NavLink
            to="/signin"
            activeStyle={{
              fontWeight: "bold",
              color: "red",
              indicatorStyle: "",
            }}
          >
            <Tab label="SignIn" />
          </NavLink>
        </>
      );
    }
  };

  return (
    <div className={classes.root}>
      <Tabs
        TabIndicatorProps={{
          style: {
            height: "0px",
          },
        }}
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Menu tabs"
        className={classes.tabs}
      >
        {signinMenu()}
      </Tabs>
    </div>
  );
}
