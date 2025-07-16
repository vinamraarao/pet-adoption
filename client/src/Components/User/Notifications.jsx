import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { Notifications as NotificationsIcon, CheckCircle, Error } from "@mui/icons-material";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId") || "mockUserId"; // Replace with actual userId logic

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        console.log(`Fetching notifications for userId: ${userId}`);
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/notifications/user/${userId}`);
        console.log("Notifications response:", response.data);
        setNotifications(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setError(`Failed to load notifications: ${error.response?.data?.message || error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [userId]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress sx={{ color: "#f7931e" }} size={60} />
        <Typography
          variant="h6"
          sx={{ color: "#f7931e", mt: 2, fontWeight: "bold" }}
        >
          Loading Notifications...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
        }}
      >
        <Error sx={{ color: "red", fontSize: 60 }} />
        <Typography variant="h6" sx={{ color: "red", mt: 2 }}>
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: { xs: 2, md: 4 },
        maxWidth: 800,
        margin: "0 auto",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
          background: "linear-gradient(90deg, #f7931e 0%, #ffab40 100%)",
          borderRadius: "12px",
          padding: "10px 20px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        }}
      >
        <NotificationsIcon sx={{ color: "white", mr: 1, fontSize: 36 }} />
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: "bold",
            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          Notifications
        </Typography>
      </Box>

      {notifications.length === 0 ? (
        <Paper
          elevation={3}
          sx={{
            p: 3,
            textAlign: "center",
            borderRadius: "12px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "gray", fontStyle: "italic" }}
          >
            No notifications available yet.
          </Typography>
        </Paper>
      ) : (
        <List
          sx={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          {notifications.map((notification, index) => (
            <React.Fragment key={notification._id}>
              <ListItem
                sx={{
                  p: 2,
                  backgroundColor: notification.read ? "#f5f5f5" : "#fff",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <ListItemIcon>
                  <CheckCircle
                    sx={{
                      color: notification.read ? "gray" : "#f7931e",
                      fontSize: 28,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        color: notification.read ? "gray" : "black",
                        fontWeight: "medium",
                      }}
                      dangerouslySetInnerHTML={{ __html: notification.message }}
                    />
                  }
                  secondary={
                    <Typography
                      sx={{
                        color: "gray",
                        fontSize: "0.85rem",
                      }}
                    >
                      {new Date(notification.createdAt).toLocaleString()}
                    </Typography>
                  }
                />
              </ListItem>
              {index < notifications.length - 1 && (
                <Divider sx={{ backgroundColor: "#f7931e", opacity: 0.2 }} />
              )}
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Notifications;