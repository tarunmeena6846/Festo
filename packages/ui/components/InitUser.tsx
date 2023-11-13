import * as React from "react";
import { useEffect } from "react";

useEffect(() => {
  async function fetchAdminLoginInfo() {
    try {
      const response = await axios.get("/api/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response) {
        throw new Error("Network response was not ok");
      }
      const result = await response.data;
      setIsAdminLoggndIn(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  fetchAdminLoginInfo();
}, []);
