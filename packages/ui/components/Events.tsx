import * as React from "react";
import { useRouter } from "next/router";
import { Card, Typography, CardActionArea } from "@mui/material";
import eventDataType from "../../../apps/fexst_artist/src/pages/index";
// TODO make this SSR
export function Events({ event }: { event: eventDataType }) {
  const router = useRouter();

  const handleCardClick = () => {
    // Handle the click event here, e.g., navigate to another page
    router.push("/editEvent/" + event._id);
  };

  return (
    <div style={{ margin: 10 }}>
      <Card
        style={{
          width: 200,
          height: 300,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: 15,
        }}
      >
        <CardActionArea onClick={handleCardClick}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={event.imageLink}
              style={{ width: 200, height: 300 }}
              alt="Course"
            ></img>
          </div>
          {/* <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}> */}
          <div
            style={{
              display: "flex",
              // flexDirection: "column",
              alignItems: "center",
              marginTop: 20,
            }}
          ></div>
        </CardActionArea>
      </Card>
      <div style={{ paddingTop: 20 }}>
        <Typography variant="h6">
          {event.title}
          <br></br>
        </Typography>
        <Typography variant="body2">
          {event.description}
          <br></br>
        </Typography>
        <Typography variant="h6">{event.price}</Typography>
      </div>
    </div>
  );
}

export default Events;
