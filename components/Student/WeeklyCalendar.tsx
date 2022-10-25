import { Box } from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import { Day } from "./Day";

export function WeeklyCalendar() {
  const week = [];

  // Get current week's dates
  const now = Date.now();
  const DAY = 60 * 60 * 24 * 1000;
  const today = new Date(now).getDay();
  for (let i = today; i >= 0; i--) {
    let e = new Date(now - DAY * i);
    week.push(e);
  }
  for (let i = 1; i < 7 - today; i++) {
    let l = new Date(now + DAY * i);
    week.push(l);
  }

  return (
    <Box
      sx={{
        display: "flex",
        background: "rgba(200,200,200,0.3)",
        borderRadius: 5,
        height: "500px",
        mb: 5,
        maxWidth: "100%",
        overflowX: "scroll!important",
      }}
    >
      {week
        .filter(
          (day) =>
            dayjs(day).format("dddd") !== "Saturday" &&
            dayjs(day).format("dddd") !== "Sunday"
        )
        .map((day) => (
          <Day day={day} />
        ))}
    </Box>
  );
}
