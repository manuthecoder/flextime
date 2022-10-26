import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { green } from "@mui/material/colors";
import React from "react";

export const Person: any = React.memo(function ({
  appointment,
  setAppointment,
  item,
}: any) {
  return (
    <ListItem
      sx={{ transition: "none", borderRadius: 5 }}
      button
      onClick={() => {
        setAppointment(item);
      }}
    >
      <ListItemText
        primary={item.name}
        secondary={
          <>
            {item.email.toLowerCase()} &bull; {item.studentId.toLowerCase()}
          </>
        }
      />
      <ListItemIcon sx={{ mr: -3 }}>
        <Avatar
          sx={{
            transform: appointment === item ? "scale(1)" : "scale(0)",
            width: 30,
            transition: "transform .2s",
            height: 30,
            background: green[900],
            color: "#fff",
          }}
        >
          <span className="material-symbols-outlined">check</span>
        </Avatar>
      </ListItemIcon>
    </ListItem>
  );
});
