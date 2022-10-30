import {
  Box,
  IconButton,
  Typography,
  TextField,
  Button,
  SwipeableDrawer,
  Chip,
  Switch,
  FormLabel,
} from "@mui/material";
import { green } from "@mui/material/colors";
import React from "react";
import dayjs from "dayjs";

export function SettingsButton({ mutationUrl, day, appointmentsToday }) {
  const [open, setOpen] = React.useState(false);
  const [bannerText, setBannerText] = React.useState("");

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
            background: "#fff",
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
                    Display on list?
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Allow students to sign up for appointments on this day.
                    Existing appointments will not be affected.
                  </Typography>
                </Box>
                <Switch defaultChecked />
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
                    The maximum number of appointments that can be scheduled on
                    this day
                  </Typography>
                </Box>
                <TextField
                  type="number"
                  variant="outlined"
                  defaultValue={25}
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
                  value={bannerText}
                  onChange={(e) => setBannerText(e.target.value)}
                  placeholder='Example: "Flex appointments are for test retakes only"'
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    Clear appointments
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    This will delete all appointments for this day. This action
                    cannot be undone.
                  </Typography>
                </Box>
                <Button variant="contained" color="error" disableElevation>
                  Clear appointments
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </SwipeableDrawer>
      <Button
        onClick={() => setOpen(true)}
        sx={{
          width: { sm: "100%" },
          // width: "100%",
          background: "rgba(200,200,200,0.3)!important",
          color: "#212121",
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
          }}
        >
          Settings
        </Typography>
      </Button>
    </>
  );
}
