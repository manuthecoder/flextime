import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";
import { green, teal } from "@mui/material/colors";
import Grow from "@mui/material/Grow";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import useSWR from "swr";
import { Day } from "./Day";
var Barcode = require("react-barcode");

function GlobalAdminSettings() {
  const { data: session }: any = useSession();
  const [name, setName] = React.useState(session.user.name);
  const [email, setEmail] = React.useState(session.user.email);

  return (
    <>
      <Typography className="font-heading" variant="h4" gutterBottom>
        Settings
      </Typography>
      <Box
        sx={{
          mt: 4,
          p: 5,
          mb: 10,
          borderRadius: 5,
          background: "rgba(200,200,200,0.3)",
        }}
      >
        <TextField
          sx={{ mb: 2 }}
          label="Display name"
          fullWidth
          variant="filled"
          autoComplete="off"
          defaultValue={session.user.name}
          value={name}
          onChange={(e) => setName(e)}
        />
        <TextField
          sx={{ mb: 2 }}
          label="Display email"
          fullWidth
          variant="filled"
          autoComplete="off"
          defaultValue={session.user.email}
          value={email}
          onChange={(e) => setEmail(e)}
        />
        <LoadingButton
          variant="contained"
          disableElevation
          fullWidth
          size="large"
          sx={{ borderRadius: 5 }}
        >
          Save
        </LoadingButton>
      </Box>
    </>
  );
}

const Transition = React.forwardRef(function Transition(
  props: any,
  ref: React.Ref<unknown>
) {
  return <Grow in={props.open} ref={ref} {...props} />;
});

function StudentBarcode({ styles }) {
  const [open, setOpen] = React.useState(false);
  const session: any = useSession();

  return (
    <>
      <Button
        sx={{
          ...styles,
          my: 0,
          px: 2,
          borderRadius: 999,
          fontWeight: "bold",
        }}
        onClick={() => {
          setOpen(true);
        }}
        size="large"
      >
        Check&nbsp;in
      </Button>
      <Dialog
        TransitionComponent={Transition}
        PaperProps={{
          elevation: 0,
          sx: {
            display: "flex",
            borderRadius: 5,
            alignItems: "center",
            width: "100vw",
            maxWidth: "calc(100vw - 20px)",
            background: "#001e26",
            color: teal[50],
            justifyContent: "center",
          },
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogContent sx={{ p: 5, px: 2, pb: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "900" }}>
            Barcode
          </Typography>
          <Typography variant="body1" gutterBottom>
            Scan this barcode to quickly check in.
          </Typography>
          <Box
            sx={{
              background: "#fff",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              borderRadius: 5,
              my: 2,
              p: 2,
              py: 2,
            }}
          >
            <Barcode
              value={session.data.user.studentId}
              background="#fff"
              lineColor="#032b36"
              height={50}
            />
          </Box>
          <Button
            fullWidth
            size="large"
            onClick={() => setOpen(false)}
            sx={{
              color: teal[50],
              background: "#032b36!important",
              mb: 3,
              borderRadius: 5,
              fontWeight: "bold",
            }}
          >
            Done
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
export function WeeklyCalendar({ admin }) {
  const { data: session }: any = useSession();
  const url =
    "/api/appointments?" +
    new URLSearchParams({
      studentId: session.user.studentId,
    });

  const { data, error } = useSWR(url, () =>
    fetch(url).then((res) => res.json())
  );
  const week = [];
  const [navigation, setNavigation] = React.useState(0);

  // Get current week's dates
  let now = Date.now();
  // Add navigation weeks to now
  now += navigation * 7 * 24 * 60 * 60 * 1000;

  const DAY = 60 * 60 * 24 * 1000;
  const today = new Date(now).getDay();
  for (let i = today; i >= 0; i--) {
    let e = new Date(now - DAY * i);
    week.push(e);
  }
  for (let i = 1; i < 7 - today; i++) {
    let l = new Date(now + DAY * i);
    week.push(l);
  }

  const styles = {
    background: `transparent!important`,
    p: 1,
    transition: "all .2s",
    px: navigation == 0 ? 3 : 3,
    minWidth: "auto",
    border: "0!important",
    color: "#000",
  };
  const [show, setShow] = useState(true);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 4,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box sx={{ flexGrow: 1, mr: "auto" }}>
          <Typography className="font-heading" variant="h4" gutterBottom>
            Appointments
          </Typography>
          <Typography variant="body1">
            {dayjs(week[0]).format("MMMM") !== dayjs(week[6]).format("MMMM")
              ? dayjs(week[0]).format("MMMM") +
                " - " +
                dayjs(week[6]).format("MMMM")
              : dayjs(week[0]).format("MMMM")}{" "}
            {dayjs(week[0]).format("YYYY")}
          </Typography>
        </Box>
        <Box
          sx={{
            p: 1,
            ml: "auto",
            background: { xs: green[100], sm: "transparent" },
            mt: { xs: 2, sm: 0 },
            borderRadius: 9999,
            position: { xs: "fixed", sm: "unset" },
            boxShadow: {
              xs: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              sm: "none",
            },
            bottom: "20px",
            left: admin ? 15 : "unset",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{ ...styles, borderRadius: 999 }}
            size="large"
            onClick={() => {
              setNavigation((n) => n - 1);
              setShow(false);
              setTimeout(() => setShow(true));
            }}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Button>
          <Collapse in={admin || navigation !== 0} orientation="horizontal">
            <Button
              sx={{
                ...styles,
                my: 0,
                px: 2,
                borderRadius: 999,
              }}
              onClick={() => {
                setNavigation(0);
                setShow(false);
                setTimeout(() => setShow(true));
              }}
              size="large"
              disabled={navigation === 0}
            >
              Today
            </Button>
          </Collapse>
          <Collapse in={!admin && navigation === 0} orientation="horizontal">
            <StudentBarcode styles={styles} />
          </Collapse>
          <Button
            sx={{ ...styles, borderRadius: 999 }}
            size="large"
            onClick={() => {
              setNavigation((n) => n + 1);
              setShow(false);
              setTimeout(() => setShow(true));
            }}
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: show ? "flex" : "none",
          flexDirection: { xs: "column", sm: "row" },
          background: { sm: "rgba(200,200,200,0.3)" },
          gap: { xs: 2, sm: 1 },
          borderRadius: 2,
          p: 1,
          mb: 5,
          maxWidth: "100%",
          overflowX: "scroll!important",
        }}
      >
        {week
          .filter(
            (day) =>
              dayjs(day).format("dddd") !== "Saturday" &&
              dayjs(day).format("dddd") !== "Sunday"
          )
          .map((day, i) => (
            <Day
              index={i}
              day={day}
              url={url}
              admin={admin}
              calendarData={admin ? [] : data}
            />
          ))}
      </Box>
      {!show && (
        <Box sx={{ height: "100vh", width: "100%", display: "block" }} />
      )}
      {admin && <GlobalAdminSettings />}
    </Box>
  );
}
