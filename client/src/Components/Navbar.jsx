// import React from "react";
// import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import logo from "../Assets/logo.png"; // Make sure this points to your actual file

// const buttonStyle = {
//   backgroundColor: "#FFA500",
//   color: "white",
//   fontWeight: "bold",
//   textTransform: "none",
//   borderRadius: "20px",
//   padding: "8px 16px",
//   "&:hover": { backgroundColor: "#FF8C00" },
// };

// const logoutButtonStyle = {
//   backgroundColor: "#FF4500",
//   color: "white",
//   fontWeight: "bold",
//   textTransform: "none",
//   borderRadius: "20px",
//   padding: "8px 16px",
//   marginLeft: "10px",
//   "&:hover": { backgroundColor: "#D32F2F" },
// };

// const Navbar = () => {
//   const isLoggedIn = !!localStorage.getItem("token");
//   const userRole = localStorage.getItem("role")?.toLowerCase();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("userId");
//     navigate("/login");
//   };

//   const getNavLinkStyle = (path) => ({
//     textDecoration: "none",
//     color: location.pathname === path ? "#FFA500" : "#000",
//     fontSize: "16px",
//     fontWeight: "bold",
//     borderBottom: location.pathname === path ? "2px solid #FFA500" : "none",
//     paddingBottom: "2px",
//     transition: "all 0.3s ease",
//   });

//   // Hide navbar for admin-related users
//   if (["admin", "doctor", "service-manager", "shop-owner"].includes(userRole)) {
//     return null;
//   }

//   return (
//     <AppBar position="static" sx={{ backgroundColor: "white", padding: "10px 0", boxShadow: "none" }}>
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         {/* Logo and App Name */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
//           <Box>
//             <img
//               src={logo}
//               alt="Logo"
//               style={{
//                 width: "95",
//                 height: "auto",
//                 maxHeight: "95px",
//                 objectFit: "contain",
//               }}
//             />
//           </Box>
//           {/* <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000" }}>
//             PawFinds
//           </Typography> */}
//         </Box>

//         {/* Navigation Links */}
//         <Box component="ul" sx={{ display: "flex", gap: "30px", listStyle: "none", padding: 0, margin: 0 }}>
//           <li><Link to="/" style={getNavLinkStyle("/")}>Home</Link></li>
//           <li><Link to="/services" style={getNavLinkStyle("/services")}>Give a Pet</Link></li>
//           <li><Link to="/pets" style={getNavLinkStyle("/pets")}>Adopt Pets</Link></li>
//           <li><Link to="/contact" style={getNavLinkStyle("/contact")}>Contact Us</Link></li>
//           {isLoggedIn && userRole === "user" && (
//             <li><Link to="/notifications" style={getNavLinkStyle("/notifications")}>Notifications</Link></li>
//           )}
//           <li><Link to="/request-service" style={getNavLinkStyle("/request-service")}>Request a Service</Link></li>
//           <li><Link to="/donate" style={getNavLinkStyle("/donate")}>Donate</Link></li>
          
//         </Box>

//         {/* Right Side Buttons */}
//         <Box>
//           {isLoggedIn && userRole === "user" ? (
//             <>
//               <Button variant="contained" sx={buttonStyle} onClick={() => navigate("/services")}>
//                 Give a Pet
//               </Button>
//               <Button variant="contained" sx={logoutButtonStyle} onClick={handleLogout}>
//                 Logout
//               </Button>
//             </>
//           ) : (
//             <Button variant="contained" sx={buttonStyle} onClick={() => navigate("/login")}>
//               Login
//             </Button>
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;











import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../Assets/logo.png"; // Update path if needed

const buttonStyle = {
  backgroundColor: "#FFA500",
  color: "white",
  fontWeight: "bold",
  textTransform: "none",
  borderRadius: "20px",
  padding: "8px 16px",
  "&:hover": { backgroundColor: "#FF8C00" },
};

const logoutButtonStyle = {
  backgroundColor: "#FF4500",
  color: "white",
  fontWeight: "bold",
  textTransform: "none",
  borderRadius: "20px",
  padding: "8px 16px",
  marginLeft: "10px",
  "&:hover": { backgroundColor: "#D32F2F" },
};

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("role")?.toLowerCase();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const getNavLinkStyle = (path) => ({
    textDecoration: "none",
    color: location.pathname === path ? "#FFA500" : "#000",
    fontSize: "16px",
    fontWeight: "bold",
    borderBottom: location.pathname === path ? "2px solid #FFA500" : "none",
    paddingBottom: "2px",
    transition: "all 0.3s ease",
  });

  // Hide navbar for admin-related users
  if (["admin", "doctor", "service-manager", "shop-owner"].includes(userRole)) {
    return null;
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        padding: "10px 0",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo and App Name */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Box>
            <img
              src={logo}
              alt="Logo"
              style={{
                width: "95px",
                height: "auto",
                maxHeight: "95px",
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>

        {/* Navigation Links */}
        <Box
          component="ul"
          sx={{
            display: "flex",
            gap: "30px",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          <li>
            <Link to="/" style={getNavLinkStyle("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/services" style={getNavLinkStyle("/services")}>
              Give a Pet
            </Link>
          </li>
          <li>
            <Link to="/pets" style={getNavLinkStyle("/pets")}>
              Adopt Pets
            </Link>
          </li>
          <li>
            <Link to="/contact" style={getNavLinkStyle("/contact")}>
              Contact Us
            </Link>
          </li>
          {isLoggedIn && userRole === "user" && (
            <li>
              <Link to="/notifications" style={getNavLinkStyle("/notifications")}>
                Notifications
              </Link>
            </li>
          )}
          <li>
            <Link to="/request-service" style={getNavLinkStyle("/request-service")}>
              Request a Service
            </Link>
          </li>
          <li>
            <Link to="/donate" style={getNavLinkStyle("/donate")}>
              Donate
            </Link>
          </li>
          <li>
            <Link to="/reviews" style={getNavLinkStyle("/reviews")}>
              Reviews
            </Link>
          </li>
        </Box>

        {/* Right Side Buttons */}
        <Box>
          {isLoggedIn && userRole === "user" ? (
            <>
              <Button
                variant="contained"
                sx={buttonStyle}
                onClick={() => navigate("/services")}
              >
                Give a Pet
              </Button>
              <Button
                variant="contained"
                sx={logoutButtonStyle}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              sx={buttonStyle}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
