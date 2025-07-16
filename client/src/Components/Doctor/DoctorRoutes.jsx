import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardDoctor from "./DashboardDoctor";
import VerifyVaccination from "./VerifyVaccination";

const DoctorRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<DashboardDoctor />} />
      <Route path="verify-vaccination" element={<VerifyVaccination />} />
    </Routes>
  );
};

export default DoctorRoutes;







