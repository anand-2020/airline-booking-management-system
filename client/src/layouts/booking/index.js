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
import { Divider, IconButton } from "@mui/material";
import MDInput from "components/MDInput";

// Data

import { useEffect, useState, useContext } from "react";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import { useLocation, Navigate } from "react-router-dom";
import Spinner from "components/Spinner";
import axios from "axiosInstance";
import AuthContext from "authContext";

const passengerSeatMap = new Map();
const Tables = () => {
  const location = useLocation();
  const [seatData, setSeatData] = useState([[]]);
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cost, setCost] = useState(0);
  const { currentUser } = useContext(AuthContext);

  const addPassenger = (row, col) => {
    // console.log(row, col);
    row = row - 1;
    const curr = new Array(passengerDetails.length);
    for (let i = 0; i < curr.length; i++) curr[i] = { ...passengerDetails[i] };
    // console.log(`${row}${getLetter(col)}`, curr.length);
    passengerSeatMap.set(`${row}${getLetter(col)}`, curr.length);
    // console.log(passengerSeatMap.get(`${row}${getLetter(col)}`));
    curr.push({
      name: null,
      age: null,
      seatNumber: `${row}${getLetter(col)}`,
      row: row,
      col: col,
      // idx: curr.length,
    });
    setPassengerDetails(curr);
    row++;
  };

  const removePassenger = (row, col) => {
    // console.log(row, col);
    // console.log(`${row}${getLetter(col)}`);
    row = row - 1;
    const curr = new Array(passengerDetails.length);
    for (let i = 0; i < curr.length; i++) curr[i] = { ...passengerDetails[i] };
    // console.log(passengerSeatMap.get(`${row}${getLetter(col)}`));
    curr.splice(passengerSeatMap.get(`${row}${getLetter(col)}`), 1);
    passengerSeatMap.delete(`${row}${getLetter(col)}`);
    setPassengerDetails(curr);
    row++;
  };

  const getLetter = (num) => {
    let letter = String.fromCharCode(num + 64);
    return letter;
  };
  const handleNameChange = (e, idx) => {
    const curr = new Array(passengerDetails.length);
    for (let i = 0; i < curr.length; i++) curr[i] = { ...passengerDetails[i] };
    curr[idx].name = e.target.value;
    setPassengerDetails(curr);
  };

  const handleAgeChange = (e, idx) => {
    const curr = new Array(passengerDetails.length);
    for (let i = 0; i < curr.length; i++) curr[i] = { ...passengerDetails[i] };
    curr[idx].age = e.target.value;
    setPassengerDetails(curr);
  };

  const handleSeatClick = (row, col) => {
    let localSeatData = new Array(seatData.length);
    for (let i = 0; i < localSeatData.length; i++)
      localSeatData[i] = [...seatData[i]];

    if (localSeatData[row][col] === 0) {
      localSeatData[row][col] = 1;
      let currCost = cost;
      if (col === 0 || col === seatData[0].length - 1)
        currCost = currCost + location?.state?.fare + 150;
      else currCost = currCost + location?.state?.fare;
      setCost(currCost);
      addPassenger(row + 1, col + 1);
    } else {
      localSeatData[row][col] = 0;
      let currCost = cost;
      if (col === 0 || col === seatData[0].length - 1)
        currCost = currCost - location?.state?.fare - 150;
      else currCost = currCost - location?.state?.fare;
      setCost(currCost);
      removePassenger(row + 1, col + 1);
    }

    setSeatData(localSeatData);
  };

  const bookTickets = () => {
    setLoading(true);
    let payloadContent = new Array(passengerDetails.length);
    for (let i = 0; i < payloadContent.length; i++) {
      payloadContent[i] = {
        PASSENGER_NAME: passengerDetails[i].name,
        PASSENGER_AGE: passengerDetails[i].age,
        FARE: location?.state?.fare,
        ROW_NUM: passengerDetails[i].row + 1,
        COL_NUM: passengerDetails[i].col,
      };
    }
    axios
      .post(`ticket/`, {
        TICKETS: [...payloadContent],
        CUSTOMER_ID: currentUser.CUSTOMER_ID,
        FLIGHT_DATE_ID: location?.state?.flightDateId,
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    // fetchBookedSeatData();

    axios
      .get(`flight/tickets/${location?.state?.flightDateId}`)
      .then((res) => {
        // console.log(res);
        let localSeatData = new Array(location?.state?.numRows);
        for (let i = 0; i < localSeatData.length; i++)
          localSeatData[i] = new Array(location?.state?.numCols);
        for (let i = 0; i < localSeatData.length; i++) {
          for (let j = 0; j < localSeatData[0].length; j++) {
            localSeatData[i][j] = 0;
          }
        }

        res.data.data.forEach(
          (ticket) =>
            (localSeatData[ticket.ROW_NUM - 1][ticket.COL_NUM - 1] = 2)
        );

        setSeatData(localSeatData);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
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
                  color={
                    data === 2
                      ? "disabled"
                      : colIdx === 0 || colIdx === dataRow.length - 1
                      ? "success"
                      : "primary"
                  }
                />
              ) : (
                <EventSeat
                  fontSize="medium"
                  color={
                    data === 2
                      ? "disabled"
                      : colIdx === 0 || colIdx === dataRow.length - 1
                      ? "success"
                      : "primary"
                  }
                />
              )}
            </IconButton>
          ))}
        </Grid>
      ))}
    </Grid>
  );

  const passengerDetailsInputs = (
    <Card id="delete-account">
      <MDBox
        pt={2}
        px={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <MDTypography variant="h6" fontWeight="medium">
          Passenger Details
        </MDTypography>
      </MDBox>
      <MDBox p={1}></MDBox>
      <MDBox p={2}>
        <Grid
          container
          spacing={3}
          sx={{ overflowY: "scroll", maxHeight: "33vh" }}
        >
          {passengerDetails.length === 0 ? (
            <Grid item xs={12} md={12}>
              <MDBox
                height="100%"
                mt={0.5}
                lineHeight={1}
                width="auto"
                // display="inline"
              >
                <MDTypography>No Seats Selected!</MDTypography>
              </MDBox>
            </Grid>
          ) : (
            passengerDetails.map((el, idx) => (
              <Grid container item xs={12} md={12} key={idx} spacing={1}>
                <Grid item xs={2} sm={2} display={"flex"} alignItems={"center"}>
                  <MDTypography>{el.seatNumber}</MDTypography>
                </Grid>
                <Grid item xs={3} sm={3}>
                  <MDInput
                    name="age"
                    required
                    fullWidth
                    id="age"
                    label="Age"
                    type="number"
                    value={el.age}
                    onChange={(e) => handleAgeChange(e, idx)}
                  />
                </Grid>
                <Grid item xs={7} sm={7}>
                  <MDBox
                    height="100%"
                    // mt={0.5}
                    lineHeight={1}
                    width="auto"
                    // display="inline"
                  >
                    {/* <MDTypography>{idx + 1}. </MDTypography> */}
                    <MDInput
                      fullWidth
                      inputProps={{
                        style: {
                          fontSize: 15,
                          color: "black",
                          fontWeight: "bold",
                          textAlign: "center",
                        },
                      }}
                      placeholder={`Passenger ${idx + 1} Name`}
                      value={el.name}
                      onChange={(e) => handleNameChange(e, idx)}
                    ></MDInput>
                  </MDBox>
                </Grid>
              </Grid>
            ))
          )}
        </Grid>
      </MDBox>
    </Card>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {location.state !== null ? (
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
                    {passengerDetailsInputs}
                  </Grid>
                  <Grid item>
                    {loading ? (
                      <Spinner />
                    ) : (
                      <MDButton
                        variant="contained"
                        color={cost === 0 ? "secondary" : "success"}
                        size="large"
                        disabled={cost === 0}
                        onClick={bookTickets}
                      >
                        {`PAY: `} &#8377;{`${cost}`}
                      </MDButton>
                    )}
                  </Grid>
                  <Grid
                    item
                    sm={12}
                    xs={12}
                    display={"flex"}
                    justifyContent={"flex-end"}
                  >
                    <MDTypography color="error" variant={"caption"}>
                      * 150 extra charge for window seat
                    </MDTypography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      ) : (
        <Navigate replace to="/searchFlights" />
      )}
      <Footer />
    </DashboardLayout>
  );
};

export default Tables;
