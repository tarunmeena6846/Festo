import * as React from "react";
import { Button, Box, Card } from "@mui/material";

function EventBar() {
  return (
    <div
      style={{
        display: "flex",
        // justifyContent: "center",
        marginTop: 40,
        margin: 10,
        flexWrap: "wrap",
      }}
    >
      <Button
        variant="outlined"
        size="small"
        color="error"
        style={{ margin: 5, borderRadius: "20px" }}
      >
        DJ Party
      </Button>

      <Button
        variant="outlined"
        size="small"
        color="error"
        style={{ margin: 5, borderRadius: "20px" }}
      >
        DJ Party
      </Button>

      <Button
        variant="outlined"
        size="small"
        color="error"
        style={{ margin: 5, borderRadius: "20px" }}
      >
        DJ Party
      </Button>
      <Button
        variant="outlined"
        size="small"
        color="error"
        style={{ margin: 5, borderRadius: "20px" }}
      >
        DJ Party
      </Button>
      <Button
        variant="outlined"
        size="small"
        color="error"
        style={{ margin: 5, borderRadius: "20px" }}
      >
        DJ Party
      </Button>
      <Button
        variant="outlined"
        size="small"
        color="error"
        style={{ margin: 5, borderRadius: "20px" }}
      >
        DJ Party
      </Button>
    </div>
  );
}

export default EventBar;
