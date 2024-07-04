import * as React from "react";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { isUserLoggedIn } from "../../../apps/fexst_artist/src/store/atoms/user";
import axios from "axios";
import { useState } from "react";

export function InitUser() {
  const [aadminlogin, setIsAdminLoggndIn] = useRecoilState(isUserLoggedIn);
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
        setIsAdminLoggndIn({ isLoading: false, isAdmin: true });
        // localStorage.setItem("adminLoggedIn", result.data.toString());
      } catch (error) {
        console.error("Error fetching admin login data:", error);
        setIsAdminLoggndIn({ isLoading: false, isAdmin: false }); // Set adminLoggedIn to false on error
      }
    }
    fetchAdminLoginInfo();
  }, []);
  console.log("tarun in inituser", aadminlogin);
  return <></>;
}
export default InitUser;
