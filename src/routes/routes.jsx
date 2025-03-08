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
import ISO14001 from "../pages/Services/ISO14001";
import ISO27001 from "../pages/Services/ISO27001";
import ISO50001 from "../pages/Services/ISO50001";
import ISO22000 from "../pages/Services/ISO22000";
import FSSC22000 from "../pages/Services/FSSC22000";
import ISO45001 from "../pages/Services/ISO45001";
import IATF16949 from "../pages/Services/IATF16949";
import EN9100_EN9120 from "../pages/Services/EN9100_EN9120";


const routes = [
  { path: "/", element: <HomePage /> },
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
  { path: "/iso14001", element: <ISO14001 /> },
  { path: "/iso27001", element: <ISO27001 /> },
  { path: "/iso50001", element: <ISO50001 /> },
  { path: "/iso22000", element: <ISO22000 /> },
  { path: "/fssc22000", element: <FSSC22000 /> },
  { path: "/iso45001", element: <ISO45001 /> },
  { path: "/iatf16949", element: <IATF16949 /> },
  { path: "/en9100-en9120", element: <EN9100_EN9120 /> },  
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