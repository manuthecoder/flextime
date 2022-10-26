import { Box, Container, NoSsr, Typography } from "@mui/material";
import React from "react";
import { WeeklyCalendar } from "../components/Student/WeeklyCalendar";
import { useSession } from "next-auth/react";

export default function Index(): React.ReactElement {
  const { data: session } = useSession();

  return (
    <Container sx={{ mt: 7 }}>
      <NoSsr>
        {session ? (
          <WeeklyCalendar />
        ) : (
          "Please sign in with your IUSD account to view your appointments. "
        )}
      </NoSsr>
    </Container>
  );
}
