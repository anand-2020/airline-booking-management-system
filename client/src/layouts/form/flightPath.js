import React, { useState, useContext, useEffect } from "react";
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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Autocomplete from "@mui/material/Autocomplete";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import axios from "axiosInstance";
import Spinner from "components/Spinner";
import { getLinearProgressUtilityClass } from "@mui/material";

const theme = createTheme();

export default function FlightPath({ handleClose }) {
  const [airports, setAirports] = useState([]);
  const [flightId, setFlightId] = useState("");
  const [srcId, setSrcId] = useState("");
  const [destId, setDestId] = useState("");
  const [deptTime, setDeptTime] = useState(null);
  const [baseFare, setBaseFare] = useState(null);
  const [durHour, setDurHour] = useState("");
  const [durMin, setDurMin] = useState("");
  const [rows, setRows] = useState(null);
  const [cols, setCols] = useState(null);
  const [leaseDate, setLeaseDate] = useState(null);
  const [weekDays, setWeekDays] = useState(() => []);
  const [loading, setLoading] = useState(false);

  const handleWeekDays = (event, newWeekDays) => {
    setWeekDays(newWeekDays);
  };

  const getAirports = () => {
    axios
      .get(`airport`)
      .then((res) => {
        console.log(res.data.data);
        setAirports(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAirports();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    let days_string = "";
    const weekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    weekNames.forEach((day) => {
      if (weekDays.includes(day)) days_string += "1";
      else days_string += "0";
    });

    const leaseDateString = new Date(
      new Date(leaseDate).getTime() -
        new Date(leaseDate).getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];

    const dt = new Date(deptTime);

    const deptTimeString = `${dt.getUTCHours()}:${dt.getUTCMinutes()}:${dt.getUTCSeconds()}`;

    const data = {
      FLIGHT_ID: flightId,
      SRC_ID: srcId,
      DEST_ID: destId,
      DEPARTURE_TIME: deptTimeString,
      DURATION: `${durHour}:${durMin}:00`,
      NUM_ROWS: rows,
      NUM_COLS: cols,
      BASE_FARE: baseFare,
      LEASE_EXPIRY: leaseDateString,
      DAYS_STRING: days_string,
    };

    axios
      .post(`flight`, data)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        handleClose();
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false);
        handleClose();
      });
  };

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
                  value={flightId}
                  onChange={(e) => setFlightId(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={airports}
                  groupBy={(option) => option.COUNTRY}
                  getOptionLabel={(option) => option.CITY}
                  onChange={(event, value) => {
                    setSrcId(value.AIRPORT_ID);
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
                  options={airports}
                  groupBy={(option) => option.COUNTRY}
                  getOptionLabel={(option) => option.CITY}
                  onChange={(event, value) => {
                    setDestId(value.AIRPORT_ID);
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
                  value={baseFare}
                  onChange={(e) => setBaseFare(e.target.value)}
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
                  value={durHour}
                  onChange={(e) => setDurHour(e.target.value)}
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
                  value={durMin}
                  onChange={(e) => setDurMin(e.target.value)}
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
                  value={rows}
                  onChange={(e) => setRows(e.target.value)}
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
                  value={cols}
                  onChange={(e) => setCols(e.target.value)}
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
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    inputFormat="dd/MM/yyyy"
                    value={leaseDate}
                    onChange={(newDate) => setLeaseDate(newDate)}
                    minDate={new Date()}
                    label="Lease Date"
                    id="dob"
                    name="dob"
                    fullWidth
                    renderInput={(params) => (
                      <TextField fullWidth required {...params} />
                    )}
                  />
                </LocalizationProvider>
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
                // onClick={handleSubmit}
              >
                ADD FLIGHT
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
