// import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";
import { Appbar, InitUser, Signin, Signup, Events } from "ui";
import FilterBar from "ui/components/Filterbar";

import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography, CardActionArea } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { isUserLoggedIn } from "@/store/atoms/user";
import { Grid } from "@mui/material";
import { Query } from "mongoose";
const categories = ["All", "Movies", "Event", "Party"];

export interface eventDataType {
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
const Home: React.FC<HomeProps> = () => {
  const router = useRouter();
  const [events, setEvents] = React.useState<eventArray>([]);
  // const [events, setEvents] = React.useState<eventArray>([]);
  console.log("tarun events in index.tsx", events);
  const [adminLoggedIn, setIsAdminLoggndIn] = useRecoilState(isUserLoggedIn);
  const selectedCategory = (router.query.category as string) || "All";

  console.log("tarun aadminlogin in index.ts", adminLoggedIn);
  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Component is mounted on the client side.");
        console.log("tarun selectedcategory is ", selectedCategory);
        const response = await axios.get(
          `/api/showevents?category=${selectedCategory}`
        );
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
  }, [selectedCategory]);
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
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <FilterBar
              categories={categories}
              selectedCategory={selectedCategory}
            />
          </Grid>
          <Grid item xs={9}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {events.map((event) => {
                return <Events event={event} />;
              })}
            </div>
          </Grid>
        </Grid>
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
                setIsAdminLoggndIn({ isAdmin: true, isLoading: false });
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
// SSR: Fetch data on the server side
// export async function getServerSideProps() {
//   try {
//     const response = await axios.get(
//       process.env.NEXT_PUBLIC_API_URL + "/showevents"
//     );
//     const events = await response.data;

//     return {
//       props: {
//         events,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);

//     return {
//       props: {
//         events: [],
//       },
//     };
//   }
// }

export default Home;
