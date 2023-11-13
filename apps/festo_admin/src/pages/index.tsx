import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Appbar, Signup } from "ui";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography, CardActionArea } from "@mui/material";

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
  const [adminLoggedIn, setIsAdminLoggndIn] = React.useState<boolean | null>(
    null
  );

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
  }, []);

  useEffect(() => {
    async function fetchAdminLoginInfo() {
      try {
        const response = await axios.get("/api/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (response.status !== 200) {
          throw new Error("Admin not logged in");
        }

        const result = await response.data;
        console.log("tarun result.data at after api/me", result.data);
        setIsAdminLoggndIn(result.data);
      } catch (error) {
        console.error("Error fetching admin login data:", error);
        setIsAdminLoggndIn(false); // Set adminLoggedIn to false on error
      }
    }

    fetchAdminLoginInfo();
  }, []);

  if (adminLoggedIn === null) {
    // Loading state, you can render a loading spinner or message here
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Appbar></Appbar>
      {adminLoggedIn ? (
        <div>
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
            }}
          >
            {events.map((event) => {
              return <CoursesDisplay course={event} />;
            })}
          </div>
        </div>
      ) : (
        <div>
          <Signup
            onClick={async (username, password) => {
              console.log("tarun username in index signup route", username);
              const response = await axios.post("/api/signin", {
                username,
                password,
              });
              console.log("tarun token is ", response.data.token);
              localStorage.setItem("token", response.data.token);
              if (response.data.token) {
                router.push("/");
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

// TODO make this SSR
export function CoursesDisplay({ course }: { course: eventDataType }) {
  const router = useRouter();

  const handleCardClick = () => {
    // Handle the click event here, e.g., navigate to another page
    router.push("/editEvent/" + course._id);
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
        </CardActionArea>
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
