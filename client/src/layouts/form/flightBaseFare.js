import React, { useState, useEffect } from "react";
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
import axios from "axiosInstance";
import Spinner from "components/Spinner";
import MDTypography from "components/MDTypography";

const theme = createTheme();

export default function BaseFare({ flightID, fare, updateFare, handleClose }) {
  const [baseFare, setBaseFare] = useState(fare);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    axios
      .patch(`flight/${flightID}`, { BASE_FARE: baseFare })
      .then((res) => {
        console.log(res);
        setLoading(false);
        updateFare(baseFare);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        handleClose();
      });
  };

  //   useEffect(() => {
  //     console.log(fare);
  //   }, []);

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
            <Grid container spacing={2}>
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
                <Grid item xs={12}>
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
