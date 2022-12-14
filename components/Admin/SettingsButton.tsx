import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  SwipeableDrawer,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import useSWR from "swr";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import React from "react";
import toast from "react-hot-toast";

const updateSettings = async (key, value, flexId, date) => {
  const accessToken = `${flexId},${date}`;
  const res = await fetch(
    "/api/appointments/updateSettings?" +
      new URLSearchParams({
        accessToken: accessToken,
        key: key,
        value: value,
        date: date,
        flexChoice: flexId,
      })
  )
    .then((res) => res.json())
    .catch((err) => {
      toast.error(
        "An error occurred while updating settings. Please try again later."
      );
    });
  toast.success("Settings updated successfully!");
  return res;
};

export function SettingsButton({ mutationUrl, day, appointmentsToday }) {
  const [open, setOpen] = React.useState(false);
  const [bannerText, setBannerText] = React.useState("");
  const session: any = useSession();

  const url =
    "/api/appointments/getSettings?" +
    new URLSearchParams({
      date: dayjs(day).format("YYYY-MM-DD"),
      id: session && session.data && session.data.user.flexChoiceId,
    });
  // Fetch settings only when the button is clicked
  const { data, error } = useSWR(open ? url : null, () =>
    fetch(url).then((res) => res.json())
  );

  return (
    <>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        PaperProps={{
          elevation: 0,
          sx: {
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
          },
        }}
      >
        <Box
          sx={{
            minWidth: "80vw",
            maxWidth: "100vw",
            background: global.darkMode ? "hsl(240,11%,15%)" : "#fff",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            maxHeight: "90%",
            borderRadius: 5,
            overflowY: "auto",
          }}
        >
          <Box sx={{ p: 5 }}>
            <Box sx={{ display: "flex", mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom className="font-heading">
                  Settings
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {dayjs(day).format("dddd, MMMM D")}
                </Typography>
              </Box>
              <Box>
                <IconButton
                  onClick={() => setOpen(false)}
                  size="large"
                  color="inherit"
                >
                  <span className="material-symbols-outlined">close</span>
                </IconButton>
              </Box>
            </Box>

            {data ? (
              <Box>
                <Box
                  sx={{
                    mb: 5,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      Allow appointments?
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Allow students to sign up for appointments on this day.
                      Existing appointments will not be affected.
                    </Typography>
                  </Box>
                  <Switch
                    defaultChecked={data.settings.allowAppointments ?? true}
                    onChange={(e) => {
                      updateSettings(
                        "allowAppointments",
                        e.target.checked ? "true" : "false",
                        session.data.user.flexChoiceId,
                        dayjs(day).format("YYYY-MM-DD")
                      );
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    mb: 5,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      Maximum appointments
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      The maximum number of appointments that can be scheduled
                      on this day
                    </Typography>
                  </Box>
                  <TextField
                    type="number"
                    variant="outlined"
                    defaultValue={data.settings.maxAppointments ?? 25}
                    onKeyUp={(e: any) => {
                      if (e.key === "Enter") {
                        e.target.blur();
                      }
                    }}
                    onBlur={(e) => {
                      updateSettings(
                        "maxAppointments",
                        e.target.value,
                        session.data.user.flexChoiceId,
                        dayjs(day).format("YYYY-MM-DD")
                      );
                    }}
                    placeholder="25"
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 5,
                  }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      Banner
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      This text will appear at the top of the page for students.
                    </Typography>
                  </Box>
                  <TextField
                    sx={{
                      width: "500px",
                    }}
                    defaultValue={data.settings.bannerText ?? ""}
                    onKeyUp={(e: any) => {
                      if (e.key === "Enter") {
                        e.target.blur();
                      }
                    }}
                    onBlur={(e) => {
                      updateSettings(
                        "banner",
                        e.target.value,
                        session.data.user.flexChoiceId,
                        dayjs(day).format("YYYY-MM-DD")
                      );
                    }}
                    placeholder='Example: "Flex appointments are for test retakes only"'
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 5,
                  }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      Clear appointments
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      This will delete all appointments for this day. This
                      action cannot be undone.
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="error"
                    disableElevation
                    disabled={data && data.appointments.length === 0}
                  >
                    Clear&nbsp;appointments
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      Reset to defaults
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      This will reset all settings for this day. This action
                      cannot be undone.
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="error"
                    disableElevation
                    disabled={data && JSON.stringify(data.settings) == "{}"}
                  >
                    Reset
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "50vh",
                }}
              >
                <CircularProgress
                  sx={{
                    "& .MuiCircularProgress-svg": {
                      strokeLinecap: "round",
                    },
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </SwipeableDrawer>
      <Button
        onClick={() => setOpen(true)}
        sx={{
          width: { sm: "100%" },
          // width: "100%",
          background: "rgba(200,200,200,0.3)!important",
          color: global.darkMode ? "#fff" : "#212121",
          borderWidth: "2px!important",
          justifyContent: { sm: "start" },
          mt: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          minWidth: "10px",
          px: { xs: 1.5, sm: 2 },
          borderRadius: 9,
          gap: 2,
        }}
      >
        <span className="material-symbols-outlined">settings</span>
        <Typography
          variant="body2"
          sx={{
            display: { xs: "none", sm: "block" },
            fontWeight: "500",
          }}
        >
          Settings
        </Typography>
      </Button>
    </>
  );
}
