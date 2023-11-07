import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Appbar } from "ui";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
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
    </div>
  );
}
