import { Typography, Button, SwipeableDrawer, IconButton } from "@mui/material";
import dayjs from "dayjs";
import { Box } from "@mui/system";
import { useState } from "react";
import useSWR from "swr";
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

function createData(
  name: string,
  id: number | string,
  teacherCreated: boolean,
  attended: boolean
) {
  return { name, id, teacherCreated, attended };
}

const rows = [
  createData("John Doe", 123456789, false, true),
  createData("John Doe", 123456789, false, true),
  createData("John Doe", 123456789, true, false),
  createData("John Doe", 123456789, false, true),
  createData("John Doe", 123456789, false, true),
  createData("John Doe", 123456789, false, true),
  createData("John Doe", 123456789, false, true),
];

export function ViewAttendees({ day }) {
  const [open, setOpen] = useState(false);
  const { data: session }: any = useSession();

  const url =
    "/api/appointments?" +
    new URLSearchParams({
      day: dayjs(day).format("YYYY-MM-DD"),
      teacherEmail: session.user.email,
    });

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
              Attendees
            </Typography>
            <Box>
              <IconButton onClick={() => setOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </IconButton>
            </Box>
          </Box>

          <Typography variant="h6">
            {dayjs(day).format("dddd, MMMM D")}
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "900" }}>Student name</TableCell>
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
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.id}</TableCell>
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </SwipeableDrawer>
      <Button
        onClick={() => setOpen(true)}
        fullWidth
        variant="outlined"
        sx={{
          mt: 1,
          borderWidth: "2px!important",
          borderRadius: 9,
        }}
      >
        View attendees
      </Button>
    </>
  );
}
