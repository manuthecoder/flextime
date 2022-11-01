import {
  Box,
  Button,
  Card,
  CardActionArea,
  Container,
  CardContent,
  NoSsr,
  Skeleton,
  Typography,
  Grid,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";
import { WeeklyCalendar } from "../components/WeeklyCalendar";
import useSWR from "swr";
import dayjs from "dayjs";
import iCalDateParser from "ical-date-parser";

const Calendar = () => {
  const { data: session } = useSession();
  const { error, data } = useSWR("/api/feed", () =>
    fetch("/api/feed").then((res) => res.json())
  );

  const events = data ? data.VCALENDAR[0].VEVENT : [];
  return (
    <Box sx={{ px: 1 }}>
      <Typography className="font-heading" variant="h4" gutterBottom>
        Calendar
      </Typography>
      {data ? (
        <>
          {events.slice(0, 10).map((event) => (
            <Card
              elevation={0}
              sx={{
                background: "rgba(200,200,200,0.3)",
                mb: 2,
                borderRadius: 3,
              }}
            >
              <CardActionArea onClick={() => window.open(event.URL, "_blank")}>
                <CardContent>
                  <Typography
                    sx={{
                      fontWeight: "900",
                    }}
                    gutterBottom
                  >
                    {event.SUMMARY.replaceAll("\\", "")
                      .replaceAll(/\[(.*?)\]/g, "")
                      .replaceAll(/\((.*?)\)/g, "")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.SUMMARY.match(/\[(.*?)\]/g)
                      .toString()
                      .replace("[", "")
                      .replace("]", "")}
                    &nbsp;&bull;&nbsp;
                    {event.DTSTAMP
                      ? dayjs(
                          iCalDateParser(event.DTSTAMP).toISOString()
                        ).format("MMMM D, YYYY")
                      : ""}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </>
      ) : (
        <Box>
          {[...new Array(10)].map(() => (
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={118}
              animation="wave"
              key={Math.random().toString()}
              sx={{
                borderRadius: 5,
                mb: 2,
              }}
            />
          ))}
        </Box>
      )}
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
            <Grid container spacing={5}>
              <Grid item xs={12} md={session.user.isAdmin ? 12 : 8}>
                <WeeklyCalendar admin={session.user.isAdmin} />
              </Grid>
              <Grid item xs={12} md={4}>
                {!session.user.isAdmin && <Calendar />}
              </Grid>
            </Grid>
          </>
        ) : (
          "Please sign in with your IUSD account to view your appointments. "
        )}
      </NoSsr>
    </Container>
  );
}
