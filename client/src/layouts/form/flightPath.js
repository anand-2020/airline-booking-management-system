import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CountryCode from "layouts/form/data/countryCode.js";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Autocomplete from "@mui/material/Autocomplete";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const theme = createTheme();

export default function FlightPath() {
  const [weekDays, setWeekDays] = React.useState(() => ["Sun", "Fri"]);
  const [deptTime, setDeptTime] = React.useState(null);

  const handleWeekDays = (event, newWeekDays) => {
    setWeekDays(newWeekDays);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const cities = [
    {
      AIRPORT_ID: 1,
      AIRPORT_NAME: "AIRPORTX",
      CITY: "DELHI",
      COUNTRY: "INDIA",
    },
    {
      AIRPORT_ID: 2,
      AIRPORT_NAME: "AIRPORTY",
      CITY: "NAGPUR",
      COUNTRY: "INDIA",
    },
    {
      AIRPORT_ID: 3,
      AIRPORT_NAME: "AIRPORTZ",
      CITY: "KOLKATA",
      COUNTRY: "INDIA",
    },
    {
      AIRPORT_ID: 4,
      AIRPORT_NAME: "AIRPORTA",
      CITY: "NEW YORK",
      COUNTRY: "USA",
    },
    {
      AIRPORT_ID: 5,
      AIRPORT_NAME: "AIRPORTB",
      CITY: "LONDON",
      COUNTRY: "ENGLAND",
    },
    {
      AIRPORT_ID: 6,
      AIRPORT_NAME: "AIRPORTC",
      CITY: "DUBLIN",
      COUNTRY: "IRELAND",
    },
  ];

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
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid
              container
              spacing={3}
              display="flex"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="flightID"
                  label="Flight ID"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={cities}
                  groupBy={(option) => option.COUNTRY}
                  getOptionLabel={(option) => option.CITY}
                  sx={{
                    "& .MuiAutocomplete-input": {
                      fontSize: 20,
                      color: "#ffffff",
                      fontWeight: "bold",
                      textAlign: "center",
                      borderWidth: 5,
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      required
                      fullWidth
                      id="source"
                      label="Source"
                      {...params}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={cities}
                  groupBy={(option) => option.COUNTRY}
                  getOptionLabel={(option) => option.CITY}
                  sx={{
                    "& .MuiAutocomplete-input": {
                      fontSize: 20,
                      color: "#ffffff",
                      fontWeight: "bold",
                      textAlign: "center",
                      borderWidth: 5,
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      required
                      fullWidth
                      id="destination"
                      label="Destination"
                      {...params}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    value={deptTime}
                    onChange={(newTime) => {
                      setDeptTime(newTime);
                    }}
                    label="Departure Time"
                    renderInput={(params) => (
                      <TextField
                        required
                        fullWidth
                        id="departureTime"
                        label="Departure Time"
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="baseFare"
                  required
                  fullWidth
                  id="baseFare"
                  label="Base Fare"
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sx={{ mb: -1.8 }}>
                <Typography> Duration </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="hour"
                  label="Hour"
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="minutes"
                  required
                  fullWidth
                  id="minutes"
                  label="Minutes"
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sx={{ mb: -1.8 }}>
                <Typography> Capacity </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="rows"
                  label="Rows"
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="minutes"
                  required
                  fullWidth
                  id="columns"
                  label="Columns"
                  type="number"
                />
              </Grid>

              <Grid item xs={12} sx={{ mb: -1.8 }}>
                <Typography> Week Days </Typography>
              </Grid>
              <Grid item xs={12}>
                <ToggleButtonGroup
                  value={weekDays}
                  onChange={handleWeekDays}
                  aria-label="week-days"
                >
                  <ToggleButton
                    sx={{ width: "40px" }}
                    value="Sun"
                    aria-label="Sun"
                    color="primary"
                  >
                    S
                  </ToggleButton>
                  <ToggleButton
                    sx={{ width: "40px" }}
                    value="Mon"
                    aria-label="Mon"
                    color="primary"
                  >
                    M
                  </ToggleButton>
                  <ToggleButton
                    sx={{ width: "40px" }}
                    value="Tue"
                    aria-label="Tue"
                    color="primary"
                  >
                    T
                  </ToggleButton>
                  <ToggleButton
                    sx={{ width: "40px" }}
                    value="Wed"
                    aria-label="Wed"
                    color="primary"
                  >
                    W
                  </ToggleButton>
                  <ToggleButton
                    sx={{ width: "40px" }}
                    value="Thu"
                    aria-label="Thu"
                    color="primary"
                  >
                    T
                  </ToggleButton>
                  <ToggleButton
                    sx={{ width: "40px" }}
                    value="Fri"
                    aria-label="Fri"
                    color="primary"
                  >
                    F
                  </ToggleButton>
                  <ToggleButton
                    sx={{ width: "40px" }}
                    value="Sat"
                    aria-label="Sat"
                    color="primary"
                  >
                    S
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ADD FLIGHT
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
