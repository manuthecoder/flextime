import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  NoSsr,
  Skeleton,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import iCalDateParser from "ical-date-parser";
import { useSession } from "next-auth/react";
import React from "react";
import useSWR from "swr";
import { green } from "@mui/material/colors";
import { WeeklyCalendar } from "../components/WeeklyCalendar";

const SetUpIcal = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <SwipeableDrawer
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        anchor="bottom"
        disableSwipeToOpen
        PaperProps={{
          elevation: 1,
          sx: {
            maxWidth: "500px",
            mx: "auto",
            p: 4,
            background: green[50],
            borderRadius: "20px 20px 0 0",
          },
        }}
      >
        <Box>
          <Box
            sx={{
              width: "50px",
              height: "2px",
              background: green[600],
              borderRadius: 99,
              mx: "auto",
              mb: 5,
            }}
          />
          <Typography variant="h5" className="font-heading" sx={{ mb: 2 }}>
            Set up your calendar
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}></Typography>
        </Box>
      </SwipeableDrawer>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        size="large"
        fullWidth
        disableElevation
        sx={{
          mb: 1,
          borderRadius: 9,
        }}
      >
        Set up
      </Button>
    </>
  );
};

const CanvasCalendar = () => {
  const { data: session }: any = useSession();
  const { error, data } = useSWR("/api/feed", () =>
    fetch("/api/feed").then((res) => res.json())
  );

  const events = data ? data.VCALENDAR[0].VEVENT : [];
  return (
    <Box sx={{ px: 1 }}>
      <Typography className="font-heading" variant="h4" gutterBottom>
        Calendar
      </Typography>
      {!session.user.iCal && <SetUpIcal />}
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
                {!session.user.isAdmin && <CanvasCalendar />}
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
