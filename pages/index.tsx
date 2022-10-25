import {
  Typography,
  ListItem,
  Container,
  Box,
  NoSsr,
  ListItemText,
  ListItemIcon,
  Avatar,
} from "@mui/material";
import { green } from "@mui/material/colors";
import React from "react";
import { CreateAppointmentButton } from "../components/Student/CreateAppointmentButton";
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
        <CreateAppointmentButton />
      </Box>

      <NoSsr>
        <WeeklyCalendar />
      </NoSsr>
    </Container>
  );
}
