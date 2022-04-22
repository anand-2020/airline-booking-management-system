import Profile from "layouts/userProfile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import SearchFlights from "layouts/searchFlights";
import Booking from "layouts/booking";
import Admin from "layouts/admin";
import UserTickets from "layouts/userTickets";
// @mui icons
import Icon from "@mui/material/Icon";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import Logout from "layouts/authentication/logout";

const routes = [
  {
    type: "collapse",
    name: "Search Flights",
    key: "searchflights",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/searchFlights",
    component: <SearchFlights />,
  },
  {
    type: "collapse",
    name: "Book",
    key: "book",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/bookFlight",
    component: <Booking />,
  },
  {
    type: "collapse",
    name: "Manage Flights",
    key: "admin",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/admin",
    component: <Admin />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Upcoming Journeys",
    key: "upcoming-journeys",
    icon: <FlightTakeoffIcon fontSize="small" />,
    route: "/upcoming-journeys",
    component: <UserTickets isUpcoming={true} />,
  },
  {
    type: "collapse",
    name: "Archive ",
    key: "archive",
    icon: <FlightLandIcon fontSize="small" />,
    route: "/archive",
    component: <UserTickets isUpcoming={false} />,
  },
  {
    type: "collapse",
    name: "Logout",
    key: "Logout",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/authentication/logout",
    component: <Logout />,
  },
  {
    type: "collapse",
    name: "Signup",
    key: "signup",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "collapse",
    name: "Signin",
    key: "signin",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
];

export default routes;
