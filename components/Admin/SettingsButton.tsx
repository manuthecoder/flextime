import {
  Box,
  IconButton,
  Typography,
  Button,
  SwipeableDrawer,
} from "@mui/material";
import React from "react";

export function SettingsButton({ mutationUrl, day, appointmentsToday }) {
  const [open, setOpen] = React.useState(false);

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
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="h4"
              gutterBottom
              className="font-heading"
              sx={{ flexGrow: 1 }}
            >
              Settings
            </Typography>
            <Box>
              <IconButton onClick={() => setOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </IconButton>
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
