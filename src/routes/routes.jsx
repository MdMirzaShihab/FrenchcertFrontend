import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ValidateCertificate from "../pages/ValidateCertificate";
import CompanyLogin from "../pages/CompanyLogin";
import CompanyDetails from "../pages/CompanyDetails";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/validate" element={<ValidateCertificate />} />
        <Route path="/login" element={<CompanyLogin />} />
        <Route path="/company-details" element={<CompanyDetails />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
