import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import { useMaterialUIController } from "context";
import Grid from "@mui/material/Grid";
import { IconButton, Divider } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { useState, useEffect } from "react";
import Icon from "@mui/material/Icon";
import backgroundImage from "assets/images/sign-in/11.jpg";
import logoName from "assets/images/logos/logo-name.png";
import { AccessTime } from "@mui/icons-material";

function Ticket({
  ticketId,
  flightId,
  srcId,
  srcAirportName,
  srcCity,
  srcCountry,
  srcOffset,
  destId,
  destAirportName,
  destCountry,
  destCity,
  destOffset,
  departure,
  arrival,
  duration,
  fare,
  passengerName,
  passengerAge,
  bookedDate,
  departureDate,
  isUpcoming,
  seat,
  isCancelled,
  cancelledDate,
  reimbursedAmount,
  cancelConfirmation,
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
    
    .card_logo img.monkeair {
      margin-top: 20px;
      text-align: center;
      width: 45%;
      padding-bottom: 20px;
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
            src="${logoName}"
            class="monkeair"
          />
        </div>
        <img
          src="${backgroundImage}"
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
          <h3>${new Date(bookedDate).toString().substring(0, 24)}</h3>
        </div>
        <div class="seating_seat">
          <h2>Seat</h2>
          <h3>${isCancelled ? "CANCELLED" : seat}</h3>
        </div>
      </div>
      <div class="card_details">
        <div class="details_flight">
          <h2>Flight</h2>
          <h3>${flightId}</h3>
        </div>
        <div class="details_date">
          <h2>Depart</h2>
          <h3>${new Date(departureDate).toString().substring(0, 24)}</h3>
        </div>
        <div class="details_time">
          <h2>Depart</h2>
          <h3>${new Date(departure).toTimeString().substring(0, 5)}</h3>
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
      }, 1000);
    };
  })();

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const titleCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
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
          {`${srcAirportName}, ${srcCity}, ${srcCountry}`}
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
          {`${destAirportName}, ${destCity}, ${destCountry}`}
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
          SEAT&nbsp;-&nbsp;
        </MDTypography>
        <MDTypography fontWeight="normal" color="secondary" fontSize="medium">
          {`${seat}`}
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
          Passenger Name&nbsp;-&nbsp;
        </MDTypography>
        <MDTypography fontWeight="normal" color="secondary" fontSize="medium">
          {`${passengerName}`}
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
          Passenger Age&nbsp;-&nbsp;
        </MDTypography>
        <MDTypography fontWeight="normal" color="secondary" fontSize="medium">
          {`${passengerAge} yrs`}
        </MDTypography>
      </Grid>
      {isCancelled === true ? (
        <>
          <Grid item xs={12} sm={6} display="flex" justifyContent={"center"}>
            <MDTypography fontWeight="bold" fontSize="medium">
              Cancelled On&nbsp;-&nbsp;
            </MDTypography>
            <MDTypography
              fontWeight="normal"
              color="secondary"
              fontSize="medium"
            >
              {new Date(cancelledDate).toString().substring(0, 24)}
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={6} display="flex" justifyContent={"center"}>
            <MDTypography fontWeight="bold" fontSize="medium">
              Reimbursement&nbsp;-&nbsp;
            </MDTypography>
            <MDTypography
              fontWeight="normal"
              color="secondary"
              fontSize="medium"
            >
              &#8377; {`${reimbursedAmount}`}
            </MDTypography>
          </Grid>
        </>
      ) : null}
    </Grid>
  );

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
                <MDTypography variant="h6" fontWeight="light">
                  {new Date(
                    new Date(bookedDate).getTime() -
                      new Date().getTimezoneOffset() * 60000
                  )
                    .toString()
                    .substring(0, 24)}
                </MDTypography>
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item display="flex" justify="center">
          <List>
            <ListItem disablePadding>
              {/* <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon> */}
              <ListItemText sx={{ ml: -3 }}>
                <Grid display="flex">
                  <MDTypography variant="h6" fontWeight="medium">
                    Ticket ID: &nbsp;
                  </MDTypography>
                  <MDTypography variant="h6" fontWeight="light">
                    {ticketId}
                  </MDTypography>
                </Grid>
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
        {isUpcoming === true ? (
          <Grid
            item
            // lg={4}
            // sm={3}
            // xs={7}
            display="flex"
            //direction="column"
            alignItems="flex-end"
            justify="flex-end"
            //  sx={{ ml: -2 }}
          >
            {isCancelled === true ? (
              <MDButton variant="outlined" color="dark" disabled size="small">
                <CancelPresentationIcon></CancelPresentationIcon>&nbsp;CANCEL
              </MDButton>
            ) : (
              <MDButton
                variant="outlined"
                color="info"
                size="small"
                onClick={() => cancelConfirmation(ticketId)}
              >
                <CancelPresentationIcon></CancelPresentationIcon>&nbsp;CANCEL
              </MDButton>
            )}
          </Grid>
        ) : null}
        <Grid item display="flex">
          <MDButton
            variant="outlined"
            color="info"
            size="small"
            onClick={toPdf.printPage}
          >
            PRINT
          </MDButton>
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
        <MDBox mr={2} ml={-1}>
          <MDButton
            variant="contained"
            color="info"
            iconOnly
            circular
            size="small"
            onClick={toggleCollapse}
          >
            <Icon sx={{ fontWeight: "bold" }}>
              {collapsed ? "expand_less" : "expand_more"}
            </Icon>
          </MDButton>
        </MDBox>
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
          <MDTypography variant="h4" fontWeight="bold" sx={{ mr: -4, ml: 2 }}>
            {new Date(departure).toTimeString().substring(0, 5)}
            <MDTypography variant="overline" verticalAlign="super">
              {srcOffset[0] !== "-"
                ? `(+${srcOffset.substring(0, 5)})`
                : `(${srcOffset.substring(0, 6)})`}
            </MDTypography>
          </MDTypography>
          <MDTypography variant="h6" fontWeight="light">
            {new Date(departure).toDateString()}
          </MDTypography>
          {/* <MDTypography variant="h6" fontWeight="light">
            {srcCity}
          </MDTypography> */}
          {/* </Stack> */}
          {/* </MDBox> */}
        </Grid>

        <Grid
          item
          lg={2}
          sm={3}
          xs={7}
          sx={{ ml: 4, mr: 2 }}
          display="flex"
          alignItems="center"
          flexDirection={"column"}
          justifyContent={"center"}
        >
          {/* <Stack spacing={0} textAlign="center"> */}
          <AccessTime />
          {/* <Divider flexItem> */}
          <MDTypography variant="h6" fontWeight="medium" color="secondary">
            {`${duration.substring(0, 2)} hr ${duration.substring(3, 5)} min`}
          </MDTypography>
          {/* </Divider> */}
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
          <MDTypography variant="h4" fontWeight="bold" sx={{ mr: -4, ml: 2 }}>
            {new Date(arrival).toTimeString().substring(0, 5)}
            <MDTypography variant="overline" verticalAlign="super">
              {destOffset[0] !== "-"
                ? `(+${destOffset.substring(0, 5)})`
                : `(${destOffset.substring(0, 6)})`}
            </MDTypography>
          </MDTypography>
          <MDTypography variant="h6" fontWeight="light">
            {new Date(arrival).toDateString()}
          </MDTypography>
          {/* <MDTypography variant="h6" fontWeight="light">
            {destCity}
          </MDTypography> */}
          {/* </Stack> */}
        </Grid>
        <Grid
          item
          lg={2}
          sm={3}
          xs={7}
          sx={{ ml: 5 }}
          display="flex"
          alignItems="center"
          flexDirection={"column"}
        >
          <MDTypography variant="h6" fontWeight="regular">
            Flight ID
          </MDTypography>
          <MDTypography fontWeight="medium">{flightId}</MDTypography>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Collapse in={collapsed}>{ticketDetails}</Collapse>
      </Grid>
    </MDBox>
  );
}

// Setting default values for the props of Bill
Ticket.defaultProps = {
  noGutter: false,
};

export default Ticket;
