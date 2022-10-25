import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { green } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";

export function Layout({ children }) {
  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          background: green[100],
          color: "black",
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>Flextime appointments</Box>
          <Box>
            <Avatar
              sx={{
                width: 35,
                height: 35,
                borderRadius: 3,
                background: green[300],
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {children}
    </>
  );
}
