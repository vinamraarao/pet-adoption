// import React from "react";
// import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../Assets/logo.png";

// const navLinkStyle = {
//   textDecoration: "none",
//   color: "#000",
//   fontSize: "16px",
//   fontWeight: "bold",
// };

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

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("userId");
//     navigate("/login");
//   };

//   if (userRole === "admin" || userRole === "doctor" || userRole === "service-manager" || userRole === "shop-owner") {
//     return null;
//   }

//   return (
//     <AppBar position="static" sx={{ backgroundColor: "white", padding: "10px 0", boxShadow: "none" }}>
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
//           <img src={logo} alt="Logo" style={{ width: "40px", height: "40px" }} />
//           <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000" }}>
//             PawFinds
//           </Typography>
//         </Box>

//         <Box component="ul" sx={{ display: "flex", gap: "30px", listStyle: "none", padding: 0, margin: 0 }}>
//           <li>
//             <Link to="/" style={navLinkStyle}>
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link to="/services" style={navLinkStyle}>
//               Services
//             </Link>
//           </li>
//           <li>
//             <Link to="/pets" style={navLinkStyle}>
//               Pets
//             </Link>
//           </li>
//           <li>
//             <Link to="/contact" style={navLinkStyle}>
//               Contact Us
//             </Link>
//           </li>
//           {isLoggedIn && userRole === "user" && (
//             <li>
//               <Link to="/notifications" style={navLinkStyle}>
//                 Notifications
//               </Link>
//             </li>
//           )}
//           <li>
//             <Link to="/request-service" style={navLinkStyle}>
//               Request a Service
//             </Link>
//           </li>
//         </Box>

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




// import React from "react";
// import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../Assets/logo.png";

// const navLinkStyle = {
//   textDecoration: "none",
//   color: "#000",
//   fontSize: "16px",
//   fontWeight: "bold",
// };

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

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("userId");
//     navigate("/login");
//   };

//   // Hide navbar for admin-related users
//   if (["admin", "doctor", "service-manager", "shop-owner"].includes(userRole)) {
//     return null;
//   }

//   return (
//     <AppBar position="static" sx={{ backgroundColor: "white", padding: "10px 0", boxShadow: "none" }}>
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         {/* Logo and App Name */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
//           <img src={logo} alt="Logo" style={{ width: "40px", height: "40px" }} />
//           <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000" }}>
//             PawFinds
//           </Typography>
//         </Box>

//         {/* Navigation Links */}
//         <Box component="ul" sx={{ display: "flex", gap: "30px", listStyle: "none", padding: 0, margin: 0 }}>
//           <li><Link to="/" style={navLinkStyle}>Home</Link></li>
//           <li><Link to="/services" style={navLinkStyle}>Adopt a Pet</Link></li>
//           <li><Link to="/pets" style={navLinkStyle}>Pets</Link></li>
//           <li><Link to="/contact" style={navLinkStyle}>Contact Us</Link></li>
//           {isLoggedIn && userRole === "user" && (
//             <li><Link to="/notifications" style={navLinkStyle}>Notifications</Link></li>
//           )}
//           <li><Link to="/request-service" style={navLinkStyle}>Request a Service</Link></li>
//           <li><Link to="/donate" style={navLinkStyle}>Donate</Link></li>
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
import logo from "../Assets/logo.png"; // Make sure this points to your actual file

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
    <AppBar position="static" sx={{ backgroundColor: "white", padding: "10px 0", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo and App Name */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Box>
            <img
              src={logo}
              alt="Logo"
              style={{
                width: "95",
                height: "auto",
                maxHeight: "95px",
                objectFit: "contain",
              }}
            />
          </Box>
          {/* <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000" }}>
            PawFinds
          </Typography> */}
        </Box>

        {/* Navigation Links */}
        <Box component="ul" sx={{ display: "flex", gap: "30px", listStyle: "none", padding: 0, margin: 0 }}>
          <li><Link to="/" style={getNavLinkStyle("/")}>Home</Link></li>
          <li><Link to="/services" style={getNavLinkStyle("/services")}>Adopt a Pet</Link></li>
          <li><Link to="/pets" style={getNavLinkStyle("/pets")}>Pets</Link></li>
          <li><Link to="/contact" style={getNavLinkStyle("/contact")}>Contact Us</Link></li>
          {isLoggedIn && userRole === "user" && (
            <li><Link to="/notifications" style={getNavLinkStyle("/notifications")}>Notifications</Link></li>
          )}
          <li><Link to="/request-service" style={getNavLinkStyle("/request-service")}>Request a Service</Link></li>
          <li><Link to="/donate" style={getNavLinkStyle("/donate")}>Donate</Link></li>
        </Box>

        {/* Right Side Buttons */}
        <Box>
          {isLoggedIn && userRole === "user" ? (
            <>
              <Button variant="contained" sx={buttonStyle} onClick={() => navigate("/services")}>
                Give a Pet
              </Button>
              <Button variant="contained" sx={logoutButtonStyle} onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button variant="contained" sx={buttonStyle} onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
