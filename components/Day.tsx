import { Typography, Box } from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useEffect } from "react";
import dayjs from "dayjs";
import { AddStudentButton } from "./Admin/AddStudentButton";
import { CreateAppointmentButton } from "./Student/CreateAppointmentButton";
import { ViewAttendees } from "./Admin/ViewAttendees";
import { CheckIn } from "./Admin/CheckIn";
import { SettingsButton } from "./Admin/SettingsButton";
import { FlexAppointment } from "./Student/FlexAppointment";

export function Day({ index, url, calendarData, admin = false, day }) {
  const appointmentsToday = calendarData
    ? calendarData.filter((a) => a.date === dayjs(day).format("YYYY-MM-DD"))
    : [];

  const isPast = dayjs(day).isBefore(dayjs(), "day");

  return (
    <>
      <Box
        className="slideDown"
        sx={{
          animationDelay: index * 75 + "ms!important",
          p: { xs: 2, sm: 4 },
          px: 3,
          display: { xs: "flex", sm: "block" },
          gap: { xs: 1, sm: 5 },
          alignItems: "center",
          flexDirection: "column",
          background: {
            xs: global.darkMode
              ? "hsl(240, 11%, 10%)"
              : "rgba(200,200,200,0.2)",
            sm: "transparent",
          },
          borderRadius: 5,
          width: { sm: "100%" },
          ...(isPast && { opacity: 0.5 }),
          minWidth: { sm: admin ? "200px" : "150px" },
          maxWidth: { sm: admin ? "200px" : "150px" },
          flexBasis: 0,
          flexGrow: 1,
          "&:hover": {
            background: {
              sm: global.darkMode
                ? "hsl(240, 11%, 10%)"
                : "rgba(200,200,200,0.1)",
            },
          },
        }}
      >
        <Box
          sx={{
            display: { xs: "flex", sm: "block" },
            gap: 2,
            mr: { xs: "auto", sm: "unset" },
            alignItems: "center",
            flexDirection: "row",
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
              width: { xs: 10, sm: 20 },
              height: { xs: 10, sm: 20 },
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
            ml: { sm: "auto" },
            width: { xs: "100%", sm: "auto" },
            gap: { xs: 1.5, sm: 0 },
            alignItems: "center",
            display: "flex",
            flexDirection: { sm: "column" },
          }}
        >
          {appointmentsToday.length === 0 && !admin && (
            <CreateAppointmentButton mutationUrl={url} day={day} />
          )}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              mt: 1,
              flexGrow: 1,
              width: "100%",
              background: "rgba(200,200,200,0.3)!important",
              borderRadius: 5,
            }}
          >
            {admin && <ViewAttendees day={day} />}
            {admin && !dayjs(day).isBefore(dayjs(), "day") && (
              <AddStudentButton mutationUrl={url} day={day} />
            )}
          </Box>
          {appointmentsToday.length !== 0 &&
            appointmentsToday.map((appointment) => (
              <FlexAppointment appointment={appointment} mutationUrl={url} />
            ))}
          {admin && !dayjs(day).isBefore(dayjs(), "day") && (
            <SettingsButton
              // flexId={}
              mutationUrl={url}
              day={day}
              appointmentsToday={appointmentsToday}
            />
          )}
        </Box>
      </Box>
      {admin && dayjs(day).isSame(dayjs(), "day") && <CheckIn day={day} />}
    </>
  );
}
