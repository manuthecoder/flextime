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
import LoadingButton from "@mui/lab/LoadingButton";
import { useSession } from "next-auth/react";
import { mutate } from "swr";
function ConfirmAppointmentButton({
  disabled,
  loadingSettings,
  mutationUrl,
  setOpen,
  date,
  appointment,
}) {
  const [loading, setLoading] = useState(false);
  const session: any = useSession();

  const handleClick = async () => {
    setLoading(true);
    const request = await fetch("/api/appointments/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flexId: appointment.id,
        teacherCreated: false,
        studentId: session.data.user.studentId,
        date: dayjs(date).format("YYYY-MM-DD"),
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        alert("Something went wrong. Please try again later.");
        setLoading(false);
        console.error(err);
      });
    mutate(mutationUrl);
    setLoading(false);
    setOpen(false);
  };

  return (
    <LoadingButton
      loading={loading || loadingSettings}
      disabled={disabled || !appointment.allowAppointments}
      onClick={handleClick}
      fullWidth
      size="large"
      variant="contained"
      disableElevation
      sx={{
        borderRadius: 999,
      }}
    >
      {appointment.allowAppointments ? "Confirm" : "Not available on this day"}
    </LoadingButton>
  );
}
function AppointmentDetails({
  appointment,
  setAppointment,
  setOpen,
  day,
  mutationUrl,
}) {
  const url =
    "/api/appointments/getSettings?" +
    new URLSearchParams({
      id: appointment.id,
      date: dayjs(day).format("YYYY-MM-DD"),
    });
  const { data, error } = useSWR(url, () =>
    fetch(url).then((res) => res.json())
  );
  return (
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
        {data ? (
          <Typography variant="h4" className="font-heading">
            {appointment.name}
          </Typography>
        ) : (
          <Skeleton
            animation="wave"
            variant="text"
            height={50}
            width={"50%"}
            sx={{ mb: 1 }}
          />
        )}
        {data ? (
          <Typography variant="h6" sx={{ mb: 1 }}>
            {appointment.email.toLowerCase()}
          </Typography>
        ) : (
          <Skeleton
            animation="wave"
            variant="text"
            height={30}
            width={"75%"}
            sx={{ mb: 2 }}
          />
        )}
        {data ? (
          <Typography variant="body2" sx={{ mb: 2 }}>
            {data.settings.maxAppointments ?? 25} max appointments &bull;{" "}
            {data.settings.maxAppointments - data.appointments.length || 25}{" "}
            remaining
          </Typography>
        ) : (
          <Skeleton
            width={"90%"}
            animation="wave"
            variant="text"
            sx={{ mb: 2 }}
          />
        )}
        <ConfirmAppointmentButton
          loadingSettings={!data || error}
          mutationUrl={mutationUrl}
          setOpen={setOpen}
          disabled={
            appointment.maxAppointments -
              appointment.appointments.filter(
                (item) =>
                  dayjs(item.date).format("YYYY-MM-DD") ==
                  dayjs(day).format("YYYY-MM-DD")
              ).length ===
            0
          }
          appointment={appointment}
          date={day}
        />
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
        {data && data.settings.banner && (
          <Alert
            severity="info"
            sx={{ mt: 2, borderRadius: 4 }}
            variant="filled"
          >
            {data.settings.banner}
          </Alert>
        )}
        {error && (
          <Alert
            severity="error"
            sx={{ mt: 2, borderRadius: 4 }}
            variant="filled"
          >
            Something went wrong. Please try again later.
          </Alert>
        )}
      </Box>
    </Grid>
  );
}

export function CreateAppointmentButton({
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
    setUrl(`/api/search?name=${value}`);
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
                label="Search..."
                autoFocus
                fullWidth
                onChange={(e: any) => setText(e.target.value)}
              />
              <List
                sx={{
                  height: "400px",
                  maxHeight: "50vh",
                  overflowY: "auto",
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
              <AppointmentDetails
                appointment={appointment}
                setAppointment={setAppointment}
                setOpen={setOpen}
                day={day}
                mutationUrl={mutationUrl}
              />
            )}
          </Grid>
        </Box>
      </SwipeableDrawer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={() => setOpen(true)}
          variant={
            dayjs(day).isBefore(dayjs(), "day") ||
            dayjs(day).isAfter(dayjs(), "day")
              ? "text"
              : "contained"
          }
          disabled={dayjs(day).isBefore(dayjs(), "day")}
          sx={{
            width: { sm: "100%" },
            background: "rgba(200,200,200,0.3)!important",
            color: "#212121",
            borderWidth: "2px!important",
            justifyContent: "start",
            mt: 1,
            px: 2,
            borderRadius: 9,
            gap: 2,
          }}
          disableElevation
        >
          <span className="material-symbols-outlined">add</span>
          Set&nbsp;appointment
        </Button>
      </Box>
    </>
  );
}
