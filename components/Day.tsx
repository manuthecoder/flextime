import { Typography, Box, Button, SwipeableDrawer } from "@mui/material";
import { green, red } from "@mui/material/colors";
import React from "react";
import dayjs from "dayjs";
import { AddStudentButton } from "./Admin/AddStudentButton";
import { CreateAppointmentButton } from "./Student/CreateAppointmentButton";
import { ViewAttendees } from "./Admin/ViewAttendees";
import { CheckIn } from "./Admin/CheckIn";
import LoadingButton from "@mui/lab/LoadingButton";
import { mutate } from "swr";

const FlexAppointment = ({ mutationUrl, appointment }) => {
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
            background: green[50],
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
          onClick={() => {
            if (!appointment.teacherCreated) {
              setOpen(true);
            }
          }}
          disableElevation
          variant="contained"
          sx={{
            ...(appointment.teacherCreated && {
              background: red[900] + "!important",
            }),
            borderWidth: "2px!important",
            borderRadius: 999,
            gap: 1,
            whiteSpace: "nowrap",
          }}
        >
          {appointment.flexChoice.name}
          <span className="material-symbols-outlined">
            {appointment.teacherCreated ? "lock" : "edit"}
          </span>
        </Button>
      </Box>
    </>
  );
};
export function Day({ url, calendarData, admin = false, day }) {
  return (
    <Box
      sx={{
        p: 4,
        px: 2,
        display: { xs: "flex", sm: "block" },
        gap: 5,
        alignItems: "center",
        background: { xs: "rgba(200,200,200,0.2)", sm: "transparent" },
        borderRadius: 5,
        width: { sm: "100%" },
        flexBasis: 0,
        flexGrow: 1,
        "&:hover": {
          background: { sm: "rgba(200,200,200,0.1)" },
        },
      }}
    >
      <Box
        sx={{
          display: { xs: "flex", sm: "block" },
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
          textAlign: { sm: "center" },
          mb: { sm: 2 },
        }}
      >
        <Box
          sx={{
            p: 2,
            mx: { sm: "auto" },
            borderRadius: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: { sm: 1 },
            mt: { sm: -1 },
            width: 20,
            height: 20,
            background: "rgba(200,200,200,0.3)",
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
      <Box
        sx={{
          ml: "auto",
        }}
      >
        {admin && dayjs(day).isSame(dayjs(), "day") && <CheckIn day={day} />}
        {admin ? (
          <AddStudentButton mutationUrl={url} day={day} />
        ) : (
          calendarData &&
          ((calendarData[0] &&
            calendarData[0].appointments.filter((appointment) =>
              dayjs(appointment.date).isSame(day, "day")
            ).length == 0) ||
            calendarData.length == 0) && (
            <CreateAppointmentButton mutationUrl={url} day={day} />
          )
        )}
        {admin && <ViewAttendees day={day} />}
        {calendarData &&
          calendarData[0] &&
          calendarData[0].appointments
            .filter((appointment) => dayjs(appointment.date).isSame(day, "day"))
            .map((appointment) => (
              <FlexAppointment appointment={appointment} mutationUrl={url} />
            ))}
      </Box>
    </Box>
  );
}
