import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/sign-in/5.jpg";
import axios from "axiosInstance";
import AuthContext from "authContext";
import Spinner from "components/Spinner";

function Basic() {
  const [emailVal, setEmailVal] = useState("");
  const [passVal, setPassVal] = useState("");
  const { authenticated, updateAuthData, currentUser, canRead, canWrite } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const shouldDisable = () => {
    return !(
      emailVal.length !== "" &&
      passVal.length >= 4 &&
      emailVal.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    );
  };

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
        // console.log(
        //   res.data.data.user,
        //   res.data.data.user.ROLE === "W" || res.data.data.user.ROLE === "R",
        //   res.data.data.user.ROLE === "W"
        // );
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
          <Card sx={{ width: { lg: "30vw", md: "60vw" } }}>
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
                    // error={
                    //   !emailVal.match(
                    //     /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
                    //   )
                    // }
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    type="password"
                    label="Password"
                    fullWidth
                    value={passVal}
                    onChange={(e) => setPassVal(e.target.value)}
                    // error={passVal.length < 4}
                  />
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton
                    variant="gradient"
                    color={loading ? "disabled" : "info"}
                    disabled={loading}
                    fullWidth
                    onClick={handleSignIn}
                    disabled={shouldDisable()}
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
