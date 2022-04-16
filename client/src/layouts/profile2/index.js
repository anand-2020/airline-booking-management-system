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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Overview page components
import Header from "layouts/profile2/components/Header";
import axios from "axiosInstance";
import { useEffect, useState } from "react";
import Spinner from "components/Spinner";

function Overview() {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`airport/`)
      .then((res) => {
        console.log(res);
        setAirports(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      {loading ? (
        <MDBox
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner size={50} />
        </MDBox>
      ) : (
        <>
          <MDBox mb={2} />
          <Header airports={airports}></Header>
        </>
      )}
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Overview;
