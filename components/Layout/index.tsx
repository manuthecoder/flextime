import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { green } from "@mui/material/colors";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import { signIn,  signOut, useSession } from "next-auth/react";
import React from "react";

function ProfileMenu({ session }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuStyles = {
    py: 1,
    px: 3,
    borderRadius: 4,
    color: green[50],
    "&:hover": {
      background: green[800],
    },
  };

  return (
    <Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        BackdropProps={{
          sx: {
            opacity: "0!important",
          },
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: 200,
            background: green[900],
            p: 1,
            borderRadius: 5,
            mt: "5px!important",
          },
        }}
      >
        <MenuItem
          sx={menuStyles}
          onClick={() => {
            let deferredPrompt;

            window.addEventListener("beforeinstallprompt", (e) => {
              // Prevent the mini-infobar from appearing on mobile
              e.preventDefault();
              // Stash the event so it can be triggered later.
              deferredPrompt = e;
              deferredPrompt.prompt();
            });
            handleClose();
          }}
        >
          Add to home screen
        </MenuItem>
        <MenuItem sx={menuStyles} onClick={handleClose}>
          Settings
        </MenuItem>
        <MenuItem
          sx={menuStyles}
          onClick={() => {
            signOut();
            handleClose();
          }}
        >
          Sign out
        </MenuItem>
      </Menu>

      <Avatar
        onClick={handleClick}
        sx={{
          cursor: "pointer",
          width: 35,
          height: 35,
          borderRadius: 3,
          background: green[200],
        }}
      />
    </Box>
  );
}

export function Layout({ children }) {
  const { data: session } = useSession();

  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          background: green[50],
          color: "black",
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>IHS FlexTime</Box>
          <Box>
            {session ? (
              <ProfileMenu session={session} />
            ) : (
              <Button
                onClick={() => signIn()}
                variant="contained"
                disableElevation
                size="large"
                sx={{
                  borderRadius: 99999,
                }}
              >
                Sign in
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {children}
    </>
  );
}
