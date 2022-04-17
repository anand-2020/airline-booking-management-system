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

import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import FlightTakeOff from "@mui/icons-material/FlightTakeoff";
import FlightLand from "@mui/icons-material/FlightLand";
import Flight from "@mui/icons-material/Flight";
import Calender from "@mui/icons-material/CalendarToday";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import { InputAdornment, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDInput from "components/MDInput";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";
import moment from "moment";

// Images
import backgroundImage from "assets/images/welcome-page/3.jpg";
import MDButton from "components/MDButton";

import TicketInformation from "../../../tickets/components/TicketInformation";
import Autocomplete from "@mui/material/Autocomplete";
import Spinner from "components/Spinner";
import axios from "axiosInstance";

function Header({ children, airports }) {
  const [dateValue, setDateValue] = useState(new Date());
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);

  const handleDateChange = (newDate) => {
    setDateValue(newDate);
  };

  const handleSearch = () => {
    // console.log(moment(dateValue).format());
    setLoading(true);
    axios
      .get(
        `flight/${source.AIRPORT_ID}/${destination.AIRPORT_ID}/${moment(
          dateValue
        ).format()}`
      )
      .then((res) => {
        setFlights(res.data.data);
        setLoading(false);
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({
            functions: { rgba, linearGradient },
            palette: { gradients },
          }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      >
        <Grid
          container
          spacing={3}
          alignItems="center"
          display={"flex"}
          justifyContent={"space-around"}
          flexDirection={"column"}
        >
          <Grid
            container
            // spacing={3}
            alignItems="center"
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"row"}
            marginX={1}
            paddingX={3}
          >
            <Grid item lg={4} sm={5} xs={12}>
              <MDBox
                height="100%"
                mt={{ sm: 0.5, xs: 3 }}
                mx={"auto"}
                lineHeight={1}
                width="auto"
              >
                <Autocomplete
                  options={airports}
                  groupBy={(option) => option.COUNTRY}
                  getOptionLabel={(option) => option.CITY}
                  sx={{
                    "& .MuiAutocomplete-input": {
                      fontSize: 20,
                      color: "#ffffff",
                      fontWeight: "bold",
                      textAlign: "center",
                      borderWidth: 5,
                    },
                  }}
                  value={source}
                  onChange={(e, value) => setSource(value)}
                  renderInput={(params) => (
                    <MDInput {...params} placeholder="SRC." />
                  )}
                />
              </MDBox>
            </Grid>

            <MDTypography
              variant="h1"
              fontWeight={"bold"}
              color={"white"}
              display={"flex"}
              // ml={"auto"}
            >
              <Flight
                sx={{
                  mt: 1,
                  mx: 0.5,
                  transform: { xs: "rotate(180deg)", sm: "rotate(90deg)" },
                }}
              />
            </MDTypography>

            <Grid item lg={4} sm={5} xs={12}>
              <MDBox height="100%" mt={0.5} lineHeight={1}>
                <Autocomplete
                  options={airports}
                  groupBy={(option) => option.COUNTRY}
                  getOptionLabel={(option) => option.CITY}
                  sx={{
                    "& .MuiAutocomplete-input": {
                      fontSize: 20,
                      color: "#ffffff",
                      fontWeight: "bold",
                      textAlign: "center",
                      borderWidth: 5,
                    },
                  }}
                  value={destination}
                  onChange={(e, value) => setDestination(value)}
                  renderInput={(params) => (
                    <MDInput {...params} placeholder="DEST." />
                  )}
                />
              </MDBox>
            </Grid>
          </Grid>
          <Grid
            item
            container
            spacing={3}
            alignItems="center"
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"row"}
            marginX={1}
            paddingX={3}
          >
            <Grid item lg={3} sm={5} xs={5}>
              <MDBox height="100%" mt={0.5} lineHeight={1}>
                <MDTypography
                  variant="h1"
                  fontWeight={"bold"}
                  color={"white"}
                  display={"flex"}
                >
                  {/* <Calender sx={{ mt: 1, mx: 0.5 }} /> */}
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      // label="Date of Journey"
                      inputFormat="dd/MM/yyyy"
                      value={dateValue}
                      onChange={handleDateChange}
                      inputProps={{
                        style: {
                          fontSize: 20,
                          color: "white",
                          fontWeight: "bold",
                          textAlign: "center",
                        },
                      }}
                      minDate={new Date()}
                      // defaultValue={dateValue}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </MDTypography>
              </MDBox>
            </Grid>

            <Grid item lg={3} sm={4} xs={5}>
              <MDBox height="100%" mt={0.5} lineHeight={1}>
                <MDButton
                  variant="contained"
                  size="large"
                  onClick={handleSearch}
                  disabled={source === null || destination === null}
                  color={loading ? "disabled" : "white"}
                >
                  {loading ? <Spinner size={20} /> : "SEARCH"}
                  {/* SEARCH */}
                </MDButton>
              </MDBox>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
      <Card
        sx={{
          position: "relative",
          mt: { xs: 0, sm: -8 },
          mx: { xs: 0, sm: 3 },
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center"></Grid>
        {loading ? (
          <Spinner />
        ) : (
          <TicketInformation
            flights={flights}
            destCity={`${destination?.CITY}`}
            srcCity={`${source?.CITY}`}
            srcID={source?.AIRPORT_ID}
            destID={destination?.AIRPORT_ID}
          ></TicketInformation>
        )}
      </Card>
    </MDBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
