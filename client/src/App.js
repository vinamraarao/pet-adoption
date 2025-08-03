// import React from "react";
// import { Routes, Route, useLocation, Navigate } from "react-router-dom";
// import { Box } from "@mui/material"; // Add Box for layout
// import Home from "./Pages/Home";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import PetDetails from "./Pages/PetDetails";
// import Navbar from "./Components/Navbar";
// import Services from "./Services/Services";
// import Pets from "./Pages/Pets";
// import Contact from "./Pages/Contact";
// import Notifications from "./Components/User/Notifications";
// import AdminPanel from "./Components/AdminPanel";
// import DoctorRoutes from "./Components/Doctor/DoctorRoutes";
// import ServiceRequestForm from "./Components/ServiceManager/ServiceRequestForm";
// import ManageServiceRequests from "./Components/ServiceManager/ManageServiceRequests";
// import ServiceManagerDashboard from "./Components/ServiceManager/ServiceManagerDashboard";
// import MyServiceRequests from "./Pages/MyServiceRequests";
// import ServiceManagerLayout from "./Components/ServiceManager/ServiceManagerLayout";
// import ShopOwnerDashboard from "./Components/ShopOwner/ShopOwnerDashboard";
// import ManageShopRequests from "./Components/ShopOwner/ManageShopRequests";
// import ShopOwnerLayout from "./Components/ShopOwner/ShopOwnerLayout";
// import Footer from "./Components/Footer";
// import PaymentPage from './Components/Payment/PaymentPage';
// import PaymentSuccess from './Components/Payment/PaymentSuccess';
// import Donate from './Pages/Donate';

// const ProtectedRoute = ({ element }) => {
//   const isLoggedIn = !!localStorage.getItem("token");
//   return isLoggedIn ? element : <Navigate to="/login" replace />;
// };

// const App = () => {
//   const location = useLocation();
//   const userRole = localStorage.getItem("role")?.toLowerCase();

//   const adminPaths = location.pathname.startsWith("/admin");
//   const doctorPaths = location.pathname.startsWith("/doctor");
//   const serviceManagerPaths = location.pathname.startsWith("/service-manager");
//   const shopOwnerPaths = location.pathname.startsWith("/shop-owner");

//   const shouldShowUserNavbar =
//     (!adminPaths && !doctorPaths && !serviceManagerPaths && !shopOwnerPaths && userRole !== "admin" && userRole !== "doctor" && userRole !== "service-manager" && userRole !== "shop-owner") ||
//     location.pathname === "/request-service";

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
//       {shouldShowUserNavbar && <Navbar />}
//       <Box sx={{ flex: 1 }}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/pets" element={<Pets />} />
//           <Route path="/pet/:id" element={<PetDetails />} />
//           <Route path="/services" element={<ProtectedRoute element={<Services />} />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/notifications" element={<ProtectedRoute element={<Notifications />} />} />
//           <Route path="/doctor/*" element={<DoctorRoutes />} />
//           <Route path="/service-manager" element={<ServiceManagerLayout />}>
//             <Route path="dashboard" element={<ServiceManagerDashboard />} />
//             <Route path="manage-requests" element={<ManageServiceRequests />} />
//             <Route path="my-requests" element={<MyServiceRequests />} />
//           </Route>
//           <Route path="/request-service" element={<ServiceRequestForm />} />
//           <Route path="/shop-owner" element={<ShopOwnerLayout />}>
//             <Route path="dashboard" element={<ShopOwnerDashboard />} />
//             <Route path="manage-requests" element={<ManageShopRequests />} />
//           </Route>
//           <Route path="/admin/dashboard" element={<AdminPanel />} />
//           <Route path="/payment" element={<PaymentPage />} />
//           <Route path="/payment-success" element={<PaymentSuccess />} />
//           <Route path="/donate" element={<ProtectedRoute element={<Donate />} />} />
//           {/* Redirect all other paths to Home */}
//         </Routes>
//       </Box>
//       {shouldShowUserNavbar && <Footer />}
//     </Box>
//   );
// };

// export default App;




import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Box } from "@mui/material";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import PetDetails from "./Pages/PetDetails";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Services from "./Services/Services";
import Pets from "./Pages/Pets";
import Contact from "./Pages/Contact";
import Notifications from "./Components/User/Notifications";
import AdminPanel from "./Components/AdminPanel";
import DoctorRoutes from "./Components/Doctor/DoctorRoutes";
import ServiceRequestForm from "./Components/ServiceManager/ServiceRequestForm";
import ManageServiceRequests from "./Components/ServiceManager/ManageServiceRequests";
import ServiceManagerDashboard from "./Components/ServiceManager/ServiceManagerDashboard";
import MyServiceRequests from "./Pages/MyServiceRequests";
import ServiceManagerLayout from "./Components/ServiceManager/ServiceManagerLayout";
import ShopOwnerDashboard from "./Components/ShopOwner/ShopOwnerDashboard";
import ManageShopRequests from "./Components/ShopOwner/ManageShopRequests";
import ShopOwnerLayout from "./Components/ShopOwner/ShopOwnerLayout";
import PaymentPage from "./Components/Payment/PaymentPage";
import PaymentSuccess from "./Components/Payment/PaymentSuccess";
import Donate from "./Pages/Donate";
import ReviewPage from './Pages/ReviewPage';

// ✅ Protected route
const ProtectedRoute = ({ element }) => {
  const isLoggedIn = !!localStorage.getItem("token");
  return isLoggedIn ? element : <Navigate to="/login" replace />;
};

const App = () => {
  const location = useLocation();
  const userRole = localStorage.getItem("role")?.toLowerCase();

  // ✅ Identify current routes
  const adminPaths = location.pathname.startsWith("/admin");
  const doctorPaths = location.pathname.startsWith("/doctor");
  const serviceManagerPaths = location.pathname.startsWith("/service-manager");
  const shopOwnerPaths = location.pathname.startsWith("/shop-owner");

  // ✅ Routes where Navbar and Footer should be hidden
  const hideHeaderFooterPaths = ["/login", "/register"];

  // ✅ Logic for showing Navbar and Footer
  const shouldShowUserHeaderFooter =
    !hideHeaderFooterPaths.includes(location.pathname) &&
    (
      (!adminPaths &&
        !doctorPaths &&
        !serviceManagerPaths &&
        !shopOwnerPaths &&
        userRole !== "admin" &&
        userRole !== "doctor" &&
        userRole !== "service-manager" &&
        userRole !== "shop-owner") ||
      location.pathname === "/request-service"
    );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* ✅ Conditional Navbar */}
      {shouldShowUserHeaderFooter && <Navbar />}

      <Box sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pet/:id" element={<PetDetails />} />
          <Route path="/services" element={<ProtectedRoute element={<Services />} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/notifications" element={<ProtectedRoute element={<Notifications />} />} />
          <Route path="/doctor/*" element={<DoctorRoutes />} />

          {/* Service Manager Routes */}
          <Route path="/service-manager" element={<ServiceManagerLayout />}>
            <Route path="dashboard" element={<ServiceManagerDashboard />} />
            <Route path="manage-requests" element={<ManageServiceRequests />} />
            <Route path="my-requests" element={<MyServiceRequests />} />
          </Route>

          <Route path="/request-service" element={<ServiceRequestForm />} />

          {/* Shop Owner Routes */}
          <Route path="/shop-owner" element={<ShopOwnerLayout />}>
            <Route path="dashboard" element={<ShopOwnerDashboard />} />
            <Route path="manage-requests" element={<ManageShopRequests />} />
          </Route>

          <Route path="/admin/dashboard" element={<AdminPanel />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/donate" element={<ProtectedRoute element={<Donate />} />} />
          <Route path="/reviews" element={<ReviewPage />} />

          {/* Optional: 404 fallback */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </Box>

      {/* ✅ Conditional Footer */}
      {shouldShowUserHeaderFooter && <Footer />}
    </Box>
  );
};

export default App;
