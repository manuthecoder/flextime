import { Typography, Button, Box, ButtonGroup } from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import { Day } from "./Day";
import { green } from "@mui/material/colors";

export function WeeklyCalendar({ admin }) {
  const week = [];
  const [navigation, setNavigation] = React.useState(0);

  // Get current week's dates
  let now = Date.now();
  // Add navigation weeks to now
  now += navigation * 7 * 24 * 60 * 60 * 1000;

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

  const styles = {
    "&:not(:disabled)": {
      background: `${green[200]}!important`,
    },
    border: "0!important",
    mx: 1,
    borderRadius: "5px!important",
    color: "#000",
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography
            className="font-heading"
            variant="h4"
            gutterBottom
            sx={{ flexGrow: 1 }}
          >
            Appointments
          </Typography>
          <Typography variant="body1">{dayjs().format("MMMM")}</Typography>
        </Box>
        <Box sx={{ ml: "auto" }}>
          <ButtonGroup variant="contained" disableElevation>
            <Button
              sx={styles}
              onClick={() => setNavigation(0)}
              disabled={navigation === 0}
            >
              Today
            </Button>
            <Button sx={styles} onClick={() => setNavigation((n) => n - 1)}>
              <span className="material-symbols-outlined">chevron_left</span>
            </Button>
            <Button sx={styles} onClick={() => setNavigation((n) => n + 1)}>
              <span className="material-symbols-outlined">chevron_right</span>
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          background: "rgba(200,200,200,0.3)",
          borderRadius: 5,
          height: admin ? "auto" : "500px",
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
            <Day day={day} admin={admin} />
          ))}
      </Box>
    </Box>
  );
}
