import {
  SwipeableDrawer,
  Typography,
  IconButton,
  List,
  Box,
  Button,
  TextField,
  Grid,
  Skeleton,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useDebounce } from "use-debounce";
import dayjs from "dayjs";
import { Person } from "./Person";
import { LoadingButton } from "@mui/lab";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

function ConfirmStudentButton({ reason, person }) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  // alert(JSON.stringify(session));

  return (
    <LoadingButton
      loading={loading}
      onClick={() => {
        setLoading(true);
        fetch("/api/appointments/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reason: reason,
            flexId: session.user.email,
            teacherCreated: true,
            studentId: person.studentId,
            date: dayjs(person.date).format("YYYY-MM-DD"),
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            toast.success("Appointment created!");
            setLoading(false);
            console.log(res);
          });
      }}
      fullWidth
      size="large"
      variant="contained"
      disableElevation
      sx={{
        borderRadius: 999,
      }}
    >
      Confirm
    </LoadingButton>
  );
}

export function AddStudentButton({
  mutationUrl,
  day,
}: {
  mutationUrl: string;
  day: Date;
}) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("/api/search");
  const { data, error } = useSWR(url, () =>
    fetch(url).then((res) => res.json())
  );

  const [text, setText] = useState("");
  const [reason, setReason] = useState("");
  const [value] = useDebounce(text, 500);

  useEffect(() => {
    setUrl(`/api/findStudents?query=${value}`);
  }, [value]);

  const [person, setPerson] = useState(null);

  return (
    <>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={() => {
          setOpen(false);
          setText("");
        }}
        onOpen={() => setOpen(true)}
        PaperProps={{
          elevation: 0,
          sx: {
            height: "100vh",
            background: "transparent",
            display: { sm: "flex" },
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <IconButton
          sx={{
            position: "fixed",
            top: 0,
            right: 0,
            m: { xs: 3, sm: 5 },
            color: "#000",
          }}
          size="large"
          onClick={() => setOpen(false)}
        >
          <span className="material-symbols-outlined">close</span>
        </IconButton>
        <Box
          sx={{
            width: "calc(100vw - 50px)",
            maxWidth: "1000px",
            my: 10,
            mx: "auto",
            maxHeight: "90vh",
            pb: 0,
          }}
        >
          <Grid container spacing={4}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: {
                  xs: person ? "none" : "block",
                  md: "block",
                },
              }}
            >
              <Typography variant="h5" className="font-heading" sx={{ mb: 2 }}>
                {dayjs(day).format("dddd, MMMM D")}
              </Typography>
              <TextField
                autoComplete="off"
                variant="filled"
                label="Enter an ID or name"
                autoFocus
                fullWidth
                onChange={(e: any) => setText(e.target.value)}
              />
              <List
                sx={{
                  height: "400px",
                  maxHeight: "50vh",
                  overflowY: "scroll",
                  background: "rgba(200,200,200,.3)",
                  backdropFilter: "blur(100px)",
                  mt: 2,
                  borderRadius: 5,
                  p: 1,
                }}
              >
                {data && data.filter((person) => !person.isAdmin).length === 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <p style={{ textAlign: "center" }}>
                      Uh oh! We couldn&apos;t find any results
                      {text !== "" ? " for" : "!"}&nbsp;
                      <b>{text}</b>
                    </p>
                  </Box>
                )}
                {!data &&
                  [...new Array(25)].map(() => (
                    <Skeleton
                      variant="rectangular"
                      height={75}
                      animation="wave"
                      sx={{ mb: 2, borderRadius: 5 }}
                    />
                  ))}
                {data &&
                  data
                    .filter((person) => !person.isAdmin)
                    .map((item) => (
                      <Person
                        key={item.id}
                        item={item}
                        person={person}
                        setPerson={setPerson}
                      />
                    ))}
              </List>
            </Grid>
            {person && (
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    maxWidth: "400px",
                    mx: "auto",
                    p: 3,
                    background: "rgba(200,200,200,.3)",
                    borderRadius: 5,
                    mt: { md: 15 },
                  }}
                >
                  <Typography variant="h4" className="font-heading">
                    {person.name}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {person.email.toLowerCase()}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <b>{person.name}</b> won&apos;t be able to change this
                    person unless you cancel it.
                  </Typography>
                  <TextField
                    label="Add a reason..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    fullWidth
                    variant="filled"
                    sx={{
                      mb: 3,
                    }}
                  />
                  <ConfirmStudentButton reason={reason} person={person} />
                  <Button
                    onClick={() => setPerson(null)}
                    fullWidth
                    size="large"
                    variant="outlined"
                    sx={{
                      mt: 1,
                      display: { xs: "block", md: "none" },
                      borderWidth: "2px!important",
                      borderRadius: 999,
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </SwipeableDrawer>
      <Button
        onClick={() => setOpen(true)}
        disabled={dayjs(day).isBefore(dayjs().subtract(1, "day"))}
        sx={{
          color: "#212121",
          px: 1,
          minWidth: "auto",
          borderRadius: 9,
        }}
        disableElevation
      >
        <span className="material-symbols-outlined">add</span>
      </Button>
    </>
  );
}
