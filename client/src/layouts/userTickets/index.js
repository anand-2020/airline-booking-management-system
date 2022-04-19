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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Divider, Tab, Tabs, Box, ButtonGroup, Button } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Ticket from "layouts/userTickets/components/Ticket";
import React, { useState, useContext, useEffect } from "react";
import axios from "axiosInstance";
import AuthContext from "authContext";
import Spinner from "components/Spinner";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function TicketInformation({ isUpcoming }) {
  const { authenticated, currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [open, setOpen] = useState(false);
  const [toDeleteTicketId, setToDeleteTicketId] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);
  const [offset, setOffSet] = useState(new Map());

  const getAirportOffset = () => {
    axios
      .get(`airport`)
      .then((res) => {
        // console.log(res);
        const offsetData = new Map();
        res.data.data.forEach((airport) => {
          offsetData.set(airport.AIRPORT_ID, airport.OFFSET);
        });

        setOffSet(offsetData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTickets = (url) => {
    setLoading(true);

    axios
      .get(url)
      .then((res) => {
        // console.log("RES");
        console.log(res.data.data);
        setTickets(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        // console.log("ERR");
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!currentUser) return;

    getAirportOffset();

    if (isUpcoming === true)
      getTickets(`customer/${currentUser.CUSTOMER_ID}/upcomingTickets`);
    else getTickets(`customer/${currentUser.CUSTOMER_ID}/archiveTickets`);
  }, [currentUser, isUpcoming]);

  const cancelTicket = () => {
    axios
      .patch(`ticket/${toDeleteTicketId}`)
      .then((res) => {
        // console.log("res");
        console.log(res);
        setToDeleteTicketId("");
        setOpen(false);
        setIsCancelling(false);
        getTickets(`customer/${currentUser.CUSTOMER_ID}/upcomingTickets`);
      })
      .catch((err) => {
        // console.log("err");
        console.log(err);
        setToDeleteTicketId("");
        setOpen(false);
        setIsCancelling(false);
      });
  };

  const ConfirmationDialog = (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
      textAlign="center"
      justify="center"
      alignItems="center"
    >
      <DialogTitle textAlign="center">
        <MDTypography fontWeight="medium">Confirm Cancellation</MDTypography>
      </DialogTitle>

      <DialogContent id="confirm-dialog" textAlign="center">
        <MDTypography variant="h6" fontWeight="regular">
          Ticket ID: {toDeleteTicketId}
        </MDTypography>
      </DialogContent>
      <DialogActions>
        {isCancelling === true ? (
          <Spinner />
        ) : (
          <>
            <MDButton
              variant="contained"
              onClick={() => setOpen(false)}
              color="info"
            >
              No
            </MDButton>
            <MDButton
              variant="contained"
              onClick={() => {
                setIsCancelling(true);
                cancelTicket();
              }}
              color="info"
            >
              Yes
            </MDButton>
          </>
        )}
      </DialogActions>
    </Dialog>
  );

  const cancelConfirmation = (ticketId) => {
    setToDeleteTicketId(ticketId);
    setOpen(true);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card id="delete-account">
        <MDBox pt={1} pb={2} px={2}>
          {loading === true ? (
            <Spinner />
          ) : (
            <MDBox
              component="ul"
              display="flex"
              flexDirection="column"
              p={0}
              m={0}
            >
              {ConfirmationDialog}
              {tickets.map((ticket) => (
                <Ticket
                  key={ticket.TICKET_ID}
                  ticketId={ticket.TICKET_ID}
                  flightId={ticket.FLIGHT_ID}
                  srcId={ticket.SRC_AIRPORT_ID}
                  srcAirportName={ticket.SRC_AIRPORT_NAME}
                  srcCity={ticket.SRC_CITY}
                  srcCountry={ticket.SRC_COUNTRY}
                  srcOffset={offset.get(ticket.SRC_AIRPORT_ID)}
                  destId={ticket.DEST_AIRPORT_ID}
                  destAirportName={ticket.DEST_AIRPORT_NAME}
                  destCity={ticket.DEST_CITY}
                  destCountry={ticket.DEST_COUNTRY}
                  destOffset={offset.get(ticket.DEST_AIRPORT_ID)}
                  departure={ticket.DEP_TS}
                  arrival={ticket.ARR_TS}
                  duration={ticket.DURATION}
                  fare={ticket.FARE}
                  seat={ticket.SEAT_NUM}
                  passengerName={ticket.PASSENGER_NAME}
                  passengerAge={ticket.PASSENGER_AGE}
                  bookedDate={ticket.TIME_OF_BOOKING}
                  cancelledDate={ticket.TIME_OF_CANCELLATION}
                  reimbursedAmount={ticket.REIMBURSED_AMOUNT}
                  departureDate={ticket.DEP_TS}
                  isUpcoming={isUpcoming}
                  isCancelled={ticket.STATUS === "CANCELLED" ? true : false}
                  cancelConfirmation={(ticketId) =>
                    cancelConfirmation(ticketId)
                  }
                />
              ))}
            </MDBox>
          )}
        </MDBox>
      </Card>
      <Footer />
    </DashboardLayout>
  );
}

export default TicketInformation;
