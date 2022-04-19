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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

//@mui material icons
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import Grid from "@mui/material/Grid";
import { IconButton, Divider } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { useState } from "react";
import Icon from "@mui/material/Icon";

function Ticket({
  srcId,
  srcCity,
  destId,
  destCity,
  departure,
  arrival,
  duration,
  fare,
  departureDate,
  flightDateId,
  numRows,
  numCols,
  noGutter,
  flightId,
  delay,
}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const ticketDetails = (
    <Grid
      container
      display="flex"
      // direction="column"
      justifyContent="space-around"
      // alignItems="center"
      spacing={0}
      pt={2}
    >
      <Grid item xs={12}>
        <Divider
          orientation="horizontal"
          sx={{ mx: 10, height: "1px", background: "gray" }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        // md={4}
        display="flex"
        alignItems="center"
        justifyContent={"center"}
      >
        <MDTypography fontWeight="bold" fontSize="medium">
          SRC&nbsp;-&nbsp;
        </MDTypography>
        <MDTypography fontWeight="normal" color="secondary" fontSize="medium">
          {`${srcCity}`}
        </MDTypography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        // md={4}
        display="flex"
        alignItems="center"
        justifyContent={"center"}
      >
        <MDTypography fontWeight="bold" fontSize="medium">
          DEST&nbsp;-&nbsp;
        </MDTypography>
        <MDTypography fontWeight="normal" color="secondary" fontSize="medium">
          {`${destCity}`}
        </MDTypography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        // md={4}
        display="flex"
        // alignItems="center"
        justifyContent={"center"}
      >
        <MDTypography fontWeight="bold" fontSize="medium">
          FLIGHT ID&nbsp;-&nbsp;
        </MDTypography>
        <MDTypography fontWeight="normal" color="secondary" fontSize="medium">
          {`${flightId}`}
        </MDTypography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        // md={4}
        display="flex"
        // alignItems="center"
        justifyContent={"center"}
      >
        <MDTypography fontWeight="bold" fontSize="medium">
          FARE&nbsp;-&nbsp;
        </MDTypography>
        <MDTypography fontWeight="normal" color="secondary" fontSize="medium">
          &#8377; {`${fare}`}
        </MDTypography>
      </Grid>
    </Grid>
  );

  return (
    <MDBox
      bgColor={darkMode ? "transparent" : "grey-200"}
      borderRadius="lg"
      p={2}
      mb={noGutter ? 0 : 1}
      mt={1}
    >
      <Grid
        container
        // component="li"
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        spacing={5}
      >
        <Grid item display="flex">
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <EventAvailableIcon />
              </ListItemIcon>
              <ListItemText sx={{ ml: -3 }}>
                <Grid display="flex">
                  <MDTypography variant="h6" fontWeight="medium">
                    Date of Departure: &nbsp;
                  </MDTypography>
                  <MDTypography variant="h6" fontWeight="light">
                    {departureDate}
                  </MDTypography>
                </Grid>
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item display="flex">
          <List>
            <ListItem disablePadding>
              <ListItemText sx={{ ml: -3 }}>
                <Grid display="flex">
                  <MDTypography variant="h6" fontWeight="medium">
                    Flight ID: &nbsp;
                  </MDTypography>
                  <MDTypography variant="h6" fontWeight="light">
                    {flightId}
                  </MDTypography>
                </Grid>
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Divider
        orientation="horizontal"
        sx={{ mx: 10, height: "1px", background: "gray" }}
      />
      <Grid
        container
        // component="li"
        display="flex"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        // mx="auto"
      >
        <Grid
          item
          lg={2}
          sm={3}
          xs={7}
          display="flex"
          alignItems="center"
          flexDirection={"column"}
        >
          <MDTypography fontWeight="medium">{srcId}</MDTypography>
          <MDTypography variant="h4" fontWeight="bold">
            {departure}
          </MDTypography>
          <MDTypography
            variant="caption"
            color={delay !== "00:00:00" ? "error" : "success"}
          >
            {delay !== "00:00:00" ? `Delayed by ${delay}` : `No delay`}
          </MDTypography>
          <MDTypography variant="h6" fontWeight="light">
            {srcCity}
          </MDTypography>
        </Grid>

        <Grid
          item
          lg={2}
          sm={3}
          xs={7}
          display="flex"
          alignItems="center"
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <Divider flexItem>
            <MDTypography variant="h6" fontWeight="medium">
              {`${duration.substring(0, 2)} hr ${duration.substring(3, 5)} min`}
            </MDTypography>
          </Divider>
        </Grid>

        <Grid
          item
          lg={2}
          sm={3}
          xs={7}
          display="flex"
          alignItems="center"
          flexDirection={"column"}
        >
          <MDTypography fontWeight="medium">{destId}</MDTypography>
          <MDTypography variant="h4" fontWeight="bold">
            {arrival}
          </MDTypography>
          <MDTypography variant="h6" fontWeight="light">
            {destCity}
          </MDTypography>
        </Grid>
        <Grid
          item
          sm={3}
          xs={7}
          display="flex"
          alignItems="center"
          flexDirection={"column"}
        >
          <MDTypography variant="h6" fontWeight="regular">
            FARE
          </MDTypography>
          <MDTypography fontWeight="medium">&#8377; {fare}</MDTypography>
        </Grid>
      </Grid>
    </MDBox>
  );
}

// Setting default values for the props of Bill
Ticket.defaultProps = {
  noGutter: false,
};

export default Ticket;
