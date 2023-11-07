import Appbar from "ui/components/AppBar";
import { useRouter } from "next/router";
import { Card, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";
import Button from "@mui/material/Button";
import axios from "axios";
function createEvent() {
  const router = useRouter();

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [image, setImage] = React.useState("");

  const [isChecked, setIsChecked] = React.useState(false);

  // console.log(userEmail);
  console.log("tarun", title);
  console.log(description);
  const addEvent = async () => {
    console.log("tarun", localStorage.getItem("token"));
    try {
      const response = await axios.post(
        "/api/createevents",
        {
          title: title,
          description: description,
          imageLink: image,
          price: price,
          published: isChecked,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      if (response.data) {
        router.push("/");
        alert("Event Added");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle the error as needed
    }
  };

  return (
    <div>
      <Appbar></Appbar>
      <div
        style={{ paddingTop: 50, display: "flex", justifyContent: "center" }}
      >
        <Typography variant={"h6"}>Create Event</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center", padding: 10 }}>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            label="Title"
            variant="outlined"
            type={"title"}
            fullWidth
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            label="Description"
            variant="outlined"
            type={"description"}
            fullWidth
          />
          <br /> <br />
          <TextField
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            label="Price"
            variant="outlined"
            type="number"
            fullWidth
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setImage(e.target.value);
            }}
            label="ImageLink"
            variant="outlined"
            value={image}
            fullWidth
          />
          <br />
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" color="primary" onClick={addEvent}>
              Create
            </Button>
          </div>
        </Card>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* Already a user? <a href="/login">Login</a> */}
      </div>
    </div>
  );
}
function handleRegister() {}
export default createEvent;
