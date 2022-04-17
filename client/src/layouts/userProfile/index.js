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
import { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthContext from "authContext";

function Overview() {
  const { authenticated, currentUser } = useContext(AuthContext);
  return (
    <>
      {authenticated === true ? (
        <DashboardLayout>
          <DashboardNavbar />
          <MDBox mb={2} />
          <Header>
            {/* <MDBox mt={5} mb={3}> */}
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <ProfileInfoCard
                customerId={currentUser.CUSTOMER_ID}
                customerName={currentUser.CUSTOMER_NAME}
                gender={currentUser.GENDER}
                dob={
                  new Date(
                    new Date(currentUser.DOB).getTime() -
                      new Date(currentUser.DOB).getTimezoneOffset() * 60 * 1000
                  )
                    .toISOString()
                    .split("T")[0]
                }
                email={currentUser.EMAIL_ID}
                countryCode={currentUser.COUNTRY_CODE}
                phoneNo={currentUser.PHONE_NO}
                address={currentUser.ADDRESS}
                shadow={true}
              />
            </Grid>
          </Header>
          <Footer />
        </DashboardLayout>
      ) : (
        <Navigate replace to="/dashboard" />
      )}
    </>
  );
}

export default Overview;
