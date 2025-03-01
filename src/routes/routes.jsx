import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import ValidateCertificate from "../pages/ValidateCertificate";
import CompanyLogin from "../pages/CompanyLogin";
import CompanyDetails from "../pages/CompanyDetails";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/validate", element: <ValidateCertificate /> },
  { path: "/login", element: <CompanyLogin /> },
  { path: "/company-details", element: <CompanyDetails /> },
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
