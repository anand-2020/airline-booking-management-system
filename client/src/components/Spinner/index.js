import { Box, CircularProgress } from "@mui/material";
const Spinner = (props) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress color={props.color} size={props.size} />
    </Box>
  );
};

export default Spinner;
