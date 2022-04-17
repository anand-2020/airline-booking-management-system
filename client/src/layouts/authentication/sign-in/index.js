/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useContext } from "react";

// react-router-dom components
import { Link, Navigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import axios from "axiosInstance";
import AuthContext from "authContext";
import Spinner from "components/Spinner";

function Basic() {
  const [emailVal, setEmailVal] = useState("");
  const [passVal, setPassVal] = useState("");
  const { authenticated, updateAuthData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    axios
      .post(`auth/login`, {
        email: emailVal,
        password: passVal,
      })
      .then((res) => {
        // console.log(res);
        localStorage.setItem("jwt", res.data.token);
        updateAuthData(
          true,
          res.data.data.user,
          res.data.data.user.ROLE === "W" || res.data.data.user.ROLE === "R",
          res.data.data.user.ROLE === "W"
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      {authenticated === false ? (
        <BasicLayout image={bgImage}>
          <Card>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              mx={2}
              mt={-3}
              p={2}
              mb={1}
              textAlign="center"
            >
              <MDTypography
                variant="h4"
                fontWeight="medium"
                color="white"
                mt={1}
              >
                Sign in
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <MDInput
                    type="email"
                    label="Email"
                    fullWidth
                    value={emailVal}
                    onChange={(e) => setEmailVal(e.target.value)}
                    error={
                      !emailVal.match(
                        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
                      )
                    }
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    type="password"
                    label="Password"
                    fullWidth
                    value={passVal}
                    onChange={(e) => setPassVal(e.target.value)}
                    error={passVal.length < 4}
                  />
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton
                    variant="gradient"
                    color={loading ? "disabled" : "info"}
                    disabled={loading}
                    fullWidth
                    onClick={handleSignIn}
                  >
                    {loading ? <Spinner color="dark" size={30} /> : "sign in"}
                  </MDButton>
                </MDBox>
                <MDBox mt={3} mb={1} textAlign="center">
                  <MDTypography variant="button" color="text">
                    Don&apos;t have an account?{" "}
                    <MDTypography
                      component={Link}
                      to="/authentication/sign-up"
                      variant="button"
                      color="info"
                      fontWeight="medium"
                      textGradient
                    >
                      Sign up
                    </MDTypography>
                  </MDTypography>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        </BasicLayout>
      ) : (
        <Navigate replace to="/searchFlights" />
      )}
    </>
  );
}

export default Basic;
