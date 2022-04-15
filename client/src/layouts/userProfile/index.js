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
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "layouts/userProfile/components/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/userProfile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

function Overview() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        {/* <MDBox mt={5} mb={3}> */}
        <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
          <ProfileInfoCard
            customerId="finchy_boy"
            customerName="Aaron Finch"
            gender="O"
            dob="01-01-1990"
            email="finchy234@gmail.com"
            countryCode="91"
            phoneNo="1234567890"
            address="ABC City, XYZ street"
            shadow={true}
          />
        </Grid>
        {/* <Divider
              orientation="horizontal"
              sx={{ mx: 10, height: "1px", background: "gray" }}
            />
            <Grid item xs={12}>
              <Grid container spacing={2} textAlign="center">
                <Grid item xs={6}>
                  <MDButton size="large">Upcoming Journeys</MDButton>
                </Grid>
                <Grid item xs={6}>
                  <MDButton size="large">Archive</MDButton>
                </Grid>
              </Grid>
              <Grid>
                <Ticket
                  srcId="DEL"
                  srcCity="New Delhi"
                  destId="HYD"
                  destCity="Hyderabad"
                  departure="10:40"
                  arrival="13:00"
                  duration="2hr 20min"
                  fare="6500"
                  passengerName="Dr. Padmalochan Bera"
                  bookedDate="10-04-2022"
                  isUpcoming={true}
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
                  passengerName="Dr. Padmalochan Bera"
                  bookedDate="10-04-2022"
                  isUpcoming={false}
                  isCancelled={false}
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
                  passengerName="Dr. Padmalochan Bera"
                  bookedDate="10-04-2022"
                  isUpcoming={false}
                  isCancelled={true}
                  cancelledDate="14-04-2022"
                />
              </Grid>
            </Grid> */}
        {/* </MDBox> */}
      </Header>
    </DashboardLayout>
  );
}

export default Overview;
