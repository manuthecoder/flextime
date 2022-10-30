import { Box, Container, NoSsr } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";
import { WeeklyCalendar } from "../components/WeeklyCalendar";
import useSWR from "swr";

const Calendar = () => {
  const { data: session } = useSession();
  const url =
    "https://iusd.instructure.com/feeds/calendars/user_oAQbGWzXv6PnOTvZrK860MedEicqM9mI6ltvR2ko.ics";
  const { error, data } = useSWR(url, () =>
    fetch(url).then((res) => res.text())
  );

  return <Box>{JSON.stringify(data)}</Box>;
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
