import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
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
import MuiDialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { AccessTime } from "@mui/icons-material";

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
  srcOffset,
  destOffset,
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

  const titleCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
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
        srcOffset,
        destOffset,
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
          <MDTypography variant="h4" fontWeight="bold" sx={{ mr: -4, ml: 2 }}>
            {departure}
            <MDTypography
              variant="overline"
              verticalAlign="super"
              sx={{ fontSize: "0.6rem" }}
            >
              {srcOffset[0] !== "-"
                ? `(+${srcOffset.substring(0, 5)})`
                : `(${srcOffset.substring(0, 6)})`}
            </MDTypography>
          </MDTypography>
          <MDTypography
            variant="caption"
            color={delay !== "00:00:00" ? "error" : "success"}
          >
            {delay !== "00:00:00" ? `Delayed by ${delay}` : `On Time`}
          </MDTypography>
          <MDTypography variant="h6" fontWeight="light">
            {titleCase(srcCity)}
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
          <AccessTime />
          {/* <Divider flexItem> */}
          <MDTypography variant="body2" fontWeight="medium" color="secondary">
            {`${duration.substring(0, 2)}hr ${duration.substring(3, 5)}min`}
          </MDTypography>
          {/* </Divider> */}
          {/* &nbsp;&nbsp; */}
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
          <MDTypography variant="h4" fontWeight="bold" sx={{ mr: -4, ml: 2 }}>
            {arrival}
            <MDTypography
              variant="overline"
              verticalAlign="super"
              sx={{ fontSize: "0.6rem" }}
            >
              {destOffset[0] !== "-"
                ? `(+${destOffset.substring(0, 5)})`
                : `(${destOffset.substring(0, 6)})`}
            </MDTypography>
          </MDTypography>
          <MDTypography variant="h6" fontWeight="light">
            {titleCase(destCity)}
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
          <MDTypography fontWeight="bold">&#8377; {fare}</MDTypography>
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
          flexDirection={"column"}
          spacing={1}
        >
          <Grid item md={4} lg={12}>
            <MDButton
              variant="gradient"
              color="dark"
              sx={{ background: "#002D62" }}
              size={canWrite == true ? "small" : "medium"}
              onClick={navigateToBooking}
            >
              <AirplaneTicketIcon></AirplaneTicketIcon>&nbsp;BOOK
            </MDButton>
          </Grid>
          {/* <Grid
            container
            item
            display="flex"
            alignItems="center"
            justifyContent={"center"}
            spacing={5}
          > */}
          {canWrite === true && (
            <Grid item md={4} lg={12}>
              <Dialog
                title="Delay Flight"
                action={
                  <MDButton
                    variant="gradient"
                    //sx={{ background: "#088F8F" }}
                    color="dark"
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
                variant="gradient"
                color="dark"
                size={canWrite == true ? "small" : "large"}
                onClick={cancelConfirmation}
              >
                &nbsp;CANCEL
              </MDButton>
            </Grid>
          )}
          {/* </Grid> */}
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
