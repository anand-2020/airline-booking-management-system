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
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// Images
// import masterCardLogo from "assets/images/logos/mastercard.png";
// import visaLogo from "assets/images/logos/visa.png";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

function PaymentMethod(props) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
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
          {props.passengerDetails.length === 0 ? (
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
            props.passengerDetails.map((el, idx) => (
              <Grid item xs={12} md={12}>
                <MDBox
                  height="100%"
                  mt={0.5}
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
                  ></MDInput>
                </MDBox>
              </Grid>
            ))
          )}
        </Grid>
      </MDBox>
    </Card>
  );
}

export default PaymentMethod;
