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
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import { EventSeat, EventSeatOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

// Data
import authorsTableData from "layouts/booking/data/authorsTableData";
import projectsTableData from "layouts/booking/data/projectsTableData";
import PaymentMethod from "layouts/booking/components/PaymentMethod";
import { useEffect, useState } from "react";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";

const Tables = () => {
  const [seatData, setSeatData] = useState([[]]);
  const [passengerDetails, setPassengerDetails] = useState([]);

  const addPassenger = () => {
    const curr = [...passengerDetails];
    curr.push("");
    setPassengerDetails(curr);
  };

  const removePassenger = () => {
    const curr = [...passengerDetails];
    curr.pop();
    setPassengerDetails(curr);
  };

  const handleSeatClick = (row, col) => {
    let localSeatData = new Array(seatData.length);
    for (let i = 0; i < localSeatData.length; i++)
      localSeatData[i] = [...seatData[i]];

    if (localSeatData[row][col] === 0) {
      localSeatData[row][col] = 1;
      addPassenger();
    } else {
      localSeatData[row][col] = 0;
      removePassenger();
    }

    setSeatData(localSeatData);
  };

  useEffect(() => {
    let localSeatData = new Array(10);
    for (let i = 0; i < localSeatData.length; i++)
      localSeatData[i] = new Array(10);
    for (let i = 0; i < localSeatData.length; i++) {
      for (let j = 0; j < localSeatData[0].length; j++) {
        localSeatData[i][j] = 0;
      }
    }

    localSeatData[2][3] = 2;
    localSeatData[1][4] = 2;

    setSeatData(localSeatData);
  }, []);

  const flightDetails = (
    <Grid
      container
      // component="li"
      display="flex"
      justifyContent="center"
      alignItems="center"
      spacing={3}
      // mx="auto"
    >
      <Grid
        item
        lg={2}
        sm={3}
        xs={7}
        display="flex"
        alignItems="center"
        flexDirection={"column"}
      >
        {/* <MDBox borderColor={"black"} border={"2px"}> */}
        {/* <Stack spacing={0} textAlign="center"> */}
        <MDTypography color="white" fontWeight="medium">
          {"DEL"}
        </MDTypography>
        <MDTypography color="white" variant="h4" fontWeight="bold">
          {"10:40"}
        </MDTypography>
        <MDTypography color="white" variant="h6" fontWeight="light">
          {"Delhi"}
        </MDTypography>
        {/* </Stack> */}
        {/* </MDBox> */}
      </Grid>

      <Grid
        item
        lg={2}
        sm={3}
        xs={7}
        display="flex"
        alignItems="center"
        flexDirection={"column"}
        justifyContent={"center"}
      >
        {/* <Stack spacing={0} textAlign="center"> */}
        {/* <Divider flexItem> */}
        <MDTypography color="white" variant="h6" fontWeight="medium">
          {"2h40m"}
        </MDTypography>
        {/* </Divider> */}
        {/* </Stack> */}
      </Grid>

      <Grid
        item
        lg={2}
        sm={3}
        xs={7}
        display="flex"
        alignItems="center"
        flexDirection={"column"}
      >
        {/* <Stack spacing={0} textAlign="center"> */}
        <MDTypography color="white" fontWeight="medium">
          {"HYD"}
        </MDTypography>
        <MDTypography color="white" variant="h4" fontWeight="bold">
          {"13:10"}
        </MDTypography>
        <MDTypography color="white" variant="h6" fontWeight="light">
          {"Hyderabad"}
        </MDTypography>
        {/* </Stack> */}
      </Grid>

      <Grid
        item
        lg={2}
        sm={3}
        xs={7}
        display="flex"
        alignItems="center"
        flexDirection={"column"}
      >
        <MDTypography color="white" fontWeight="bold">
          &#8377;{"6500"}
        </MDTypography>
      </Grid>
    </Grid>
  );

  const seatMap = (
    <Grid
      spacing={1}
      container
      item
      display="flex"
      flexDirection="column"
      mx="auto"
      alignItems={"center"}
      s
    >
      <Grid item display="flex" spacing={1}>
        <MDTypography fontWeight="bold">PILOT</MDTypography>
      </Grid>
      {seatData.map((dataRow, rowIdx) => (
        <Grid item display="flex" spacing={1} key={rowIdx}>
          {dataRow.map((data, colIdx) => (
            <IconButton
              key={(rowIdx, colIdx)}
              disabled={data === 2 ? true : false}
              onClick={() => handleSeatClick(rowIdx, colIdx)}
            >
              {data === 0 ? (
                <EventSeatOutlined
                  fontSize="medium"
                  color={data === 2 ? "disabled" : "primary"}
                />
              ) : (
                <EventSeat
                  fontSize="medium"
                  color={data === 2 ? "disabled" : "primary"}
                />
              )}
            </IconButton>
          ))}
        </Grid>
      ))}
    </Grid>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                {flightDetails}
              </MDBox>
              <MDBox pt={3}></MDBox>
              <Grid
                container
                display="flex"
                justifyContent={"center"}
                // columns={{ lg: 3, md: 2 }}

                pt={3}
                pb={3}
                px={3}
                spacing={3}
              >
                <Grid
                  container
                  item
                  md={6}
                  xs={12}
                  display="flex"
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Grid
                    item
                    md={12}
                    xs={12}
                    sx={{ maxHeight: "40vh", overflow: "scroll" }}
                  >
                    {seatMap}
                  </Grid>
                </Grid>

                <Grid item md={6} xs={12}>
                  <PaymentMethod passengerDetails={passengerDetails} />
                </Grid>
                <Grid item>
                  <MDButton variant="contained" color="primary" size="large">
                    <AirplaneTicketIcon></AirplaneTicketIcon>&nbsp;BOOK
                  </MDButton>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Tables;
