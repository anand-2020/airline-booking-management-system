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

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Ticket from "layouts/userTickets/components/Ticket";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function TicketInformation({ isUpcoming }) {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card id="delete-account">
        <MDBox pt={1} pb={2} px={2}>
          <MDBox
            component="ul"
            display="flex"
            flexDirection="column"
            p={0}
            m={0}
          >
            <Ticket
              srcId="DEL"
              srcCity="New Delhi"
              destId="HYD"
              destCity="Hyderabad"
              departure="10:40"
              arrival="13:00"
              duration="2hr 20min"
              fare="6500"
              passengerName="Aaron Finch"
              bookedDate="10-04-2022"
              departureDate="15-04-2022"
              isUpcoming={isUpcoming}
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
              passengerName="Mitchell Johnson"
              bookedDate="10-04-2022"
              departureDate="15-04-2022"
              isUpcoming={isUpcoming}
              isCancelled={false}
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
              passengerName="Pat Cummins"
              bookedDate="10-04-2022"
              departureDate="15-04-2022"
              isUpcoming={isUpcoming}
              isCancelled={!isUpcoming && true}
              cancelledDate="14-04-2022"
            />
          </MDBox>
        </MDBox>
      </Card>
      <Footer />
    </DashboardLayout>
  );
}

export default TicketInformation;
