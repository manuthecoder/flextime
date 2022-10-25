import { Typography, Container, Box, NoSsr, Button } from "@mui/material";
import { green } from "@mui/material/colors";
import { useState } from "react";
import dayjs from "dayjs";

const Day = ({ day }) => {
  return (
    <Box
      sx={{
        p: 4,
        width: "100%",
        "&:hover": {
          background: "rgba(200,200,200,0.5)",
          borderRadius: 5,
        },
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Box
          sx={{
            p: 2,
            mx: "auto",
            borderRadius: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 1,
            mt: -1,
            width: 20,
            height: 20,
            ...(dayjs(day).isSame(dayjs(), "day") && {
              background: green[900],
              color: "#fff",
            }),
          }}
        >
          <Typography variant="h5" className="font-heading">
            {dayjs(day).format("D")}
          </Typography>
        </Box>
        <Typography variant="body2">{dayjs(day).format("dddd")}</Typography>
      </Box>
    </Box>
  );
};

const WeeklyCalendar = () => {
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
        minWidth: "1000px",
        height: "500px",
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
};

export default function Index(): React.ReactElement {
  return (
    <Container sx={{ mt: 7 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography className="font-heading" variant="h4" sx={{ flexGrow: 1 }}>
          Appointments
        </Typography>
        <Button
          size="large"
          variant="contained"
          sx={{ borderRadius: 9, gap: 1 }}
          disableElevation
        >
          <span className="material-symbols-outlined">add</span>
          New appointment
        </Button>
      </Box>

      <NoSsr>
        <WeeklyCalendar />
      </NoSsr>
    </Container>
  );
}
