import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Appbar, InitUser, Signin, Signup } from "ui";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography, CardActionArea } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { isUserLoggedIn } from "@/store/atoms/user";

interface eventDataType {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageLink: string;
}
type eventArray = eventDataType[];
interface HomeProps {
  events: eventArray;
}
const Home: React.FC<HomeProps> = ({ events: initialEvents }) => {
  const router = useRouter();
  const [events, setEvents] = React.useState<eventArray>(initialEvents);
  const [adminLoggedIn, setIsAdminLoggndIn] = useRecoilState(isUserLoggedIn);
  console.log("tarun aadminlogin in index.ts", adminLoggedIn);
  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Component is mounted on the client side.");

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
  if (adminLoggedIn === null) {
    console.log("Component is mounted on the client side.");
    // Loading state, you can render a loading spinner or message here
    return <div>Loading...</div>;
  }

  return (
    <div>
      <InitUser></InitUser>
      <Appbar></Appbar>
      {adminLoggedIn ? (
        <div>
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
          <Signin
            onClick={async (username, password) => {
              console.log(
                "tarun username in index siginin route",
                username,
                password
              );
              const response = await axios.post("/api/signin", {
                username,
                password,
              });
              console.log("tarun token at sign in  ", response.data.token);
              localStorage.setItem("token", response.data.token);

              if (response.data.token) {
                setIsAdminLoggndIn(true);
                router.push("/");
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

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
// SSR: Fetch data on the server side
export async function getServerSideProps() {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/showevents"
    );
    const events = await response.data;

    return {
      props: {
        events,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        events: [],
      },
    };
  }
}

export default Home;
