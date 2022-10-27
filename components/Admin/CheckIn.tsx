import { Button, IconButton, SwipeableDrawer, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useState } from "react";
import useSWR from "swr";
import Card from "@mui/material/Card";
import * as React from "react";

export function CheckIn({ day }) {
  const [open, setOpen] = useState(false);
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
  const [rows, setRows] = useState([]);
  React.useEffect(() => {
    if (data && !data.error) setRows([...data.appointments]);
  }, [data]);

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
              background: "rgba(200,200,200,.3)",
              p: 3,
              mt: 1,
              borderRadius: 5,
            }}
          >
            <Typography>Select a check-in mode</Typography>
            <Box sx={{ display: "flex", mt: 1 }}>
              <Card sx={{ flexGrow: 1, mr: 1 }}>Manual</Card>
              <Card sx={{ flexGrow: 1, ml: 1 }}>Live</Card>
            </Box>
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
