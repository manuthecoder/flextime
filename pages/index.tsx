import { Container, NoSsr } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";
import { WeeklyCalendar } from "../components/Student/WeeklyCalendar";

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
