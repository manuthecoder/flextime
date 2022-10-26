import { Typography, Box, Button } from "@mui/material";
import { green } from "@mui/material/colors";
import React from "react";
import dayjs from "dayjs";
import { AddStudentButton } from "./Admin/AddStudentButton";
import { CreateAppointmentButton } from "./Student/CreateAppointmentButton";

const FlexAppointment = ({ appointment }) => {
  return (
    <Button
      disableElevation
      fullWidth
      variant="contained"
      sx={{
        borderWidth: "2px!important",
        borderRadius: 999,
      }}
    >
      {appointment.flexChoice.name}
    </Button>
  );
};
export function Day({ url, calendarData, admin = false, day }) {
  return (
    <Box
      sx={{
        p: 4,
        display: { xs: "flex", sm: "block" },
        alignItems: "center",
        background: { xs: "rgba(200,200,200,0.2)", sm: "transparent" },
        borderRadius: 5,
        width: { sm: "100%" },
        "&:hover": {
          background: { sm: "rgba(200,200,200,0.5)" },
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
        {admin && dayjs(day).isSame(dayjs(), "day") && (
          <Button
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
        )}
        {admin ? (
          <AddStudentButton mutationUrl={url} day={day} />
        ) : (
          calendarData &&
          calendarData[0].appointments.filter((appointment) =>
            dayjs(appointment.date).isSame(day, "day")
          ).length == 0 && (
            <CreateAppointmentButton mutationUrl={url} day={day} />
          )
        )}
        {admin && (
          <Button
            fullWidth
            variant="outlined"
            sx={{
              mt: 1,
              borderWidth: "2px!important",
              borderRadius: 9,
            }}
          >
            View attendees
          </Button>
        )}
      </Box>
      <Box>
        {calendarData &&
          calendarData[0].appointments
            .filter((appointment) => dayjs(appointment.date).isSame(day, "day"))
            .map((appointment) => (
              <FlexAppointment appointment={appointment} />
            ))}
      </Box>
    </Box>
  );
}
