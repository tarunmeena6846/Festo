import * as React from "react";
import { useState } from "react";

// import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
  Card,
} from "@mui/material";

interface CategoryState {
  sports: boolean;
  movies: boolean;
  concerts: boolean;
  theater: boolean;
}

function FilterBar() {
  const [categories, setCategories] = useState<CategoryState>({
    sports: false,
    movies: false,
    concerts: false,
    theater: false,
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategories({ ...categories, [event.target.name]: event.target.checked });
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
      <Card elevation={3}>
        <Box p={2}>
          <Typography variant="h6">Filter Events</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={categories.sports}
                onChange={handleCategoryChange}
                name="sports"
              />
            }
            label="Sports"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={categories.movies}
                onChange={handleCategoryChange}
                name="movies"
              />
            }
            label="Movies"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={categories.concerts}
                onChange={handleCategoryChange}
                name="concerts"
              />
            }
            label="Concerts"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={categories.theater}
                onChange={handleCategoryChange}
                name="theater"
              />
            }
            label="Theater"
          />
          {/* Date selection component goes here */}
        </Box>
      </Card>
    </div>
  );
}

// export default Filter;

export default FilterBar;
