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
import Stack from "@mui/material/Stack";
import React from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Divider, Tab, Tabs, Box, ButtonGroup, Button } from "@mui/material";

// Billing page components
import Ticket from "layouts/tickets/components/Ticket";

function TicketInformation() {
  const [value, setValue] = React.useState(0);
  const [activeDate, setActiveDate] = React.useState(0);

  const handleDateButtonClick = (idx) => {
    setActiveDate(idx);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dates = [
    "19/02/2022",
    "19/02/2022",
    "19/02/2022",
    "19/02/2022",
    "19/02/2022",
    "19/02/2022",
    "19/02/2022",
    "19/02/2022",
    "19/02/2022",
    "19/02/2022",
  ];

  return (
    // <Card id="delete-account">
    <>
      <MDBox
        pt={3}
        px={2}
        sx={{ overflowX: "scroll" }}
        // sx={{ maxWidth: "50vw", bgcolor: "white" }}
      >
        {/* <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          <MDBox sx={{ minWidth: "180px" }}>
            <Tab wrapped label="22/01/2022" />
            <Divider orientation="vertical" />
          </MDBox>
          <MDBox sx={{ minWidth: "180px" }}>
            <Tab wrapped label="22/01/2022" />
            <Divider orientation="vertical" />
          </MDBox>
          <MDBox sx={{ minWidth: "180px" }}>
            <Tab wrapped label="22/01/2022" />
            <Divider orientation="vertical" />
          </MDBox>
          <MDBox sx={{ minWidth: "180px" }}>
            <Tab wrapped label="22/01/2022" />
            <Divider orientation="vertical" />
          </MDBox>
          <MDBox sx={{ minWidth: "180px" }}>
            <Tab wrapped label="22/01/2022" />
            <Divider orientation="vertical" />
          </MDBox>
          <MDBox sx={{ minWidth: "180px" }}>
            <Tab wrapped label="22/01/2022" />
            <Divider orientation="vertical" />
          </MDBox>
          <MDBox sx={{ minWidth: "180px" }}>
            <Tab wrapped label="22/01/2022" />
            <Divider orientation="vertical" />
          </MDBox>
        </Tabs> */}

        <ButtonGroup>
          {dates.map((date, idx) => (
            <Button
              key={idx}
              variant={idx === activeDate ? "contained" : "text"}
              onClick={() => handleDateButtonClick(idx)}
            >
              <MDTypography
                opacity="10"
                variant="h6"
                color={idx === activeDate ? "white" : "dark"}
              >
                {date}
              </MDTypography>
            </Button>
          ))}
        </ButtonGroup>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Ticket
            srcId="DEL"
            srcCity="New Delhi"
            destId="HYD"
            destCity="Hyderabad"
            departure="10:40"
            arrival="13:00"
            duration="2hr 20min"
            fare="6500"
          />
          <Ticket
            srcId="DEL"
            srcCity="New Delhi"
            destId="HYD"
            destCity="Hyderabad"
            departure="10:40"
            arrival="13:00"
            duration="2hr 20min"
            fare="6500"
          />
          <Ticket
            srcId="DEL"
            srcCity="New Delhi"
            destId="HYD"
            destCity="Hyderabad"
            departure="10:40"
            arrival="13:00"
            duration="2hr 20min"
            fare="6500"
            noGutter
          />
        </MDBox>
      </MDBox>
    </>
    // </Card>
  );
}

export default TicketInformation;
