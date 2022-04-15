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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const theme = createTheme();

export default function UserInfo() {
  const [gender, setGender] = React.useState();
  const [countryCode, setCountryCode] = React.useState();
  const [dateValue, setDateValue] = React.useState();

  const handleDateChange = (newDate) => {
    setDateValue(newDate);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
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
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="gender"
                  select
                  label="Gender"
                  value={gender}
                  onChange={handleGenderChange}
                >
                  {[
                    { value: "M", label: "Male" },
                    { value: "F", label: "Female" },
                    { value: "O", label: "Others" },
                  ].map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    // label="Date of Journey"
                    inputFormat="dd/MM/yyyy"
                    value={dateValue}
                    onChange={handleDateChange}
                    maxDate={new Date()}
                    // defaultValue={dateValue}
                    label="Birth Date"
                    id="dob"
                    name="dob"
                    fullWidth
                    renderInput={(params) => <TextField required {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="countryCode"
                  required
                  fullWidth
                  select
                  id="CountryCode"
                  label="Country Code"
                  value={countryCode}
                  onChange={handleCountryCodeChange}
                >
                  {CountryCode.map((option) => (
                    <MenuItem key={option.dial_code} value={option.dial_code}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  name="contactNo"
                  required
                  fullWidth
                  id="contactNo"
                  label="Contact Number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  id="address"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              SAVE CHANGES
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
