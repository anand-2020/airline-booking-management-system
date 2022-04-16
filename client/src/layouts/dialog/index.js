import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import MDBox from "components/MDBox";

import EditIcon from "@mui/icons-material/Edit";

import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

export default function FormDialog({ title, action, children }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MDBox onClick={handleClickOpen}>{action}</MDBox>

      <Dialog open={open} onClose={handleClose}>
        <MDBox
          mx={2}
          mt={2}
          py={1}
          px={2}
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
        >
          <DialogTitle textAlign="center">
            <MDTypography color="white" fontWeight="medium">
              {title}
            </MDTypography>
          </DialogTitle>
        </MDBox>

        <DialogContent sx={{ mt: 0 }}>
          {/* <DialogContentText>Some information....</DialogContentText> */}
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CANCEL</Button>
          {/* <Button onClick={handleClose}>SAVE CHANGES</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}