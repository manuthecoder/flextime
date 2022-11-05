import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { green, teal } from "@mui/material/colors";
import Grow from "@mui/material/Grow";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Backdrop,
  CircularProgress,
  Dialog,
  DialogContent,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: any,
  ref: React.Ref<unknown>
) {
  return <Grow in={props.open} ref={ref} {...props} />;
});

function NewFeatureDialog({ open, setOpen }) {
  useEffect(() => {
    if (localStorage.getItem("newFeatureDialog") === null) {
      setOpen(true);
    }
  }, []);
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        localStorage.setItem("newFeatureDialog", "true");
      }}
      TransitionComponent={Transition}
      keepMounted
      sx={{ zIndex: 999999999 }}
      PaperProps={{
        elevation: 0,
        sx: {
          display: "flex",
          borderRadius: 5,
          alignItems: "center",
          width: "calc(100vw - 20px)",
          maxWidth: "500px",
          background: "#001e26",
          color: teal[50],
          justifyContent: "center",
        },
      }}
    >
      <DialogContent sx={{ p: 5, px: 4, pb: 2 }}>
        {/* <picture>
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/94506a68741469.5bd69d57551d5.jpg"
            alt="Adventure Illustration on Behance"
            width="100%"
            style={{
              borderRadius: "20px",
              height: "100px",
              objectFit: "cover",
              marginBottom: "10px",
            }}
          />
        </picture> */}
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "900" }}>
          What&apos;s new in v1.0.0
        </Typography>
        <Typography variant="body1" gutterBottom>
          Check out some of the new features we&apos;ve added to the app!
        </Typography>
        <Typography variant="body1" gutterBottom>
          <ul>
            <li>
              <b>Sync to Canvas Calendar</b>
              <br />
              You can now sync your FlexTime with Canvas! View upcoming events
              and deadlines.
            </li>
            <li style={{ marginTop: "10px" }}>
              <b>Barcode check-in</b>
              <br />
              Check in students using your barcode scanner.
            </li>
            <li style={{ marginTop: "10px" }}>
              <b>Mandatory appointments</b>
              <br />
              Lock appointments so that students can&apos;t cancel them.
            </li>
          </ul>
        </Typography>
        <Button
          variant="contained"
          fullWidth
          disableElevation
          size="large"
          sx={{
            borderRadius: 99,
            mb: 2,
            background: teal[900] + "!important",
          }}
          onClick={() => {
            localStorage.setItem("newFeatureDialog", "true");
            setOpen(false);
          }}
        >
          Nice!
        </Button>
      </DialogContent>
    </Dialog>
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

function ProfileSettings({ children }) {
  const [open, setOpen] = React.useState(false);
  const trigger = React.cloneElement(children, {
    onClick: (event: React.MouseEvent<HTMLElement>) => setOpen(true),
  });
  const [show, setShow] = React.useState(false);
  const session: any = useSession();

  return (
    <>
      {trigger}
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        disableSwipeToOpen
        sx={{ zIndex: 999999999999999 }}
        PaperProps={{
          elevation: 0,
          sx: {
            background: "transparent",
            height: "100vh",
          },
        }}
      >
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100vw",
            maxWidth: "500px",
            mx: "auto",
            textAlign: "center",
            background: green[100],
            borderRadius: "20px 20px 0px 0px",
            overflow: "visible",
          }}
        >
          <Avatar
            {...stringAvatar(session.data.user.name)}
            sx={{
              mx: "auto",
              background: green[300],
              width: 60,
              height: 60,
              position: "relative",
              top: -30,
              mb: -2,
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: "900",
            }}
            gutterBottom
          >
            {session.data.user.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {session.data.user.email}
          </Typography>
          <Box sx={{ p: 3 }}>
            <Box
              sx={{
                p: 2,
                borderRadius: 5,
                background: green[200],
                textAlign: "left",
              }}
            >
              <Typography
                variant="h6"
                onClick={() => setShow(!show)}
                sx={{
                  fontWeight: "900",
                  filter: "blur(5px)",
                  background: green[500],
                  px: 1,
                  py: 0,
                  display: "inline-block",
                  borderRadius: 2,
                  cursor: "pointer",
                  ...(show && {
                    filter: "blur(0px)",
                    background: green[300],
                  }),
                }}
              >
                {session.data.user.studentId}
              </Typography>
              <Typography variant="body1">Student ID</Typography>
            </Box>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
}

function ProfileMenu({
  open: featureModalOpen,
  setOpen: setFeatureModalOpen,
  session,
}) {
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
        <MenuItem sx={menuStyles} onClick={() => setFeatureModalOpen(true)}>
          What&apos;s new?
        </MenuItem>
        <ProfileSettings>
          <MenuItem sx={menuStyles} onClick={handleClose}>
            Settings
          </MenuItem>
        </ProfileSettings>
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

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Backdrop
        open={status === "loading" || status === "unauthenticated"}
        sx={{
          zIndex: 9999,
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
              <ProfileMenu session={session} open={open} setOpen={setOpen} />
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
      <NewFeatureDialog open={open} setOpen={setOpen} />
      <Toolbar sx={{ py: 2 }} />
    </>
  );
}
