import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Chip, Stack, Grid, Divider, IconButton } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import Collapse from "@mui/material/Collapse";
import { useState, useContext } from "react";

import Dialog from "layouts/dialog";
import FlightDays from "layouts/form/flightDays";
import LeaseDate from "layouts/form/leaseDate";
import BaseFare from "layouts/form/flightBaseFare";
import AuthContext from "authContext";

function Transaction({
  color,
  icon,
  flightID,
  baseFare,
  daysString,
  deptTime,
  destLoc,
  destID,
  duration,
  leaseExpiry,
  seatMap,
  srcLoc,
  srcID,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [weekDays, setWeekDays] = useState(daysString);
  const [leaseExpiryDate, setLeaseExpiryDate] = useState(leaseExpiry);
  const [fare, setFare] = useState(baseFare);
  const { canWrite } = useContext(AuthContext);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const updateWeekDays = (newDaysString) => {
    setWeekDays(newDaysString);
  };

  const updateLeaseExpiryDate = (newDate) => {
    setLeaseExpiryDate(newDate);
  };

  const updateFare = (newFare) => {
    setFare(newFare);
  };

  const getLocation = (address) => {
    return address.split(",")[1] + "," + address.split(",")[2];
  };

  const flightDetails = (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      spacing={0}
      pt={2}
    >
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        display="flex"
        alignItems="center"
        justifyContent={"center"}
      >
        <MDTypography fontWeight="bold" fontSize="medium">
          SRC -&nbsp;
        </MDTypography>
        <MDTypography fontWeight="normal" color="secondary" fontSize="medium">
          {`${getLocation(srcLoc)} `}
          {/* {srcLoc} */}
        </MDTypography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        display="flex"
        alignItems="center"
        justifyContent={"center"}
      >
        <MDTypography fontWeight="bold" fontSize="medium">
          DEST -&nbsp;
        </MDTypography>
        <MDTypography fontWeight="normal" color="secondary" fontSize="medium">
          {`${getLocation(destLoc)} `}
          {/* {destLoc} */}
        </MDTypography>
      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        display="flex"
        alignItems="center"
        justifyContent={"center"}
      >
        <MDTypography fontWeight="bold" fontSize="medium">
          Duration -&nbsp;
        </MDTypography>
        <MDTypography fontWeight="normal" color="secondary" fontSize="medium">
          {`${duration.substring(0, 2)}hr ${duration.substring(3, 5)}min`}
        </MDTypography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        display="flex"
        alignItems="center"
        justifyContent={"center"}
      >
        <MDTypography fontWeight="bold" fontSize="medium">
          Departure Time -&nbsp;
        </MDTypography>
        <MDTypography fontWeight="normal" color="secondary" fontSize="medium">
          {deptTime.substring(0, 5)}
        </MDTypography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        display="flex"
        alignItems="center"
        justifyContent={"center"}
      >
        <MDTypography fontWeight="bold" fontSize="medium">
          Lease Expires On -&nbsp;
        </MDTypography>
        <MDTypography fontWeight="normal" color="secondary" fontSize="medium">
          {new Date(
            new Date(leaseExpiryDate).getTime() -
              new Date(leaseExpiryDate).getTimezoneOffset() * 60 * 1000
          )
            .toISOString()
            .split("T")[0]
            .substring(0, 10)}
        </MDTypography>
        &nbsp;
        {canWrite && (
          <Dialog
            title="Edit Lease Date"
            action={
              <IconButton
                variant="outlined"
                color={color}
                iconOnly
                circular
                size="small"
              >
                <Icon sx={{ fontWeight: "bold" }}>{"edit"}</Icon>
              </IconButton>
            }
          >
            <LeaseDate
              flightID={flightID}
              leaseDate={leaseExpiryDate}
              updateLeaseDate={(newDate) => {
                updateLeaseExpiryDate(newDate);
              }}
            />
          </Dialog>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        display="flex"
        alignItems="center"
        justifyContent={"center"}
      >
        <MDTypography fontWeight="bold" fontSize="medium">
          Seat Map -&nbsp;
        </MDTypography>
        <MDTypography fontWeight="normal" color="secondary" fontSize="medium">
          {seatMap}
        </MDTypography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        display="flex"
        alignItems="center"
        justifyContent={"center"}
      >
        <MDTypography fontWeight="bold" fontSize="medium">
          Base Fare -&nbsp;
        </MDTypography>
        <MDTypography fontWeight="normal" color="secondary" fontSize="medium">
          &#8377; {fare}
        </MDTypography>
        &nbsp;
        {canWrite && (
          <Dialog
            title="Edit Base Fare"
            action={
              <IconButton
                variant="outlined"
                color={color}
                iconOnly
                circular
                size="small"
              >
                <Icon sx={{ fontWeight: "bold" }}>{"edit"}</Icon>
              </IconButton>
            }
          >
            <BaseFare
              flightID={flightID}
              fare={fare}
              updateFare={(newFare) => {
                updateFare(newFare);
              }}
            />
          </Dialog>
        )}
      </Grid>
    </Grid>
  );

  return (
    <MDBox key={flightID} component="li" py={0} px={2} mb={0}>
      <Grid
        container
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12} sm={6} display="flex" alignItems="center">
          <MDBox mr={2}>
            <MDButton
              variant="contained"
              color={color}
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
          <MDBox display="flex" flexDirection="column">
            <MDTypography fontWeight="medium" variant="h4" gutterBottom>
              {flightID}
            </MDTypography>
            <MDTypography variant="caption" color="text" fontWeight="regular">
              {`${srcID} - ${destID}`}
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid item alignItems="center" ml={{ sm: 0, xs: 2 }}>
          <Stack direction="row" spacing={1}>
            <Chip
              label="S"
              color="secondary"
              variant={weekDays[0] === "1" ? "filled" : "outlined"}
              size="small"
            />
            <Chip
              label="M"
              color="secondary"
              variant={weekDays[1] === "1" ? "filled" : "outlined"}
              size="small"
            />
            <Chip
              label="T"
              color="secondary"
              variant={weekDays[2] === "1" ? "filled" : "outlined"}
              size="small"
            />
            <Chip
              label="W"
              color="secondary"
              variant={weekDays[3] === "1" ? "filled" : "outlined"}
              size="small"
            />
            <Chip
              label="T"
              color="secondary"
              variant={weekDays[4] === "1" ? "filled" : "outlined"}
              size="small"
            />
            <Chip
              label="F"
              color="secondary"
              variant={weekDays[5] === "1" ? "filled" : "outlined"}
              size="small"
            />
            <Chip
              label="S"
              color="secondary"
              variant={weekDays[6] === "1" ? "filled" : "outlined"}
              size="small"
            />
            {canWrite && (
              <Dialog
                title="Edit Flight Days"
                action={
                  <IconButton
                    variant="outlined"
                    color={color}
                    iconOnly
                    circular
                    size="small"
                  >
                    <Icon sx={{ fontWeight: "bold" }}>{"edit"}</Icon>
                  </IconButton>
                }
              >
                <FlightDays
                  flightID={flightID}
                  daysString={weekDays}
                  updateWeekDays={(str) => updateWeekDays(str)}
                />
              </Dialog>
            )}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Collapse in={collapsed}>{flightDetails}</Collapse>
        </Grid>
      </Grid>
    </MDBox>
  );
}

// Typechecking props of the Transaction
Transaction.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]).isRequired,
  icon: PropTypes.node.isRequired,
  flightID: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Transaction;
