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
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import iCalDateParser from "ical-date-parser";
import { useSession } from "next-auth/react";
import React from "react";
import useSWR from "swr";
import { green } from "@mui/material/colors";
import { WeeklyCalendar } from "../components/WeeklyCalendar";
import useEmblaCarousel from "embla-carousel-react";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";

const SetUpIcal = () => {
  const { data: session }: any = useSession();
  const [open, setOpen] = React.useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const handleNext = () => emblaApi && emblaApi.scrollNext();

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
          {/* <Typography variant="body1" sx={{ mb: 2 }}></Typography> */}
          <div className="embla" ref={emblaRef}>
            <div className="embla__container" style={{ gap: "10px" }}>
              <Box className="embla__slide">
                <Box
                  sx={{
                    background: green[100],
                    borderRadius: 5,
                    p: 4,
                  }}
                >
                  <picture>
                    <img
                      src="https://i.ibb.co/Wv8J0fd/step1.jpg"
                      style={{ borderRadius: "15px" }}
                      width="100%"
                    />
                  </picture>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    STEP 1
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: "900" }}>
                    Navigate to your Canvas Calendar
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    fullWidth
                    disableElevation
                  >
                    Next
                  </Button>
                </Box>
              </Box>

              <Box className="embla__slide">
                <Box
                  sx={{
                    background: green[100],
                    borderRadius: 5,
                    p: 4,
                  }}
                >
                  <picture>
                    <img
                      src="https://i.ibb.co/q0pnGg2/step2.jpg"
                      style={{ borderRadius: "15px" }}
                      width="100%"
                    />
                  </picture>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    STEP 2
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: "900" }}>
                    Scroll down and click "Calendar feed"
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    fullWidth
                    disableElevation
                  >
                    Next
                  </Button>
                </Box>
              </Box>
              <Box className="embla__slide">
                <Box
                  sx={{
                    background: green[100],
                    borderRadius: 5,
                    p: 4,
                  }}
                >
                  <picture>
                    <img
                      src="https://i.ibb.co/P5CXvTP/step3.jpg"
                      style={{ borderRadius: "15px" }}
                      width="100%"
                    />
                  </picture>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    STEP 3
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: "900" }}>
                    Copy the feed URL and paste it below
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      error={
                        url !== "" &&
                        !url.startsWith(
                          "https://iusd.instructure.com/feeds/calendars/"
                        )
                      }
                      helperText={
                        url !== "" &&
                        !url.startsWith(
                          "https://iusd.instructure.com/feeds/calendars/"
                        ) && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              ml: -1,
                              mt: 0.5,
                            }}
                          >
                            <span className="material-symbols-outlined">
                              error
                            </span>{" "}
                            Invalid URL
                          </Box>
                        )
                      }
                      fullWidth
                      label="Feed URL"
                      size="small"
                      autoComplete="off"
                    />
                    <Box>
                      <LoadingButton
                        disabled={
                          url == "" ||
                          !url.startsWith(
                            "https://iusd.instructure.com/feeds/calendars/"
                          )
                        }
                        loading={loading}
                        variant="contained"
                        disableElevation
                        onClick={() => {
                          setLoading(true);
                          fetch("/api/updateSettings", {
                            body: JSON.stringify({
                              accessToken: session.user.accessToken,
                              data: {
                                iCal: url,
                              },
                            }),
                            headers: {
                              "Content-Type": "application/json",
                            },
                            method: "POST",
                          })
                            .then((res) => res.json())
                            .then(() => {
                              setLoading(false);
                              setOpen(false);
                              toast.success("Success!");
                            })
                            .catch(() => setLoading(false));
                        }}
                      >
                        Finish
                      </LoadingButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </div>
          </div>
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
  const url =
    "/api/feed?" +
    new URLSearchParams({
      url: session.user.iCal,
    });
  const { error, data } = useSWR(url, () =>
    fetch(url).then((res) => res.json())
  );

  const events = data ? data.VCALENDAR[0].VEVENT : [];
  return (
    <Box sx={{ px: 1 }}>
      <Typography className="font-heading" variant="h4" gutterBottom>
        Calendar
      </Typography>
      {!session.user.iCal && <SetUpIcal />}
      {session.user.iCal && data ? (
        <>
          {events.slice(0, 10).map((event) => (
            <Card
              elevation={0}
              sx={{
                background: global.darkMode
                  ? "hsl(240, 11%, 7%)"
                  : "rgba(200,200,200,0.3)",
                mb: 2,
                borderRadius: 5,
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
          {!data &&
            [...new Array(10)].map(() => (
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
