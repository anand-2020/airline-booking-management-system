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

// react-router-dom components
import { Link, Navigate } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
// @mui material components
import {
  Button,
  Grid,
  Box,
  Container,
  MenuItem,
  CssBaseline,
  Card,
  TextField,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import CountryCode from "layouts/form/data/countryCode.js";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axiosInstance";
import AuthContext from "authContext";
import Spinner from "components/Spinner";

function Cover() {
  const [gender, setGender] = React.useState();
  const [countryCode, setCountryCode] = React.useState();
  const [dateValue, setDateValue] = React.useState();
  const [emailVal, setEmailVal] = useState("");
  const [passVal, setPassVal] = useState("");
  const [nameVal, setNameVal] = useState("");
  const [usernameVal, setUsernameVal] = useState("");
  const [addressVal, setAddressVal] = useState("");
  const [professionVal, setProfessionVal] = useState("Other");
  const [roleVal, setRoleVal] = useState("");
  const [phoneVal, setPhoneVal] = useState("");
  const { authenticated, updateAuthData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  const handleSignUp = () => {
    setLoading(true);
    axios
      .post(`auth/signup`, {
        CUSTOMER_ID: usernameVal,
        CNAME: nameVal,
        EMAIL_ID: emailVal,
        PASSWORD: passVal,
        GENDER: gender,
        DOB: dateValue,
        ROLE: "W",
        PROFESSION: professionVal,
        COUNTRY_CODE: countryCode,
        PHONE_NO: phoneVal,
        ADDRESS: addressVal,
      })
      .then((res) => {
        // console.log(res.data);
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

  const handleDateChange = (newDate) => {
    setDateValue(newDate);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };

  const handleSubmit = () => {};

  return (
    <>
      {authenticated === false ? (
        <BasicLayout image={bgImage}>
          <Card sx={{ marginTop: 8 }}>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
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
                Sign Up
              </MDTypography>
            </MDBox>
            <Box pt={4} pb={0} px={3}>
              <Box component="form" role="form">
                <Grid
                  container
                  spacing={2}
                  sx={{ maxHeight: "35vh", overflowY: "scroll" }}
                >
                  <Grid item xs={12} sm={6}>
                    <MDInput
                      // autoComplete="given-name"
                      name="username"
                      required
                      fullWidth
                      id="name"
                      label="Username"
                      autoFocus
                      value={usernameVal}
                      onChange={(e) => setUsernameVal(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MDInput
                      // autoComplete="given-name"
                      name="password"
                      required
                      fullWidth
                      id="name"
                      label="Password"
                      type="password"
                      value={passVal}
                      onChange={(e) => setPassVal(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      autoComplete="given-name"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="Full Name"
                      value={nameVal}
                      onChange={(e) => setNameVal(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MDInput
                      fullWidth
                      id="gender"
                      select
                      SelectProps={{ native: true }}
                      label="Gender"
                      value={gender}
                      onChange={handleGenderChange}
                    >
                      {[
                        { value: "M", label: "Male" },
                        { value: "F", label: "Female" },
                        { value: "O", label: "Others" },
                      ].map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </MDInput>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        // label="Date of Journey"
                        inputFormat="dd/MM/yyyy"
                        value={dateValue}
                        onChange={handleDateChange}
                        maxDate={new Date()}
                        // defaultValue={dateValue}
                        label="Birth Date"
                        id="dob"
                        name="dob"
                        // fullWidth
                        renderInput={(params) => (
                          <MDInput fullWidth required {...params} />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={emailVal}
                      onChange={(e) => setEmailVal(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      name="countryCode"
                      required
                      fullWidth
                      select
                      id="CountryCode"
                      label="Country Code"
                      value={countryCode}
                      SelectProps={{ native: true }}
                      onChange={handleCountryCodeChange}
                    >
                      {CountryCode.map((option, idx) => (
                        <option key={idx} value={option.dial_code}>
                          {option.name}
                        </option>
                      ))}
                    </MDInput>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <MDInput
                      name="contactNo"
                      required
                      fullWidth
                      id="contactNo"
                      label="Contact Number"
                      value={phoneVal}
                      onChange={(e) => setPhoneVal(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <MDInput
                      multiline
                      required
                      fullWidth
                      name="address"
                      label="Address"
                      id="address"
                      value={addressVal}
                      onChange={(e) => setAddressVal(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <MDInput
                      fullWidth
                      select
                      SelectProps={{ native: true }}
                      label="Profession"
                      value={professionVal}
                      onChange={(e) => setProfessionVal(e.target.value)}
                    >
                      {[
                        { value: "OTHER", label: "Other" },
                        { value: "STUDENT", label: "Student" },
                        { value: "ARMYPERSONNEL", label: "Army Personnel" },
                        { value: "SENIORCITIZEN", label: "Senior Citizen" },
                      ].map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </MDInput>
                  </Grid>
                </Grid>

                <MDBox mt={4} mb={1}>
                  <MDButton
                    variant="gradient"
                    color={loading ? "disabled" : "info"}
                    disabled={loading}
                    fullWidth
                    onClick={handleSignUp}
                  >
                    {loading ? (
                      <Spinner color="dark" size={30} />
                    ) : (
                      "create account"
                    )}
                  </MDButton>
                </MDBox>
                <MDBox mt={3} mb={2} textAlign="center">
                  <MDTypography variant="button" color="text">
                    Already have an account?{" "}
                    <MDTypography
                      component={Link}
                      to="/authentication/sign-in"
                      variant="button"
                      color="info"
                      fontWeight="medium"
                      textGradient
                    >
                      Sign In
                    </MDTypography>
                  </MDTypography>
                </MDBox>
              </Box>
            </Box>
          </Card>
        </BasicLayout>
      ) : (
        <Navigate replace to="/dashboard" />
      )}
    </>
  );
}

export default Cover;
