import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Appbar from "ui/components/AppBar";
import Events from "ui/components/Events";
import { Grid } from "@mui/material";
import EventBar from "ui/components/EventBar";
import FilterBar from "ui/components/Filterbar";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Home() {
  const breakpoint = 800;
  const isGreaterThanBreakpoint = useMediaQuery(`(min-width:${breakpoint}px)`);

  return (
    <div>
      <Appbar />
      <div>
        {/* <EventBar /> */}
        <Grid container spacing={2}>
          {isGreaterThanBreakpoint && (
            <Grid item xs={2}>
              <FilterBar />
            </Grid>
          )}
          <Grid item xs={9}>
            <Events />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
