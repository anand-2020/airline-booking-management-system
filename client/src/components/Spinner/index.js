import { Box, CircularProgress } from "@mui/material";
const Spinner = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        // height: "100%",
        // width: "100%",
        alignItems: "center",
        // flexDirection: "column",
        // mx: "auto",
      }}
    >
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          alignSelf: "center",
          flexDirection: "column",
        }}
      > */}
      <CircularProgress color={props.color} size={props.size} />
      {/* </Box> */}
    </Box>
  );
};

export default Spinner;
