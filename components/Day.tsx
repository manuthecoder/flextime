import { Typography, Box, Button } from "@mui/material";
import { green } from "@mui/material/colors";
import React from "react";
import dayjs from "dayjs";
import { AddStudentButton } from "./Admin/AddStudentButton";
import { CreateAppointmentButton } from "./Student/CreateAppointmentButton";

export function Day({ admin = false, day }) {
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
      <Box sx={{ textAlign: "center", mb: 2 }}>
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
        <AddStudentButton day={day} />
      ) : (
        <CreateAppointmentButton day={day} />
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
  );
}
