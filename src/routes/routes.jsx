import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import ValidateCertificate from "../pages/ValidateCertificate";
import CompanyLogin from "../pages/Company Profile/CompanyLogin";
import CompanyDetails from "../pages/Company Profile/CompanyDetails";
import Career from "../pages/Career";
import Services from "../pages/Services/Services";
import About from "../pages/AboutUs/AboutUs";
import Contact from "../pages/Contact/Contact";
import JoinUs from "../pages/JoinUs/JoinUs";
import Process from "../pages/Processes/Processes";
import Accreditations from "../pages/Accreditations/Accreditations";


import ISO9001 from "../pages/Services/ISO9001"
import VerifyCertificate from "../components/VerifyCertificate";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/verify", element: <VerifyCertificate /> },
  { path: "/validate/:certificationID", element: <ValidateCertificate /> },
  { path: "/login", element: <CompanyLogin /> },
  { path: "/company-details/:companyID", element: <CompanyDetails /> }, 
  { path: "/accreditations", element: <Accreditations /> }, 
  { path: "/career", element: <Career /> },
  { path: "/services", element: <Services /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/join-us", element: <JoinUs /> },
  { path: "/process", element: <Process /> },
  { path: "/iso9001", element: <ISO9001 /> },
];

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRoutes;