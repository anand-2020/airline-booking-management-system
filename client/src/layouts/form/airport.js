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

export default function Airport({ handleClose }) {
  const [airportId, setAirportId] = useState("");
  const [airportName, setAirportName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [offsetHour, setOffsetHour] = useState(null);
  const [offsetMin, setOffsetMin] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const data = {
      AIRPORT_ID: airportId.toUpperCase(),
      AIRPORT_NAME: airportName.toUpperCase(),
      CITY: city.toUpperCase(),
      COUNTRY: country.toUpperCase(),
      OFFSET: `${offsetHour}:${offsetMin}:00`,
    };

    axios
      .post(`airport`, data)
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
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="airportId"
                  label="Airport ID"
                  value={airportId}
                  onChange={(e) => setAirportId(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  required
                  fullWidth
                  id="airportName"
                  label="Airport Name"
                  value={airportName}
                  onChange={(e) => setAirportName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="country"
                  label="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sx={{ mb: -1.8 }}>
                <Typography> Offset </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  id="offsetHour"
                  label="Hour"
                  value={offsetHour}
                  onChange={(e) => setOffsetHour(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  id="offsetMin"
                  label="Minutes"
                  value={offsetMin}
                  onChange={(e) => setOffsetMin(e.target.value)}
                />
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
                ADD AIRPORT
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
