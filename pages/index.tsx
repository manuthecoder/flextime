import { Box, Button, Container, NoSsr } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";
import { WeeklyCalendar } from "../components/WeeklyCalendar";
import useSWR from "swr";
var ical2json = require("ical2json");

const Calendar = () => {
  const { data: session } = useSession();

  return (
    <Box>
      <Button
        onClick={() => {
          fetch("/api/feed")
            .then((res) => res.text())
            .then((data) => {
              alert(data);
            });
        }}
      >
        Log Data
      </Button>
    </Box>
  );
};
export default function Index(): React.ReactElement {
  const { data: session }: any = useSession();
  return (
    <Container sx={{ mt: 7 }}>
      <NoSsr>
        {session ? (
          <>
            {!session.user.isAdmin && <Calendar />}
            <WeeklyCalendar admin={session.user.isAdmin} />
          </>
        ) : (
          "Please sign in with your IUSD account to view your appointments. "
        )}
      </NoSsr>
    </Container>
  );
}
