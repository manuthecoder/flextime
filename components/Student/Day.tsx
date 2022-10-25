import { Typography, Box } from "@mui/material";
import { green } from "@mui/material/colors";
import React from "react";
import dayjs from "dayjs";
import { CreateAppointmentButton } from "./CreateAppointmentButton";

export function Day({ day }) {
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
      <Box sx={{ textAlign: "center" }}>
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

      <CreateAppointmentButton />
    </Box>
  );
}
