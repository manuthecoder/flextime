import { Typography, Box, Button, SwipeableDrawer } from "@mui/material";
import { green, red } from "@mui/material/colors";
import React from "react";
import dayjs from "dayjs";
import LoadingButton from "@mui/lab/LoadingButton";
import { mutate } from "swr";

export function FlexAppointment({ mutationUrl, appointment }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const res = await fetch(
      "/api/appointments/delete?" +
        new URLSearchParams({
          id: appointment.id,
        })
    )
      .then((res) => res.json())
      .catch((err) => {
        alert("Something went wrong. Please try again later.");
        setLoading(false);
        console.error(err);
      });
    mutate(mutationUrl).then(() => {
      setLoading(false);
      setOpen(false);
    });
  };

  return (
    <>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        disableSwipeToOpen
        PaperProps={{
          elevation: 1,
          sx: {
            maxWidth: "500px",
            mx: "auto",
            p: 4,
            background: green[global.darkMode ? 900 : 50],
            borderRadius: "20px 20px 0 0",
          },
        }}
      >
        <Box>
          <Box
            sx={{
              width: "50px",
              height: "2px",
              background: green[600],
              borderRadius: 99,
              mx: "auto",
              mb: 5,
            }}
          />
          <Typography variant="h5" className="font-heading" sx={{ mb: 2 }}>
            Delete appointment with <u>{appointment.flexChoice.name}</u>?
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            You will have to set up another appointment.{" "}
            {appointment.flexChoice.name}'s availability will not be guaranteed
            if you want to join back
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            disabled={loading}
            size="large"
            fullWidth
            disableElevation
            sx={{ mt: 2, borderRadius: 9, borderWidth: "2px!important" }}
            variant="outlined"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <LoadingButton
            onClick={handleDelete}
            loading={loading}
            size="large"
            fullWidth
            disableElevation
            sx={{ mt: 2, borderRadius: 9, borderWidth: "2px!important" }}
            variant="contained"
          >
            Delete
          </LoadingButton>
        </Box>
      </SwipeableDrawer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          disabled={dayjs(
            dayjs(appointment.date).format("YYYY-MM-DD")
          ).isBefore(dayjs().format("YYYY-MM-DD"))}
          onClick={() => {
            if (!appointment.teacherCreated) {
              setOpen(true);
            }
          }}
          disableElevation
          variant="contained"
          sx={{
            ...(appointment.teacherCreated &&
              !dayjs(dayjs(appointment.date).format("YYYY-MM-DD")).isBefore(
                dayjs().format("YYYY-MM-DD")
              ) && {
                background: red[900] + "!important",
                color: red[50] + "!important",
              }),
            ml: { xs: -2, sm: 0 },
            mt: { xs: 1, sm: 0 },
            borderWidth: "2px!important",
            borderRadius: 999,
            gap: 1,
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              maxWidth: "100px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {appointment.flexChoice.name}
          </span>
          <span className="material-symbols-outlined">
            {appointment.teacherCreated ? "lock" : "edit"}
          </span>
        </Button>
      </Box>
    </>
  );
}
