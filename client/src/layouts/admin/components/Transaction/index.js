/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Chip, Stack, Grid, Divider, IconButton } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import Collapse from "@mui/material/Collapse";
import { useState } from "react";

function Transaction({ color, icon, flightID, description, value }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
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
          Delhi, India - DEL
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
          Hyderabad, India - HYD
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
          2h 20min
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
          13:40
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
          13/10/2030
        </MDTypography>
        &nbsp;
        <IconButton
          variant="outlined"
          color={color}
          iconOnly
          circular
          size="small"
        >
          <Icon sx={{ fontWeight: "bold" }}>{"edit"}</Icon>
        </IconButton>
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
          8 X 5
        </MDTypography>
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
            <MDTypography
              variant="button"
              fontWeight="medium"
              gutterBottom
              variant="h4"
            >
              {flightID}
            </MDTypography>
            <MDTypography variant="caption" color="text" fontWeight="regular">
              {description}
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid item alignItems="center" ml={{ sm: 0, xs: 2 }}>
          <Stack direction="row" spacing={1}>
            <Chip label="S" color="secondary" variant="outlined" size="small" />
            <Chip label="M" color="secondary" variant="filled" size="small" />
            <Chip label="T" color="secondary" variant="outlined" size="small" />
            <Chip label="W" color="secondary" variant="outlined" size="small" />
            <Chip label="T" color="secondary" variant="filled" size="small" />
            <Chip label="F" color="secondary" variant="outlined" size="small" />
            <Chip label="S" color="secondary" variant="outlined" size="small" />

            <IconButton
              variant="outlined"
              color={color}
              iconOnly
              circular
              size="small"
            >
              <Icon sx={{ fontWeight: "bold" }}>{"edit"}</Icon>
            </IconButton>
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
