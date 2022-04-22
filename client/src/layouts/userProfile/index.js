import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "layouts/userProfile/components/ProfileInfoCard";
import Header from "layouts/userProfile/components/Header";
import { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthContext from "authContext";

function Profile() {
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
                // isAdmin={currentUser.ROLE !== "N" ? true : false}
                profession={currentUser.PROFESSION}
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

export default Profile;
