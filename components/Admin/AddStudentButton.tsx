import {
  SwipeableDrawer,
  Typography,
  IconButton,
  List,
  Box,
  Button,
  TextField,
  Grid,
  Skeleton,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useDebounce } from "use-debounce";
import dayjs from "dayjs";
import { Person } from "./Person";

function ConfirmAppointmentButton({ appointment }) {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      disabled={
        loading ||
        appointment.maxAppointments - appointment.appointments.length == 0
      }
      onClick={() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
      }}
      fullWidth
      size="large"
      variant="contained"
      disableElevation
      sx={{
        borderRadius: 999,
      }}
    >
      Confirm
    </Button>
  );
}

export function AddStudentButton({
  mutationUrl,
  day,
}: {
  mutationUrl: string;
  day: Date;
}) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("/api/search");
  const { data, error } = useSWR(url, () =>
    fetch(url).then((res) => res.json())
  );

  const [text, setText] = useState("");
  const [value] = useDebounce(text, 500);

  useEffect(() => {
    setUrl(`/api/findStudents?query=${value}`);
  }, [value]);

  const [appointment, setAppointment] = useState(null);

  return (
    <>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={() => {
          setOpen(false);
          setText("");
        }}
        onOpen={() => setOpen(true)}
        PaperProps={{
          elevation: 0,
          sx: {
            height: "100vh",
            background: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <IconButton
          sx={{
            position: "fixed",
            top: 0,
            right: 0,
            m: { xs: 3, sm: 5 },
            color: "#000",
          }}
          size="large"
          onClick={() => setOpen(false)}
        >
          <span className="material-symbols-outlined">close</span>
        </IconButton>
        <Box
          sx={{
            width: "calc(100vw - 50px)",
            maxWidth: "1000px",
          }}
        >
          <Grid container spacing={4}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: {
                  xs: appointment ? "none" : "block",
                  md: "block",
                },
              }}
            >
              <Typography variant="h5" className="font-heading" sx={{ mb: 2 }}>
                {dayjs(day).format("dddd, MMMM D")}
              </Typography>
              <TextField
                autoComplete="off"
                variant="filled"
                label="Enter an ID or name"
                autoFocus
                fullWidth
                onChange={(e: any) => setText(e.target.value)}
              />
              <List
                sx={{
                  height: "400px",
                  maxHeight: "50vh",
                  overflow: "scroll",
                  background: "rgba(200,200,200,.3)",
                  backdropFilter: "blur(100px)",
                  mt: 2,
                  borderRadius: 5,
                  p: 1,
                }}
              >
                {data && data.length === 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <p style={{ textAlign: "center" }}>
                      Uh oh! We couldn&apos;t find any results found for&nbsp;
                      <b>{text}</b>
                    </p>
                  </Box>
                )}
                {!data &&
                  [...new Array(25)].map(() => (
                    <Skeleton
                      variant="rectangular"
                      height={75}
                      animation="wave"
                      sx={{ mb: 2, borderRadius: 5 }}
                    />
                  ))}
                {data &&
                  data.map((item) => (
                    <Person
                      key={item.id}
                      item={item}
                      appointment={appointment}
                      setAppointment={setAppointment}
                    />
                  ))}
              </List>
            </Grid>
            {appointment && (
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    maxWidth: "400px",
                    mx: "auto",
                    p: 3,
                    background: "rgba(200,200,200,.3)",
                    borderRadius: 5,
                    mt: { md: 15 },
                  }}
                >
                  <Typography variant="h4" className="font-heading">
                    {appointment.name}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {appointment.email.toLowerCase()}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <b>{appointment.name}</b> won&apos;t be able to change this
                    appointment unless you cancel it.
                  </Typography>
                  <ConfirmAppointmentButton appointment={appointment} />
                  <Button
                    onClick={() => setAppointment(null)}
                    fullWidth
                    size="large"
                    variant="outlined"
                    sx={{
                      mt: 1,
                      display: { xs: "block", md: "none" },
                      borderWidth: "2px!important",
                      borderRadius: 999,
                    }}
                  >
                    Cancel
                  </Button>
                  {appointment.appointmentBanner && (
                    <Alert
                      severity="info"
                      sx={{ mt: 2, borderRadius: 4 }}
                      variant="filled"
                    >
                      {appointment.appointmentBanner}
                    </Alert>
                  )}
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </SwipeableDrawer>
      <Button
        onClick={() => setOpen(true)}
        variant="outlined"
        disabled={dayjs(day).isBefore(dayjs().subtract(1, "day"))}
        fullWidth
        sx={{
          mt: 1,
          borderWidth: "2px!important",
          borderRadius: 9,
        }}
        disableElevation
      >
        Add student
      </Button>
    </>
  );
}