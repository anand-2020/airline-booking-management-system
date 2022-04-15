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
import React, { useState } from "react";

function Transactions() {
  const [currPage, setCurrPage] = useState(1);

  const handlePageChange = (event, value) => {
    setCurrPage(value);
  };
  const flightPaths = [
    { FLIGHT_ID: "AL450" },
    { FLIGHT_ID: "AL451" },
    { FLIGHT_ID: "AL452" },
    { FLIGHT_ID: "AL453" },
    { FLIGHT_ID: "AL454" },
    { FLIGHT_ID: "AL455" },
    { FLIGHT_ID: "AL459" },
    { FLIGHT_ID: "AL457" },
    { FLIGHT_ID: "AL458" },
  ];

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
          renderInput={(params) => (
            <MDInput {...params} placeholder="Flight ID" />
          )}
        />
        <MDButton>
          <Search />
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
        <MDButton variant="outlined" color="success">
          <Add />
          &nbsp;Add a new Flight Path
        </MDButton>
      </MDBox>
      <Divider />
      <MDBox display="flex" justifyContent="center" alignItems="center">
        <Pagination
          count={10}
          page={currPage}
          onChange={handlePageChange}
          color="secondary"
        />
      </MDBox>
      <MDBox pt={3} pb={2} px={2} sx={{ overflowX: "scroll" }}>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          py={3}
          m={0}
          sx={{ listStyle: "none", borderRadius: "2%" }}
          bgColor="light"
        >
          {flightPaths.map((flight, idx) => (
            <>
              <Transaction
                color="dark"
                icon="expand_more"
                flightID={flight.FLIGHT_ID}
                description="DEL - HYD"
                value="- $ 2,500"
              />
              <Divider />
            </>
          ))}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Transactions;
