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
import { Divider } from "@mui/material";

function Ticket({
  srcId,
  srcCity,
  destId,
  destCity,
  departure,
  arrival,
  duration,
  fare,
  passengerName,
  bookedDate,
  departureDate,
  isUpcoming,
  isCancelled,
  isCancelledDate,
  noGutter,
}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDBox
      bgColor={darkMode ? "transparent" : "grey-200"}
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <Grid
        container
        // component="li"
        display="flex"
        justifyContent="center"
        alignItems="center"
        spacing={10}
      >
        <Grid item display="flex" justifyContent={"flex-start"}>
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <FlightTakeoffIcon />
              </ListItemIcon>
              <ListItemText sx={{ ml: -3 }}>
                <MDTypography variant="h6" fontWeight="medium">
                  {departureDate}
                </MDTypography>
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item display="flex">
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText sx={{ ml: -3 }}>
                <MDTypography variant="h6" fontWeight="light">
                  {passengerName}
                </MDTypography>
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item display="flex">
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <EventAvailableIcon />
              </ListItemIcon>
              <ListItemText sx={{ ml: -3 }}>
                <MDTypography variant="h6" fontWeight="light">
                  {bookedDate}
                </MDTypography>
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
          {/* <MDBox borderColor={"black"} border={"2px"}> */}
          {/* <Stack spacing={0} textAlign="center"> */}
          <MDTypography fontWeight="medium">{srcId}</MDTypography>
          <MDTypography variant="h4" fontWeight="bold">
            {departure}
          </MDTypography>
          <MDTypography variant="h6" fontWeight="light">
            {srcCity}
          </MDTypography>
          {/* </Stack> */}
          {/* </MDBox> */}
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
          {/* <Stack spacing={0} textAlign="center"> */}

          <Divider flexItem>
            <MDTypography variant="h6" fontWeight="medium">
              {duration}
            </MDTypography>
          </Divider>
          {/* </Stack> */}
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
          {/* <Stack spacing={0} textAlign="center"> */}
          <MDTypography fontWeight="medium">{destId}</MDTypography>
          <MDTypography variant="h4" fontWeight="bold">
            {arrival}
          </MDTypography>
          <MDTypography variant="h6" fontWeight="light">
            {destCity}
          </MDTypography>
          {/* </Stack> */}
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
          <MDTypography fontWeight="bold">&#8377;{fare}</MDTypography>
        </Grid>
        {isUpcoming === true ? (
          <Grid
            item
            lg={2}
            sm={3}
            xs={7}
            display="flex"
            alignItems="flex-end"
            flexDirection={"column"}
          >
            <MDButton variant="outlined" color="info" size="small">
              <CancelPresentationIcon></CancelPresentationIcon>&nbsp;CANCEL
            </MDButton>
          </Grid>
        ) : null}
      </Grid>
      {isCancelled === true ? (
        <Grid
          item
          sx={{ mt: 2, backgroundColor: "	#C0C0C0", borderRadius: 2 }}
          display="flex"
          alignItems="center"
          flexDirection={"column"}
        >
          {/* <MDBox variant="outlined" color="info" size="small"> */}
          <MDTypography variant="h5" fontWeight="bold" color="white">
            CANCELLED
          </MDTypography>

          {/* </MDBox> */}
        </Grid>
      ) : null}
    </MDBox>
  );
}

// Setting default values for the props of Bill
Ticket.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
Ticket.propTypes = {
  srcId: PropTypes.string.isRequired,
  srcCity: PropTypes.string.isRequired,
  destId: PropTypes.string.isRequired,
  destCity: PropTypes.string.isRequired,
  departure: PropTypes.string.isRequired,
  arrival: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  fare: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Ticket;
