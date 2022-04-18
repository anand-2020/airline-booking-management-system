import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CountryCode from "layouts/form/data/countryCode.js";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Chip, Stack, Grid, Divider, Icon, IconButton } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import axios from "axiosInstance";
import Spinner from "components/Spinner";
import MDTypography from "components/MDTypography";

const theme = createTheme();

export default function FlightDays({
  flightID,
  daysString,
  updateWeekDays,
  handleClose,
}) {
  const [weekDays, setWeekDays] = useState(() => []);
  const [loading, setLoading] = useState(false);
  const weekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleWeekDays = (event, newWeekDays) => {
    setWeekDays(newWeekDays);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (weekDays.length === 0) {
      window.alert("Select at least one day");
      return;
    }
    setLoading(true);
    let newDaysString = "";
    weekNames.forEach((day) => {
      if (weekDays.includes(day)) newDaysString += "1";
      else newDaysString += "0";
    });
    //TODO: axios request

    updateWeekDays(newDaysString);
    setLoading(false);
    handleClose();
  };

  useEffect(() => {
    let currWeekDays = [];
    for (var idx = 0; idx < 7; idx++) {
      if (daysString[idx] === "1") currWeekDays.push(weekNames[idx]);
    }

    setWeekDays(currWeekDays);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid
              container
              spacing={2}
              display="flex"
              alignItems="center"
              justify="center"
            >
              <Grid
                item
                xs={12}
                display="flex"
                alignItems="center"
                justifyContent={"center"}
              >
                <MDTypography fontWeight="regular" fontSize="medium">
                  Flight ID -&nbsp;
                </MDTypography>
                <MDTypography fontWeight="bold" color="dark" fontSize="medium">
                  {flightID}
                </MDTypography>
              </Grid>
              <Grid
                item
                xs={12}
                display="flex"
                alignItems="center"
                justifyContent={"center"}
              >
                <ToggleButtonGroup
                  value={weekDays}
                  onChange={handleWeekDays}
                  aria-label="week-days"
                >
                  <ToggleButton
                    sx={{ width: "40px" }}
                    value="Sun"
                    aria-label="Sun"
                    disabled={daysString[0] === "1" ? true : false}
                    color="primary"
                  >
                    S
                  </ToggleButton>
                  <ToggleButton
                    sx={{ width: "40px" }}
                    value="Mon"
                    aria-label="Mon"
                    color="primary"
                    disabled={daysString[1] === "1" ? true : false}
                  >
                    M
                  </ToggleButton>
                  <ToggleButton
                    sx={{ width: "40px" }}
                    value="Tue"
                    aria-label="Tue"
                    color="primary"
                    disabled={daysString[2] === "1" ? true : false}
                  >
                    T
                  </ToggleButton>
                  <ToggleButton
                    sx={{ width: "40px" }}
                    value="Wed"
                    aria-label="Wed"
                    color="primary"
                    disabled={daysString[3] === "1" ? true : false}
                  >
                    W
                  </ToggleButton>
                  <ToggleButton
                    sx={{ width: "40px" }}
                    value="Thu"
                    aria-label="Thu"
                    color="primary"
                    disabled={daysString[4] === "1" ? true : false}
                  >
                    T
                  </ToggleButton>
                  <ToggleButton
                    sx={{ width: "40px" }}
                    value="Fri"
                    aria-label="Fri"
                    color="primary"
                    disabled={daysString[5] === "1" ? true : false}
                  >
                    F
                  </ToggleButton>
                  <ToggleButton
                    sx={{ width: "40px" }}
                    value="Sat"
                    aria-label="Sat"
                    color="primary"
                    disabled={daysString[6] === "1" ? true : false}
                  >
                    S
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
            {loading === true ? (
              <Spinner />
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                APPLY CHANGES
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
