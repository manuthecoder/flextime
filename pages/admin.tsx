import { Container, NoSsr } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";
import { WeeklyCalendar } from "../components/WeeklyCalendar";

export default function Index(): React.ReactElement {
  const { data: session } = useSession();

  return (
    <Container sx={{ mt: 7 }}>
      <NoSsr>
        {session ? (
          <WeeklyCalendar admin={true} />
        ) : (
          "Access denied. Please sign in with your teacher IUSD account to access this page. "
        )}
      </NoSsr>
    </Container>
  );
}
