import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Appbar from "ui/components/AppBar";
import React from "react";
import axios from "axios";
function editEvent() {
  const [event, setEvent] = React.useState("");
  const router = useRouter();
  const { eventId } = router.query;
  //   alert(eventId);
  console.log(eventId);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/editevents/" + eventId);
        console.log("tarun ", response);
        if (!response) {
          throw new Error("Network response was not ok");
        }
        const result = await response.data;
        setEvent(response.data);
        console.log(event);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      <Appbar></Appbar>
    </div>
  );
}

export default editEvent;
