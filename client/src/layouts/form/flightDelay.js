import React, { useState } from "react";
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
import Spinner from "components/Spinner";
import moment from "moment";
import MDTypography from "components/MDTypography";

const theme = createTheme();

export default function FlightDelay(props) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const delayString = `${hours}:${minutes}:00`;
    props.addDelay(delayString, props.flightDateId);
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
              {props.flightId}
            </MDTypography>
          </Grid>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            {loading ? (
              <Spinner />
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="name"
                    required
                    fullWidth
                    id="hour"
                    label="Hour"
                    autoFocus
                    type="number"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
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
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                  />
                </Grid>
              </Grid>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={hours < 0 || minutes < 0 || loading}
              onClick={(e) => handleSubmit(e)}
            >
              APPLY CHANGES
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
