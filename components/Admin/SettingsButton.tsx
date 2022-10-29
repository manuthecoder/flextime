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

import React from "react";
import dayjs from "dayjs";

export function SettingsButton({ mutationUrl, day, appointmentsToday }) {
  const [open, setOpen] = React.useState(false);
  const reasons = [
    "Flex appointments are only for students who have missed a quiz, test, or assignment.",
    "Flex appointments are only for students who have questions about the ____________",
    "Teacher will not be present this day. (Substitute teacher will take over)",
  ];

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
            background: "transparent",
          },
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
              <IconButton onClick={() => setOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </IconButton>
            </Box>
          </Box>

          <Box
            sx={{
              background: "rgba(200,200,200,.3)",
              p: 5,
              borderRadius: 5,
            }}
          >
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
                  Allow students to sign up for appointments on this day
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
          </Box>
        </Box>
      </SwipeableDrawer>
      <Button
        onClick={() => setOpen(true)}
        sx={{
          background: "rgba(200,200,200,0.3)!important",
          color: "#212121",
          borderWidth: "2px!important",
          mt: 1,
          borderRadius: 9,
          gap: 2,
        }}
      >
        <span className="material-symbols-outlined">settings</span> Settings
      </Button>
    </>
  );
}
