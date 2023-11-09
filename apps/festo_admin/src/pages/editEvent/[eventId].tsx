import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Appbar from "ui/components/AppBar";
import { Grid, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import React from "react";
import axios from "axios";
function editEvent() {
  const [events, setEvent] = React.useState();
  const router = useRouter();
  const { eventId } = router.query;
  //   alert(eventId);
  console.log(eventId);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/editevents/" + eventId);
        console.log("tarun ", response);
        if (response.status != 201) {
          throw new Error("Network response was not ok");
        }
        const result = response.data;
        setEvent(result.event);
        console.log(result.event);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [eventId]); // The empty dependency array ensures this effect runs only once on mount
  // console.log(events);
  return (
    <div>
      <Appbar></Appbar>
      <Grid container>
        <Grid item lg={8} md={12} sm={12} xs={12}>
          {events && <UpdateCard event={events} />}
        </Grid>
        <Grid item lg={4} md={12} sm={12} xs={12}>
          {events && <EventDisplay event={events} />}
        </Grid>
      </Grid>
    </div>
  );
}

function EventDisplay({ event }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "left",
        width: 250,
        paddingTop: 80,
        paddingLeft: 50,
      }}
    >
      <Card>
        <Typography
          variant="h6"
          style={{ display: "flex", justifyContent: "center", padding: 10 }}
        >
          {event.title}
        </Typography>
        <CardContent>
          <CardMedia
            component="img"
            height="250"
            style={{ borderRadius: "50%" }}
            image={event.imageLink}
            alt="course image"
          />
          <Typography>
            <h5> Rs {event.price}</h5>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default editEvent;
function UpdateCard({ event }) {
  // console.log(course.title);
  const [title, setTitle] = React.useState(event.title);
  const [description, setDescription] = React.useState(event.description);
  const [price, setPrice] = React.useState(event.price);
  const [image, setImage] = React.useState(event.imageLink);

  const handleUpdate = () => {
    // console.log("at handle update ", title);
    // console.log("tarun", localStorage.getItem("token"));
    // // let { courseId } = useParams();
    // fetch("http://localhost:3000/admin/courses/" + courseId, {
    //   method: "PUT",
    //   body: JSON.stringify({
    //     title: title,
    //     description: description,
    //     imageLink: image,
    //     price: price,
    //   }),
    //   headers: {
    //     "content-Type": "application/json",
    //     authorization: "Bearer " + localStorage.getItem("token"),
    //   },
    // })
    //   .then((resp) => {
    //     if (!resp.ok) {
    //       throw new Error("Error in response from the server ");
    //     }
    //     resp.json().then(() => {
    //       let updatedCourse = {
    //         _id: courseId,
    //         title: title,
    //         description: description,
    //         imageLink: image,
    //         price: price,
    //       };
    //       // console.log("course id is ", updatedCourse._id);
    //       // console.log("Course Updated sucessfully ", updatedCourse);
    //       setCourse({ course: updatedCourse, isLoading: false });
    //     });
    //   })
    //   .catch((error) => {
    //     console.error("Error in Updating the course", error);
    //   });
  };
  return (
    <div style={{ display: "flex", justifyContent: "left" }}>
      <Card
        style={{
          margin: 120,
          width: 400,
          zIndex: 1,
        }}
      >
        <div style={{ padding: 10 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              padding: 5,
            }}
          >
            <TextField
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              variant="outlined"
              fullWidth
            />
            <br />
            <TextField
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              variant="outlined"
              value={description}
              fullWidth
            />
            <br />
            <TextField
              onChange={(e) => {
                setPrice(parseInt(e.target.value));
              }}
              type="number"
              variant="outlined"
              value={price}
              fullWidth
            />
            <br />
            <TextField
              onChange={(e) => {
                setImage(e.target.value);
              }}
              label="Image"
              variant="outlined"
              value={image}
              fullWidth
            />
            <br />
            <br />
            <Button
              // style={{ display: "flex", justifyContent: "left" }}
              variant="contained"
              color="primary"
              onClick={
                () => handleUpdate()
                //   title,
                //   description,
                //   price,
                //   image,
                //   setCourse,
                //   courseId
              }
            >
              Update
            </Button>
            {/* </Card> */}
          </div>
        </div>
      </Card>
    </div>
  );
}
