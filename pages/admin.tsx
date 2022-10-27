import { CircularProgress, Container, NoSsr } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";
import { WeeklyCalendar } from "../components/WeeklyCalendar";
import useSWR from "swr";

function VerifyAdmin({ session }) {
  const url = "/api/checkIfAdmin?email=" + session.user.email;
  const { data, error } = useSWR(url, () =>
    fetch(url).then((res) => res.json())
  );
  return data ? (
    <>
      {data.admin ? (
        <WeeklyCalendar admin={true} />
      ) : (
        <p>You do not have access to this page</p>
      )}
    </>
  ) : (
    <CircularProgress />
  );
}

export default function Index(): React.ReactElement {
  const { data: session } = useSession();

  return (
    <Container sx={{ mt: 7 }}>
      <NoSsr>
        {session ? (
          <VerifyAdmin session={session} />
        ) : (
          "Access denied. Please sign in with your teacher IUSD account to access this page. "
        )}
      </NoSsr>
    </Container>
  );
}
