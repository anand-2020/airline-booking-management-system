import * as React from "react";
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

const theme = createTheme();

export default function FlightDays() {
  const [weekDays, setWeekDays] = React.useState(() => ["Sun", "Fri"]);

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
              spacing={2}
              display="flex"
              alignItems="center"
              justify="center"
            >
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
              APPLY CHANGES
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
