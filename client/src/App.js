import { useState, useEffect, useMemo } from "react";
// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Sidenav from "examples/Sidenav";
import theme from "assets/theme";
import routes from "routes";
import {
  useMaterialUIController,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import brandWhite from "assets/images/logos/logo.png";
import axios from "axiosInstance";
import AuthContext from "authContext";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, direction, layout, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [canRead, setCanRead] = useState(null);
  const [canWrite, setCanWrite] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkAuthentication = () => {
    // if (!localStorage.getItem("jwt")) {
    //   setLoading(false);
    //   return;
    // }
    axios
      .get("auth/isLoggedIn")
      .then((res) => {
        // console.log("checking logged in status");
        console.log(res.data.data);
        setCurrentUser(res.data.data.user);
        setAuthenticated(true);
        setCanRead(
          res.data.data.user.ROLE === "W" || res.data.data.user.ROLE === "R"
        );
        setCanWrite(res.data.data.user.ROLE === "W");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err);
      });
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const updateAuthData = (isAuthenticated, user, read, write) => {
    setCurrentUser(user);
    setAuthenticated(isAuthenticated);
    setCanRead(read);
    setCanWrite(write);
  };

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const signinRoute = routes.find((el) => el.key === "signin");

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        if (!authenticated && route.name !== "Signup")
          return (
            <Route
              exact
              path={signinRoute.route}
              element={signinRoute.component}
              key={signinRoute.key}
            />
          );
        else
          return (
            <Route
              exact
              path={route.route}
              element={route.component}
              key={route.key}
            />
          );
      }

      return null;
    });

  const navbarRoutes = routes.filter(
    (el) =>
      !(
        el.key === "signup" ||
        el.key === "signin" ||
        el.key === "book" ||
        (!canRead && el.key === "admin")
      )
  );

  return (
    <AuthContext.Provider
      value={{
        authenticated: authenticated,
        currentUser: currentUser,
        canRead: canRead,
        canWrite: canWrite,
        updateAuthData: updateAuthData,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {layout === "dashboard" && (
          <Sidenav
            color={sidenavColor}
            brand={brandWhite}
            brandName="Monke Airlines"
            routes={navbarRoutes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            type="collapse"
          />
        )}
        <Routes>
          {getRoutes(routes)}
          <Route
            path="*"
            element={
              authenticated ? (
                <Navigate to="/searchFlights" />
              ) : (
                <Navigate to="/authentication/sign-in" />
              )
            }
          />
        </Routes>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}
