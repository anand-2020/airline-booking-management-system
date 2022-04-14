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

// @mui material components
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Billing page components
import Ticket from "layouts/tickets/components/Ticket";

function TicketInformation() {
  return (
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <Stack direction="row" spacing="auto" textAlign="center">
          <MDButton variant="contained" color="secondary" size="medium">
            14/04/2022
          </MDButton>
          <MDButton variant="contained" color="secondary" size="medium">
            15/04/2022
          </MDButton>
          <MDButton variant="contained" color="secondary" size="medium">
            16/04/2022
          </MDButton>
          <MDButton variant="contained" color="secondary" size="medium">
            17/04/2022
          </MDButton>
        </Stack>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Ticket
            srcId="DEL"
            srcCity="New Delhi"
            destId="HYD"
            destCity="Hyderabad"
            departure="10:40"
            arrival="13:00"
            duration="2hr 20min"
            fare="6500"
          />
          <Ticket
            srcId="DEL"
            srcCity="New Delhi"
            destId="HYD"
            destCity="Hyderabad"
            departure="10:40"
            arrival="13:00"
            duration="2hr 20min"
            fare="6500"
          />
          <Ticket
            srcId="DEL"
            srcCity="New Delhi"
            destId="HYD"
            destCity="Hyderabad"
            departure="10:40"
            arrival="13:00"
            duration="2hr 20min"
            fare="6500"
            noGutter
          />
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default TicketInformation;
