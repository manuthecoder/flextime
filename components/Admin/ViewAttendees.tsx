import { Typography, Button, SwipeableDrawer, IconButton } from "@mui/material";
import dayjs from "dayjs";
import { Box } from "@mui/system";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import { useSession } from "next-auth/react";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { green, red } from "@mui/material/colors";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { LoadingButton } from "@mui/lab";

export function ViewAttendees({
  customTrigger = null,
  checkInMode = false,
  day,
}) {
  const [open, setOpen] = useState(false);
  const { data: session }: any = useSession();
  let trigger = null;
  if (customTrigger) {
    trigger = React.cloneElement(customTrigger, {
      onClick: () => setOpen(true),
    });
  }
  const [mutateLoading, setMutateLoading] = useState(false);
  const url =
    "/api/appointments?" +
    new URLSearchParams({
      admin: "true",
      day: dayjs(day).format("YYYY-MM-DD"),
      teacherEmail: session.user.email,
    });

  const { data, error } = useSWR(url, () =>
    fetch(url).then((res) => res.json())
  );
  const [rows, setRows] = useState([]);
  React.useEffect(() => {
    if (data && !data.error) setRows([...data.appointments]);
  }, [data]);

  return (
    <>
      <SwipeableDrawer
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        anchor="bottom"
        PaperProps={{
          elevation: 0,
          sx: {
            height: "100vh",
            background: "transparent",
          },
        }}
      >
        <Box sx={{ p: 5 }}>
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="h4"
              gutterBottom
              className="font-heading"
              sx={{ flexGrow: 1 }}
            >
              {checkInMode ? "Check in" : "Attendees"}
            </Typography>
            <Box>
              <IconButton onClick={() => setOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </IconButton>
            </Box>
          </Box>

          <Typography variant="h6">
            {checkInMode ? (
              <>Traditional method &bull; {dayjs(day).format("dddd, MMMM D")}</>
            ) : (
              dayjs(day).format("dddd, MMMM D")
            )}
          </Typography>
          <LoadingButton
            loading={mutateLoading}
            disableElevation
            variant="contained"
            onClick={() => {
              setMutateLoading(true);
              mutate(url).then(() => setMutateLoading(false));
            }}
            sx={{ mt: 1, borderRadius: 999, gap: 2 }}
          >
            <span className="material-symbols-outlined">refresh</span>
            Refresh list
          </LoadingButton>
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "900" }}>Student name</TableCell>
                  <TableCell sx={{ fontWeight: "900" }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: "900" }} align="right">
                    Student ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: "900" }} align="right">
                    Teacher created?
                  </TableCell>
                  <TableCell sx={{ fontWeight: "900" }} align="right">
                    Attended?
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data && data.error && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Yikes! An error occured while trying to fetch your
                      appointments. Please try again later.
                    </TableCell>
                  </TableRow>
                )}
                {data && rows.length == 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      You have no appointments today.
                    </TableCell>
                  </TableRow>
                )}
                {data ? (
                  rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.student.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.student.email}
                      </TableCell>
                      <TableCell align="right">
                        {row.student.studentId}
                      </TableCell>
                      <TableCell align="right">
                        <span className="material-symbols-outlined">
                          {row.teacherCreated ? "check" : "close"}
                        </span>
                      </TableCell>
                      <TableCell align="right">
                        <span
                          className="material-symbols-outlined"
                          style={{
                            color: row.attended ? green[500] : red[500],
                          }}
                        >
                          {row.attended ? "check" : "close"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </SwipeableDrawer>
      {customTrigger ? (
        trigger
      ) : (
        <Button
          fullWidth
          onClick={() => setOpen(true)}
          sx={{
            color: "#212121",
            justifyContent: "start",
            px: 2,
            gap: 1.5,
            borderRadius: 9,
          }}
        >
          <span className="material-symbols-outlined">group</span>
          Students
        </Button>
      )}
    </>
  );
}
