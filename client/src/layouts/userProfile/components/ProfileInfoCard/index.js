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

// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import PersonIcon from "@mui/icons-material/Person";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EventNoteIcon from "@mui/icons-material/EventNote";
import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";

// Material Dashboard 2 React components
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import Dialog from "layouts/dialog";
import UserInfo from "layouts/form/userInfo";

import DialCode from "../../../form/data/dialCode.js";
import AuthContext from "authContext";
import { useState, useContext, useEffect } from "react";

function ProfileInfoCard({
  customerId,
  customerName,
  gender,
  dob,
  countryCode,
  phoneNo,
  email,
  address,
  profession,
  shadow,
}) {
  const { authenticated, currentUser, canRead, canWrite } =
    useContext(AuthContext);

  return (
    <Grid container>
      <Grid container direction="column" xs={12} alignItems="center">
        <MDAvatar
          alt="profile-image"
          size="xl"
          shadow="sm"
          bgColor="info"
          sx={{
            position: "relative",
            mt: -6,
            mx: 3,
            py: 2,
            px: 2,
          }}
        />
        <MDTypography
          variant="h5"
          fontWeight="medium"
          textAlign="center"
          sx={{ mt: 2 }}
        >
          @{customerId}
        </MDTypography>
        {canRead == true || (canRead === false && profession !== "OTHER") ? (
          <MDTypography
            variant="overline"
            fontWeight="regular"
            textAlign="center"
            sx={{ mb: 5 }}
          >
            {canWrite
              ? "(SUPER-ADMIN)"
              : canRead
              ? "(ADMIN)"
              : `(${profession})`}
          </MDTypography>
        ) : null}
      </Grid>

      <Grid
        container
        direction={{ xs: "column", sm: "row" }}
        display="flex"
        xs={12}
        alignItems="flex-start"
      >
        <Grid item xs={6}>
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText sx={{ ml: -3 }}>
                <MDTypography variant="h6" fontWeight="medium">
                  {customerName}
                </MDTypography>
              </ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <EventNoteIcon />
              </ListItemIcon>
              <ListItemText sx={{ ml: -3 }}>
                <MDTypography variant="h6" fontWeight="medium">
                  {/* {dob} */}
                  {dob.substring(0, 10)}
                </MDTypography>
              </ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                {gender === "M" ? (
                  <MaleIcon />
                ) : gender === "F" ? (
                  <FemaleIcon />
                ) : (
                  <TransgenderIcon />
                )}
              </ListItemIcon>
              <ListItemText sx={{ ml: -3 }}>
                <MDTypography variant="h6" fontWeight="medium">
                  {gender}
                </MDTypography>
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6}>
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <PhoneAndroidIcon />
              </ListItemIcon>
              <ListItemText sx={{ ml: -3 }}>
                <MDTypography variant="h6" fontWeight="medium">
                  ({DialCode.get(countryCode)})&nbsp;{phoneNo}
                </MDTypography>
              </ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText sx={{ ml: -3 }}>
                <MDTypography variant="h6" fontWeight="medium">
                  {email}
                </MDTypography>
              </ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText sx={{ ml: -3 }}>
                <MDTypography variant="h6" fontWeight="medium">
                  {address}
                </MDTypography>
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
        sx={{ mt: 3 }}
      >
        <Dialog
          title="Edit Personal Information"
          action={
            <MDButton variant="outlined" color="info">
              <EditIcon />
              &nbsp;Edit
            </MDButton>
          }
        >
          <UserInfo />
        </Dialog>
      </Grid>

      {/* <Grid container display="flex" xs={12} alignItems="flex-start">
        <Grid display="flex" container xs={6} direction="column">
          <Grid display="flex">
            <PersonIcon></PersonIcon>
            <MDTypography variant="h6" fontWeight="light" verticalAlign="top">
              {customerName}
            </MDTypography>
          </Grid>
          <Grid display="flex">
            <EventNoteIcon></EventNoteIcon>
            {dob}
          </Grid>
          <Grid display="flex">
            <MaleIcon></MaleIcon>
          </Grid>
        </Grid>
        <Grid display="flex" container xs={6} direction="column">
          <Grid display="flex">
            <PhoneAndroidIcon></PhoneAndroidIcon>
            {countryCode} {phoneNo}
          </Grid>
          <Grid display="flex">
            <EmailIcon></EmailIcon>
            {email}
          </Grid>
          <Grid display="flex">
            <HomeIcon></HomeIcon>
            {address}
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  );
}

// Setting default props for the ProfileInfoCard
ProfileInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  shadow: PropTypes.bool,
};

export default ProfileInfoCard;
