import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Appbar } from "ui";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography } from "@mui/material";

interface eventDataType {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageLink: string;
}
type eventArray = eventDataType[];
export default function Home() {
  const router = useRouter();
  const [events, setEvents] = React.useState<eventArray>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/showevents");
        if (!response) {
          throw new Error("Network response was not ok");
        }
        const result = await response.data;
        setEvents(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      <Appbar></Appbar>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/createEvent")}
      >
        Create
      </Button>
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

export function CoursesDisplay({ course }: { course: eventDataType }) {
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
