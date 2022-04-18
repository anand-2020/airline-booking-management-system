import Pagination from "@mui/material/Pagination";
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

// @mui material components
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";

// Billing page components
import Transaction from "layouts/admin/components/Transaction";
import Autocomplete from "@mui/material/Autocomplete";
import MDInput from "components/MDInput";
import { CardHeader, IconButton, Divider } from "@mui/material";
import { Search, Add } from "@mui/icons-material";
import MDButton from "components/MDButton";
import React, { useState, useEffect } from "react";
import FlightPath from "layouts/form/flightPath";
import Airport from "layouts/form/airport";
import Dialog from "layouts/dialog";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import axios from "axiosInstance";
import AuthContext from "authContext";
import Spinner from "components/Spinner";
import { flushSync } from "react-dom";

function Transactions() {
  const [pageSize, setPageSize] = useState(20);
  const [totPages, setTotPages] = useState(1);
  const [currPage, setCurrPage] = useState(1);
  const [flightPaths, setFlightPaths] = useState([]);
  const [currPageFlightPaths, setCurrPageFlightPaths] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [flightIDs, setFlightIDs] = useState([]);

  const handlePageChange = (event, value) => {
    setCurrPage(value);
    setCurrPageFlightPaths(
      flightPaths.slice((value - 1) * pageSize, value * pageSize)
    );
  };

  // const flightPaths = [
  //   { FLIGHT_ID: "AL450" },
  //   { FLIGHT_ID: "AL451" },
  //   { FLIGHT_ID: "AL452" },
  //   { FLIGHT_ID: "AL453" },
  //   { FLIGHT_ID: "AL454" },
  //   { FLIGHT_ID: "AL455" },
  //   { FLIGHT_ID: "AL459" },
  //   { FLIGHT_ID: "AL457" },
  //   { FLIGHT_ID: "AL458" },
  // ];

  const searchFlight = () => {
    const idx = flightIDs.indexOf(searchValue);
    if (idx == -1) {
      setCurrPage(1);
      setCurrPageFlightPaths(flightPaths.slice(0, pageSize));
    } else {
      const pgNo = Math.ceil(idx / pageSize);
      setCurrPage(pgNo);
      setCurrPageFlightPaths(flightPaths.slice(idx, idx + pageSize));
    }
  };

  const getFlightPaths = () => {
    setLoading(true);
    axios
      .get(`flight`)
      .then((res) => {
        // console.log(res);
        setTotPages(Math.ceil(res.data.data.length / pageSize));
        const flightData = res.data.data.sort((a, b) =>
          a.FLIGHT_ID.localeCompare(b.FLIGHT_ID)
        );
        setFlightIDs(flightData.map((f) => f.FLIGHT_ID));
        setFlightPaths(flightData);
        //console.log(flightData[0]);
        setCurrPageFlightPaths(flightData.slice(0, pageSize));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const addNewFlightPath = (flightDetails) => {
    getFlightPaths();
  };

  useEffect(() => {
    getFlightPaths();
  }, []);

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Flight Paths" sx={{ alignSelf: "center" }} />
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={3}
        px={2}
      >
        <Autocomplete
          options={flightPaths}
          getOptionLabel={(option) => option.FLIGHT_ID}
          fullWidth
          onInputChange={(event, newInputValue) => {
            setSearchValue(newInputValue);
          }}
          renderInput={(params) => (
            <MDInput {...params} placeholder="Flight ID" />
          )}
        />
        &nbsp; &nbsp;
        <MDButton variant="gradient" color="info" onClick={searchFlight}>
          <Search variant="filled" />
          &nbsp;Search
        </MDButton>
      </MDBox>
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        pt={3}
        px={2}
      >
        <Dialog
          title="Add New Flight Path"
          action={
            <MDButton variant="outlined" color="success">
              <Add />
              &nbsp;Add a new Flight Path
            </MDButton>
          }
        >
          <FlightPath
            addNewFlightPath={(flightDetails) =>
              addNewFlightPath(flightDetails)
            }
          />
        </Dialog>
        &nbsp; &nbsp;
        <Dialog
          title="Add New Airport"
          action={
            <MDButton variant="outlined" color="success">
              <Add />
              &nbsp;Add a new Airport
            </MDButton>
          }
        >
          <Airport />
        </Dialog>
      </MDBox>
      <Divider />
      <MDBox display="flex" justifyContent="center" alignItems="center">
        <Pagination
          count={totPages}
          page={currPage}
          onChange={handlePageChange}
          color="secondary"
        />
        {/* &nbsp; &nbsp;
        <TextField
          name="name"
          id="hour"
          xs={2}
          size="small"
          label="Page Size"
          type="number"
          value={pageSize}
          onChange={(e) => setPageSize(e.target.value)}
        /> */}
      </MDBox>
      <MDBox pt={3} pb={2} px={2} sx={{ overflowX: "scroll" }}>
        {loading === true ? (
          <Spinner />
        ) : (
          <MDBox
            component="ul"
            display="flex"
            flexDirection="column"
            py={3}
            m={0}
            sx={{ listStyle: "none", borderRadius: "2%" }}
            bgColor="light"
          >
            {currPageFlightPaths.map((flight, idx) => (
              <>
                <Transaction
                  color="dark"
                  icon="expand_more"
                  flightID={flight.FLIGHT_ID}
                  baseFare={flight.BASE_FARE}
                  daysString={flight.DAYS_STRING}
                  deptTime={flight.DEPARTURE_TIME}
                  destLoc={flight.DESTINATION_LOCATION}
                  destID={flight.DST_ID}
                  duration={flight.DURATION}
                  leaseExpiry={flight.LEASE_EXPIRY}
                  seatMap={`${flight.NUM_COLS} X ${flight.NUM_ROWS}`}
                  srcLoc={flight.SOURCE_LOCATION}
                  srcID={flight.SRC_ID}
                />
                <Divider />
              </>
            ))}
          </MDBox>
        )}
      </MDBox>
    </Card>
  );
}

export default Transactions;
