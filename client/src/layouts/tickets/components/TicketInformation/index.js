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
import React, { useState, useEffect } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Divider, Tab, Tabs, Box, ButtonGroup, Button } from "@mui/material";

// Billing page components
import Ticket from "layouts/tickets/components/Ticket";
import moment from "moment";

function TicketInformation(props) {
  const [activeDate, setActiveDate] = React.useState(0);
  const [fdates, setFdates] = useState([]);
  const [flights, setFlights] = useState([]);

  const handleDateButtonClick = (idx) => {
    setActiveDate(idx);
    filterByDate(fdates[idx]);
  };

  const filterByDate = (date) => {
    const filtered = props.flights.filter(
      (flight) =>
        moment(flight.DEP_TS.substring(0, 10)).format("DD/MM/YY") === date
    );
    setFlights(filtered);
  };

  useEffect(() => {
    let dates = [];
    props.flights.forEach((flight) =>
      dates.push(moment(flight.DEP_TS.substring(0, 10)).format("DD/MM/YY"))
    );
    dates = dates.filter((x, i, a) => a.indexOf(x) === i);
    setFdates(dates);
    filterByDate(dates[activeDate]);
  }, [props.flights]);

  return (
    // <Card id="delete-account">
    <>
      {props.flights.length === 0 ? (
        <MDBox pt={3} px={2} sx={{ display: "flex", justifyContent: "center" }}>
          <MDTypography variant="h3">Ummm... No flights :(</MDTypography>
        </MDBox>
      ) : (
        <>
          <MDBox
            pt={3}
            px={2}
            sx={{ overflowX: "scroll" }}
            // sx={{ maxWidth: "50vw", bgcolor: "white" }}
          >
            <ButtonGroup>
              {fdates.map((date, idx) => (
                <>
                  <Button
                    key={idx}
                    variant={idx === activeDate ? "contained" : "outlined"}
                    onClick={() => handleDateButtonClick(idx)}
                    sx={{ width: "200px" }}
                  >
                    <MDTypography
                      opacity={10}
                      variant="h6"
                      color={idx === activeDate ? "white" : "dark"}
                    >
                      {date}
                    </MDTypography>
                  </Button>
                  {/* <Divider orientation="vertical" sx={{ color: "black" }} /> */}
                </>
              ))}
            </ButtonGroup>
          </MDBox>
          <MDBox pt={1} pb={2} px={2}>
            <MDBox
              component="ul"
              display="flex"
              flexDirection="column"
              p={0}
              m={0}
            >
              {flights.map((flight, idx) => (
                <Ticket
                  key={idx}
                  srcId={props.srcID}
                  srcCity={props.srcCity}
                  destId={props.destID}
                  destCity={props.destCity}
                  departure={moment.utc(flight.DEP_TS).format("HH:mm")}
                  arrival={moment.utc(flight.ARR_TS).format("HH:mm")}
                  duration={flight.DURATION}
                  fare={flight.TICKET_PRICE}
                  flightDateId={flight.FLIGHT_DATE_ID}
                  delay={flight.DELAYED_BY}
                  departureDate={moment(flight.DEP_TS.substring(0, 10)).format(
                    "DD/MM/YY"
                  )}
                  numRows={flight.NUM_ROWS}
                  numCols={flight.NUM_COLS}
                />
              ))}
            </MDBox>
          </MDBox>
        </>
      )}
    </>
    // </Card>
  );
}

export default TicketInformation;
