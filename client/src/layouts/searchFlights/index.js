import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Header from "layouts/searchFlights/components/Header";
import axios from "axiosInstance";
import { useEffect, useState } from "react";
import Spinner from "components/Spinner";

function SearchFlight() {
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
      <DashboardNavbar />
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
      <Footer />
    </DashboardLayout>
  );
}

export default SearchFlight;
