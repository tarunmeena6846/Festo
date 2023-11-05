import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export function Popup(props) {
  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Popup Title</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This is the content of the popup. You can customize it as needed.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Popup;
