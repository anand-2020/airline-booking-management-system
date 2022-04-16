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

  const toPdf = new (function () {
    this.printPage = function () {
      let style = `
      <style>
    body {
      background: none;
      font-family: helvetica, arial;
      text-transform: uppercase;
      box-sizing: border-box;
      width: 100vw;
    }

    h1 {
      color: #eee;
      font-weight: 200;
      font-size: 2.1em;
      margin: 0px;
    }

    h2 {
      color: #eee;
      opacity: 0.5;
      font-weight: 100;
      font-size: 0.9em;
      margin: 0px;
    }

    h3 {
      color: #eee;
      opacity: 0.8;
      font-weight: 100;
      font-size: 0.9em;
      margin: 0px;
    }

    .cards_wrapper {
      text-align: center;
    }

    .card {
      width: 100%;
      border-radius: 20px;
      background: #4d1532;
      display: inline-block;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
    }
    .card img {
      width: 100%;
    }
    .card .inner {
      position: absolute;
      width: 320px;
      height: 100%;
      z-index: 1;
      opacity: 0.1;
      background-image: url(https://puu.sh/rE78K/33424202f7.svg);
      background-size: 130px;
      background-repeat: repeat-y;
      background-position: 0px 0px;
      background-repeat: repeat-x;
      animation: animatedBackground 40s linear infinite;
    }
    @keyframes animatedBackground {
      from {
        background-position: 100% -10px;
      }
      to {
        background-position: 0% -10px;
      }
    }
    .card_logo {
      background: #ffffff;
      border-radius: 20px 20px 0 0;
    }
    .card_logo img.qatar {
      margin: -50px;
      text-align: center;
      width: 70%;
    }
    .card_logo img.tigerair {
      margin-top: 10px;
      text-align: center;
      width: 45%;
    }
    .card_logo img.airasia {
      margin: -10px;
      text-align: center;
      width: 35%;
    }
    .card_heading h2 {
      padding-top: 20px;
      text-align: center;
    }
    .card_thumbnail {
      min-height: 150px;
      margin-top: 10px;
    }
    .card_thumbnail img {
      width: 100%;
      height: auto;
    }
    .card_trip {
      text-align: center;
      width: 85%;
      margin: 30px auto;
      display: flex;
      height: 72px;
    }
    .card_trip div {
      display: inline-block;
      height: 100%;
      vertical-align: middle;
    }
    .card_trip div h1 {
      margin: 0px;
    }
    .card_trip div h2 {
      margin: 0px;
      letter-spacing: 2px;
    }
    .card_trip div.trip_from {
      text-align: left;
      width: 35%;
    }
    .card_trip div.trip_from h2 {
      padding-left: 2px;
    }
    .card_trip div.trip_icon {
      width: 30%;
    }
    .card_trip div.trip_icon img {
        
      opacity: 1;
      width: 75px;
    }
    .card_trip div.trip_to {
      text-align: right;
      width: 35%;
    }
    .card_trip div.trip_to h2 {
      padding-right: 3px;
    }
    .card_departure {
      margin: -20px auto 32px;
    }
    .card_departure div {
      color: #eee;
    }
    .card_divider {
      position: relative;
      width: 100%;
    }
    .card_divider .divider_left {
      left: -15px;
    }
    .card_divider .divider_hole {
      position: absolute;
      top: -12px;
      padding: 0px;
      height: 25px;
      width: 25px;
      border-radius: 100%;
      background: #c5d8e6;
    }
    .card_divider .divider {
      width: 85%;
      margin: auto;
      height: 2px;
      background: linear-gradient(to right, #c5d8e6 50%, transparent 50%);
      background-size: 10px 8px, 100% 2px;
      opacity: 0.2;
    }
    .card_divider .divider_right {
      right: -15px;
    }
    .card_flight_details h2 {
      font-size: 0.7em;
    }
    .card_flight_details .card_seating {
      width: 85%;
      margin: 30px auto;
      display: flex;
    }
    .card_flight_details .card_seating div {
      display: inline-block;
      width: 50%;
    }
    .card_flight_details .card_seating div.seating_passenger {
      text-align: left;
    }
    .card_flight_details .card_seating div.seating_passenger_dos {
      text-align: left;
      padding-left: 32px;
    }
    .card_flight_details .card_seating div.seating_seat {
      text-align: right;
    }
    .card_flight_details .card_details {
      width: 85%;
      margin: 30px auto;
      display: flex;
    }
    .card_flight_details .card_details div {
      display: inline-block;
      width: 33%;
    }
    .card_flight_details .card_details div.details_flight {
      text-align: left;
    }
    .card_flight_details .card_details div.details_date {
      text-align: center;
    }
    .card_flight_details .card_details div.details_time {
      text-align: right;
    }
    .card_flight_details .card_details_continued {
      width: 85%;
      margin: 30px auto;
      display: flex;
      padding-bottom: 30px;
    }
    .card_flight_details .card_details_continued div {
      display: inline-block;
      width: 33%;
    }
    .card_flight_details .card_details_continued div.details_flight {
      text-align: left;
    }
    .card_flight_details .card_details_continued div.details_date {
      text-align: center;
    }
    .card_flight_details .card_details_continued div.details_time {
      text-align: right;
    }
    .card .card_seating {
      width: 85%;
      margin: 30px auto;
      display: flex;
    }
    .card .card_seating div {
      display: inline-block;
      width: 50%;
    }
    .card .card_seating div.seating_passenger {
      text-align: left;
    }
    .card .card_seating div.seating_passenger_dos {
      text-align: center;
    }
    .card .card_seating div.seating_seat {
      text-align: right;
    }
    .card .card_details {
      width: 85%;
      margin: 30px auto;
      display: flex;
    }
    .card .card_details div {
      display: inline-block;
      width: 33%;
    }
    .card .card_details div.details_flight {
      text-align: left;
    }
    .card .card_details div.details_date {
      text-align: center;
    }
    .card .card_details div.details_time {
      text-align: right;
    }
    .card .card_details_continued {
      width: 85%;
      margin: 30px auto;
      display: flex;
      padding-bottom: 30px;
    }
    .card .card_details_continued div {
      display: inline-block;
      width: 33%;
    }
    .card .card_details_continued div.details_flight {
      text-align: left;
    }
    .card .card_details_continued div.details_date {
      text-align: center;
    }
    .card .card_details_continued div.details_time {
      text-align: right;
    }

    .dest_img {
      height: 550px;
    }
    .ta-theme {
      background: #b26a07;
    }
    .ta-theme .card_logo {
      border-top: 5px solid #f69e25;
    }

    .aa-theme {
      background: #961a14;
    }
    .aa-theme .card_logo {
      border-top: 5px solid #da251d;
    }

    .qr-theme {
      background: #72274d;
    }
    .qr-theme .card_logo {
      border-top: 5px solid #72274d;
    }
  </style>
  `;

      let theBody = `
      <div class="cards_wrapper">
    <div class="card ta-theme">
      <div class="card_heading">
        <div class="card_logo">
          <img
            src="http://logonoid.com/images/tigerair-logo.png"
            class="tigerair"
          />
        </div>
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/281813/hkg.jpg"
          alt=""
          class="dest_img"
        />
        <div class="card_divider">
          <div class="divider_left"></div>
          <div class="divider"></div>
          <div class="divider_right"></div>
        </div>
        <h2 id="title">Boarding Pass</h2>
      </div>
      <div class="card_trip">
        <div class="trip_from">
          <h1 id="src1">${srcId}</h1>
          <h2 id="src2">${srcCity}</h2>
        </div>
        <div class="trip_icon">
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/553328/From.png"
            alt=""
          />
        </div>
        <div class="trip_to">
          <h1>${destId}</h1>
          <h2>${destCity}</h2>
        </div>
      </div>
      <div class="card_divider">
        <div class="divider_left"></div>
        <div class="divider"></div>
        <div class="divider_right"></div>
      </div>
      <div class="card_seating">
        <div class="seating_passenger">
          <h2>Passenger</h2>
          <h3>${passengerName}</h3>
        </div>
        <div class="seating_passenger_dos">
          <h2>Booked At</h2>
          <h3> ${bookedDate}</h3>
        </div>
        <div class="seating_seat">
          <h2>Seat</h2>
          <h3>1A/1B</h3>
        </div>
      </div>
      <div class="card_details">
        <div class="details_flight">
          <h2>Flight</h2>
          <h3>TR2063</h3>
        </div>
        <div class="details_date">
          <h2>Depart</h2>
          <h3>${departureDate}</h3>
        </div>
        <div class="details_time">
          <h2>Depart</h2>
          <h3>10:55 am</h3>
        </div>
      </div>
    </div>
  </div>`;
      let newWin = window.open("", "", "height=100,width=100");

      newWin.document.write(style);
      newWin.document.write(theBody);
      newWin.moveTo(0, 0);
      newWin.resizeTo(window.screen.width, window.screen.height);
      setTimeout(function () {
        newWin.print();
        newWin.close();
      }, 5000);
    };
  })();

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
            <MDButton
              variant="outlined"
              color="info"
              size="small"
              onClick={toPdf.printPage}
            >
              PRINT
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
