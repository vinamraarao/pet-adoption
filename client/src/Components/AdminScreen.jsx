import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Collapse,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import PostingPets from "./PostingPets";
import AdoptingRequests from "./AdoptingRequests";
import AdoptedHistory from "./AdoptedHistory";
import ApprovedByDoctor from "./Admin/ApprovedByDoctor";
import RejectedByDoctor from "./Admin/RejectedByDoctor";

const AdminScreen = () => {
  const [screen, setScreen] = useState("postingPet");
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <Box display="flex" minHeight="100vh">
      {/* Left Sidebar */}
      <Box
        width="250px"
        bgcolor="#ffcc80"
        p={2}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <List>
          <Box
            onMouseEnter={() => setOpenDropdown(true)}
            onMouseLeave={() => setOpenDropdown(false)}
          >
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => setScreen("postingPet")}
                sx={{
                  bgcolor: screen === "postingPet" ? "#ff9800" : "transparent",
                  color: screen === "postingPet" ? "white" : "#333",
                  fontWeight: "bold",
                  borderRadius: "5px",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                  "&:hover": {
                    bgcolor: "#ff9800",
                    color: "white",
                  },
                }}
              >
                <Typography>Post Pet Requests</Typography>
                {openDropdown ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>

            {/* Dropdown Menu */}
            <Collapse in={openDropdown} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => setScreen("approvedByDoctor")}
                  >
                    ✅ Approved by Doctor
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => setScreen("rejectedByDoctor")}
                  >
                    ❌ Rejected by Doctor
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>
          </Box>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setScreen("adoptingPet")}
              sx={{
                bgcolor: screen === "adoptingPet" ? "#ff9800" : "transparent",
                color: screen === "adoptingPet" ? "white" : "#333",
                fontWeight: "bold",
                borderRadius: "5px",
                transition: "background-color 0.3s ease, color 0.3s ease",
                "&:hover": {
                  bgcolor: "#ff9800",
                  color: "white",
                },
              }}
            >
              <Typography>Adoption Requests</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setScreen("adoptedHistory")}
              sx={{
                bgcolor: screen === "adoptedHistory" ? "#ff9800" : "transparent",
                color: screen === "adoptedHistory" ? "white" : "#333",
                fontWeight: "bold",
                borderRadius: "5px",
                transition: "background-color 0.3s ease, color 0.3s ease",
                "&:hover": {
                  bgcolor: "#ff9800",
                  color: "white",
                },
              }}
            >
              <Typography>Adopted History</Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* Right Content Area */}
      <Box flex={1} p={3} bgcolor="#f8f9fa">
        {screen === "postingPet" && <PostingPets />}
        {screen === "approvedByDoctor" && <ApprovedByDoctor />}
        {screen === "rejectedByDoctor" && <RejectedByDoctor />}
        {screen === "adoptingPet" && <AdoptingRequests />}
        {screen === "adoptedHistory" && <AdoptedHistory />}
      </Box>
    </Box>
  );
};

export default AdminScreen;
