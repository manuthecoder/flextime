import {
  Button,
  CardActionArea,
  CircularProgress,
  IconButton,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useState } from "react";
import useSWR from "swr";
import Card from "@mui/material/Card";
import * as React from "react";
import { ViewAttendees } from "./ViewAttendees";
const TraditionalCheckIn = ({ day, checkInMode, setCheckInMode, data }) => {
  return (
    <>
      <ViewAttendees
        day={day}
        checkInMode
        customTrigger={
          <Card
            sx={{
              flexGrow: 1,
              borderWidth: "2px",
              background: "rgba(200,200,200,.3)",
              mr: 1,
              flex: "50%",
              borderRadius: 5,
            }}
            variant="outlined"
          >
            <CardActionArea sx={{ p: 3 }}>
              <Typography variant="h6">Traditional</Typography>
              <Typography variant="body2">
                Call out student names and have them respond with "here" as you
                mark them as present.
              </Typography>
            </CardActionArea>
          </Card>
        }
      />
    </>
  );
};
export function CheckIn({ day }) {
  const [open, setOpen] = useState(false);
  const [checkInMode, setCheckInMode] = useState("");
  const { data: session }: any = useSession();

  const url =
    "/api/appointments?" +
    new URLSearchParams({
      admin: "true",
      day: dayjs(day).format("YYYY-MM-DD"),
      teacherEmail: session.user.email,
    });

  const { data, error } = useSWR(url, () =>
    fetch(url).then((res) => res.json())
  );

  return (
    <>
      <SwipeableDrawer
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        anchor="bottom"
        PaperProps={{
          elevation: 0,
          sx: {
            height: "100vh",
            background: "transparent",
          },
        }}
      >
        <Box sx={{ p: 5 }}>
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="h4"
              gutterBottom
              className="font-heading"
              sx={{ flexGrow: 1 }}
            >
              Check in
            </Typography>
            <Box>
              <IconButton onClick={() => setOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </IconButton>
            </Box>
          </Box>

          <Typography variant="h6">
            {dayjs(day).format("dddd, MMMM D")}
          </Typography>

          <Box
            sx={{
              mt: 1,
              borderRadius: 5,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "800",
                mt: 5,
                mb: 3,
              }}
            >
              How do you want to check students in?
            </Typography>
            {data ? (
              <Box sx={{ display: "flex", mt: 1 }}>
                <TraditionalCheckIn
                  day={day}
                  checkInMode={checkInMode}
                  setCheckInMode={setCheckInMode}
                  data={data}
                />
                <Card
                  sx={{
                    flexGrow: 1,
                    borderWidth: "2px",
                    background: "rgba(200,200,200,.3)",
                    ml: 1,
                    flex: "50%",
                    borderRadius: 5,
                  }}
                  variant="outlined"
                >
                  <CardActionArea sx={{ p: 3 }}>
                    <Typography variant="h6">Barcode</Typography>
                    <Typography variant="body2">
                      Scan student IDs or type it in manually as they walk in.
                    </Typography>
                  </CardActionArea>
                </Card>
              </Box>
            ) : (
              <CircularProgress />
            )}
          </Box>
        </Box>
      </SwipeableDrawer>
      <Button
        onClick={() => setOpen(true)}
        fullWidth
        disableElevation
        variant="contained"
        sx={{
          mt: 1,
          borderWidth: "2px!important",
          borderRadius: 9,
        }}
      >
        Check-in mode
      </Button>
    </>
  );
}
