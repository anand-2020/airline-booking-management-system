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
import Stack from "@mui/material/Stack";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

function Ticket({
  srcId,
  srcCity,
  destId,
  destCity,
  departure,
  arrival,
  duration,
  fare,
  noGutter,
}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bgColor={darkMode ? "transparent" : "grey-200"}
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <MDBox display="flex" alignItems="center">
        <Stack spacing={0} textAlign="center">
          <MDTypography fontWeight="medium">{srcId}</MDTypography>
          <MDTypography variant="h4" fontWeight="bold">
            {departure}
          </MDTypography>
          <MDTypography variant="h6" fontWeight="light">
            {srcCity}
          </MDTypography>
        </Stack>
      </MDBox>

      <MDBox display="flex" alignItems="center">
        <Stack spacing={0} textAlign="center">
          <MDTypography variant="h6" fontWeight="light">
            {duration}
          </MDTypography>
          <hr
            style={{
              color: "black",
              backgroundColor: "black",
              borderWidth: 0,
              height: 3,
            }}
          />
        </Stack>
      </MDBox>

      <MDBox display="flex" alignItems="center">
        <Stack spacing={0} textAlign="center">
          <MDTypography fontWeight="medium">{destId}</MDTypography>
          <MDTypography variant="h4" fontWeight="bold">
            {arrival}
          </MDTypography>
          <MDTypography variant="h6" fontWeight="light">
            {destCity}
          </MDTypography>
        </Stack>
      </MDBox>

      <MDBox display="flex" alignItems="center">
        <MDTypography fontWeight="bold">&#8377;{fare}</MDTypography>
      </MDBox>

      <MDBox display="flex" alignItems="center">
        <MDButton variant="contained" color="primary" size="large">
          <AirplaneTicketIcon></AirplaneTicketIcon>&nbsp;BOOK
        </MDButton>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Bill
Ticket.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
Ticket.propTypes = {
  srcId: PropTypes.string.isRequired,
  srcCity: PropTypes.string.isRequired,
  destId: PropTypes.string.isRequired,
  destCity: PropTypes.string.isRequired,
  departure: PropTypes.string.isRequired,
  arrival: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  fare: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Ticket;
