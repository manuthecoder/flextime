import { Box, Container, NoSsr, Typography } from "@mui/material";
import React from "react";
import { WeeklyCalendar } from "../components/Student/WeeklyCalendar";

export default function Index(): React.ReactElement {
  return (
    <Container sx={{ mt: 7 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography className="font-heading" variant="h4" sx={{ flexGrow: 1 }}>
          Appointments
        </Typography>
      </Box>

      <NoSsr>
        <WeeklyCalendar />
      </NoSsr>
    </Container>
  );
}
