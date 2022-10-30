import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { green } from "@mui/material/colors";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import Link from "next/link";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import {
  Backdrop,
  CircularProgress,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

function NewFeatrureDialog() {
  const [open, setOpen] = React.useState(false);

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      PaperProps={{
        sx: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    ></SwipeableDrawer>
  );
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

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
        src={session.user.image ?? null}
        {...stringAvatar(session.user.name)}
        onClick={handleClick}
        sx={{
          cursor: "pointer",
          width: 35,
          height: 35,
          borderRadius: 3,
          background: green[200],
          fontSize: "15px",
          fontWeight: "100",
          color: green[900],
        }}
      />
    </Box>
  );
}

export function Layout({ children }) {
  const options = {
    required: true,
    onUnauthenticated: () => {
      signIn();
    },
  };

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: typeof window !== "undefined" ? window : undefined,
  });

  const { status, data: session }: any = useSession(options);
  const [studentId, setStudentId] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      <Backdrop
        open={status === "loading" || status === "unauthenticated"}
        sx={{
          zIndex: 9999999999999,
          background: "rgba(0,0,0,0.5)",
        }}
      >
        <CircularProgress />
      </Backdrop>
      <SwipeableDrawer
        anchor="bottom"
        onOpen={() => {}}
        onClose={() => {}}
        open={session && !session.user.studentId && !session.user.isAdmin}
        disableSwipeToOpen
        PaperProps={{
          elevation: 0,
          sx: {
            background: "transparent",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Box
          sx={{
            maxWidth: "500px",
            mx: "auto",
            background: "#fff",
            color: green[900],
            p: 5,
            borderRadius: 5,
          }}
        >
          <Typography variant="h4" gutterBottom className="font-heading">
            Finish signup
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Please enter your student ID to finish signing up. Your data is
            stored with zero-access encryption.{" "}
            <b>
              Be careful, you will not be able to change this later, unless
              approved by a staff member
            </b>
          </Typography>
          <TextField
            value={studentId}
            onChange={(e: any) => {
              // Trim to max length of 9 characters
              setStudentId(parseInt(e.target.value.slice(0, 9), 10));
            }}
            fullWidth
            variant="filled"
            type="number"
            label="9-digit student ID"
            autoComplete="off"
            placeholder="*********"
          />
          <LoadingButton
            onClick={() => {
              setLoading(true);
              fetch("/api/setStudentId", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: session.user.id,
                  studentId,
                }),
              })
                .then((res) => res.json())
                .then(() => {
                  setLoading(false);
                  window.location.reload();
                })
                .catch((err) => {
                  setLoading(false);
                  alert("Something went wrong. Please try again later.");
                });
            }}
            loading={loading}
            size="large"
            variant="contained"
            fullWidth
            disableElevation
            sx={{ mt: 2, borderRadius: 999 }}
          >
            Continue
          </LoadingButton>
        </Box>
      </SwipeableDrawer>
      <AppBar
        elevation={0}
        sx={{
          background: "rgba(232, 245, 233, .8)",
          backdropFilter: "blur(10px)",
          transition: "background .1s",
          py: 0.5,
          color: "black",
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link href="/">
              <Button
                color="inherit"
                sx={{
                  fontWeight: "bold",
                }}
              >
                IHS FlexTime
              </Button>
            </Link>
          </Box>
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
      <Toolbar sx={{ py: 0.5 }} />
      {children}
      <NewFeatrureDialog />
    </>
  );
}
