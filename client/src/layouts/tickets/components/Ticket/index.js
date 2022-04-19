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
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthContext from "authContext";
import { useContext } from "react";
import FlightDelayForm from "layouts/form/flightDelay.js";
import Dialog from "layouts/dialog";
import Spinner from "components/Spinner";
import MuiDialog from "@mui/material/Dialog";
import MuiDialogActions from "@mui/material/DialogActions";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogContentText from "@mui/material/DialogContentText";
import MuiDialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

function Ticket({
  srcId,
  srcCity,
  destId,
  destCity,
  departure,
  arrival,
  duration,
  fare,
  flightDateId,
  noGutter,
  departureDate,
  numRows,
  numCols,
  flightId,
  cancelFlight,
  addDelay,
  delay,
}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const navigate = useNavigate();
  const { canWrite } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const cancelConfirmation = () => {
    setOpen(true);
  };

  const ConfirmationDialog = (
    <MuiDialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
      textAlign="center"
      justify="center"
      alignItems="center"
    >
      <MuiDialogTitle textAlign="center">
        <MDTypography fontWeight="medium">Confirm Cancellation</MDTypography>
      </MuiDialogTitle>

      <MuiDialogContent id="confirm-dialog" textAlign="center">
        <MDTypography variant="h6" fontWeight="regular">
          Flight Date ID: {flightDateId}
        </MDTypography>
      </MuiDialogContent>
      <MuiDialogActions>
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
                cancelFlight(flightDateId);
              }}
              color="info"
            >
              Yes
            </MDButton>
          </>
        )}
      </MuiDialogActions>
    </MuiDialog>
  );

  const navigateToBooking = () => {
    navigate("/bookFlight", {
      state: {
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
        flightId,
        delay,
      },
    });
  };

  return (
    <MDBox
      bgColor={darkMode ? "transparent" : "grey-200"}
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      {ConfirmationDialog}
      <Grid
        container
        // component="li"
        display="flex"
        justifyContent="center"
        alignItems="center"
        spacing={{ lg: 3, md: 1 }}
        // mx="auto"
      >
        <Grid
          item
          lg={2}
          sm={3}
          xs={12}
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
          <MDTypography
            variant="caption"
            color={delay !== "00:00:00" ? "error" : "success"}
          >
            {delay !== "00:00:00" ? `Delayed by ${delay}` : `No delay`}
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
          xs={12}
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
          &nbsp;&nbsp;
          {/* </Stack> */}
        </Grid>

        <Grid
          item
          lg={2}
          sm={3}
          xs={12}
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
          xs={12}
          display="flex"
          alignItems="center"
          flexDirection={"column"}
        >
          <MDTypography fontWeight="bold">&#8377;{fare}</MDTypography>
        </Grid>

        <Grid
          container
          item
          lg={2}
          md={12}
          sm={12}
          xs={12}
          // sm={12}
          display="flex"
          alignItems="center"
          justifyContent={"center"}
          spacing={1}
        >
          <Grid item md={4} lg={12}>
            <MDButton
              variant="contained"
              color="primary"
              size={canWrite == true ? "small" : "large"}
              onClick={navigateToBooking}
            >
              <AirplaneTicketIcon></AirplaneTicketIcon>&nbsp;BOOK
            </MDButton>
          </Grid>
          {canWrite === true && (
            <Grid item md={4} lg={12}>
              <Dialog
                title="Delay Flight"
                action={
                  <MDButton
                    variant="contained"
                    color="warning"
                    size={canWrite === true ? "small" : "large"}
                  >
                    &nbsp;DELAY
                  </MDButton>
                }
              >
                <FlightDelayForm
                  flightId={flightId}
                  flightDateId={flightDateId}
                  addDelay={addDelay}
                />
              </Dialog>
            </Grid>
          )}

          {canWrite === true && (
            <Grid item md={4} lg={12}>
              <MDButton
                variant="contained"
                color="error"
                size={canWrite == true ? "small" : "large"}
                onClick={cancelConfirmation}
              >
                &nbsp;CANCEL
              </MDButton>
            </Grid>
          )}
        </Grid>
      </Grid>
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
  fare: PropTypes.number.isRequired,
  noGutter: PropTypes.bool,
};

export default Ticket;
