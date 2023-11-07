import * as React from "react";
import { useRouter } from "next/router";
import { Card, Typography } from "@mui/material";
import { Button } from "@mui/material";
import Location from "./Location";
import EventBar from "./EventBar";
import axios from "axios";
export const BASE_URL = "http://localhost:3001";
interface CourseDataType {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageLink: string;
}
type courseArray = CourseDataType[];
export async function Events() {
  const [events, setEvents] = React.useState<courseArray>([]);
  // const setUserEmail = useSetRecoilState(userState);
  // React.useEffect(() => {
  let response = await axios(`/admin/courses`, {
    method: "GET",
    headers: {
      "content-Type": "application/json",
      authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhcnVuQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5ODQ2MTE0OCwiZXhwIjoxNjk4NTQ3NTQ4fQ.IR9V7Qv5to3f4gUUD_VtIGmHz1-vkqUU5TArlzCUyhM",
    },
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Network response is not ok");
      }
      resp.json().then((data: courseArray) => {
        console.log("tarun", data);
        console.log("tarun meena");

        setEvents(data);
      });
    })
    .catch((error) => {
      console.log("tarun meena");
      console.error("Error signing in email", error);
    });
  // }, []);

  // console.log(events);
  // Add code to fetch events from the server
  // and set it in the events state variable.
  return (
    <div>
      <EventBar></EventBar>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          // justifyContent: "center",
          // marginLeft: 400,
        }}
      >
        {events.map((event) => {
          return <CoursesDisplay course={event} />;
        })}
      </div>
    </div>
  );
}
export function CoursesDisplay({ course }: { course: CourseDataType }) {
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={course.imageLink}
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
      </Card>
      <div style={{ paddingTop: 20 }}>
        <Typography variant="h6">
          {course.title}
          <br></br>
        </Typography>
        <Typography variant="body2">
          {course.description}
          <br></br>
        </Typography>
        <Typography variant="h6">{course.price}</Typography>
      </div>
    </div>
  );
}

export default Events;
