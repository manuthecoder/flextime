import {
  Typography,
  Button,
  Box,
  ButtonGroup,
  TextField,
  Checkbox,
} from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import { Day } from "./Day";
import { green } from "@mui/material/colors";
import useSWR from "swr";
import { useSession } from "next-auth/react";

export function WeeklyCalendar({ admin }) {
  const { data: session }: any = useSession();
  const url =
    "/api/appointments?" +
    new URLSearchParams({
      admin: admin ? "true" : "false",
      studentId: session.user.studentId,
    });

  const { data, error } = useSWR(url, () =>
    fetch(url).then((res) => res.json())
  );
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
    mx: 0.5,
    borderRadius: "5px!important",
    color: "#000",
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 4,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box sx={{ flexGrow: 1, mr: "auto" }}>
          <Typography className="font-heading" variant="h4" gutterBottom>
            Appointments
          </Typography>
          <Typography variant="body1">
            {dayjs(week[0]).format("MMMM") !== dayjs(week[6]).format("MMMM")
              ? dayjs(week[0]).format("MMMM") +
                " - " +
                dayjs(week[6]).format("MMMM")
              : dayjs(week[0]).format("MMMM")}
          </Typography>
        </Box>
        <Box sx={{ ml: "auto" }}>
          <ButtonGroup variant="contained" disableElevation>
            <Button
              sx={{ ...styles, mr: 2 }}
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
          flexDirection: { xs: "column", sm: "row" },
          background: { sm: "rgba(200,200,200,0.3)" },
          gap: { xs: 2, sm: 0 },
          borderRadius: 5,
          height: {
            xs: "auto",
            sm: admin ? "auto" : "500px",
          },
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
            <Day
              day={day}
              url={url}
              admin={admin}
              calendarData={admin ? [] : data}
            />
          ))}
      </Box>

      {admin && (
        <Box sx={{ my: 10 }}>
          <Typography className="font-heading" variant="h4" gutterBottom>
            Settings
          </Typography>
          <Box
            sx={{
              background: "rgba(200,200,200,0.3)",
              borderRadius: 5,
              p: 4,
            }}
          >
            <TextField
              variant="filled"
              autoComplete="off"
              fullWidth
              label="Appointment banner text"
              placeholder="Flex appointments are for test retakes only!"
              sx={{
                my: 1.5,
              }}
            />
            <TextField
              variant="filled"
              autoComplete="off"
              fullWidth
              label="Maximum appointments per day"
              placeholder="25"
              defaultValue={25}
              sx={{
                my: 1.5,
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox defaultChecked color="primary" />
              <Typography variant="body1">
                Display my name on the appointment list
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Button
                sx={{
                  ml: "auto",
                  gap: 2,
                  borderRadius: 999,
                }}
                disableElevation
                variant="contained"
              >
                <span className="material-symbols-outlined">save</span>
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
