import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

import AdminLayout from "../components/AdminLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import CertificationList from "../pages/Admin/Certifications/CertificationList";
import CertificationForm from "../pages/Admin/Certifications/CertificationForm";
import CertificationView from "../pages/Admin/Certifications/CertificationView";
import TrainingList from "../pages/Admin/Trainings/TrainingList";
import TrainingForm from "../pages/Admin/Trainings/TrainingForm";
import CompanyList from "../pages/Admin/Companies/CompanyList";
import CompanyForm from "../pages/Admin/Companies/CompanyForm";
import CompanyView from "../pages/Admin/Companies/CompanyView";
import CertificationToCompanyForm from "../pages/Admin/Companies/CompanyCertification/CertificationToCompanyForm";
import CompanyCertificateView from "../pages/Admin/Companies/CompanyCertification/CompanyCertificateView";
import TrainingToCompanyForm from "../pages/Admin/Companies/CompanyTraining/TrainingToCompanyForm";
import FieldForm from "../pages/Admin/Fields/FieldForm";
import FieldList from "../pages/Admin/Fields/FieldList";
import FieldView from "../pages/Admin/Fields/FieldView";


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


import ISO9001 from "../pages/Services/ISO9001";
import ISO14001 from "../pages/Services/ISO14001";
import ISO27001 from "../pages/Services/ISO27001";
import ISO50001 from "../pages/Services/ISO50001";
import ISO22000 from "../pages/Services/ISO22000";
import FSSC22000 from "../pages/Services/FSSC22000";
import ISO45001 from "../pages/Services/ISO45001";
import IATF16949 from "../pages/Services/IATF16949";
import EN9100_EN9120 from "../pages/Services/EN9100_EN9120";
import CertificationCardList from "../pages/Services/CertificationCardList";
import CertificationDetail from "../pages/Services/CertificationDetail";
import TrainingView from "../pages/Admin/Trainings/TrainingView";
import CompanyTrainingView from "../pages/Admin/Companies/CompanyTraining/CompanyTrainingView";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes with main layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="validate/:certificationID"
          element={<ValidateCertificate />}
        />
        <Route path="login" element={<CompanyLogin />} />
        <Route path="company-details/:companyID" element={<CompanyDetails />} />
        <Route path="accreditations" element={<Accreditations />} />
        <Route path="career" element={<Career />} />
        <Route path="services" element={<Services />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="join-us" element={<JoinUs />} />
        <Route path="process" element={<Process />} />

        {/* Service pages */}
        <Route path="iso9001" element={<ISO9001 />} />
        <Route path="iso14001" element={<ISO14001 />} />
        <Route path="iso27001" element={<ISO27001 />} />
        <Route path="iso50001" element={<ISO50001 />} />
        <Route path="iso22000" element={<ISO22000 />} />
        <Route path="fssc22000" element={<FSSC22000 />} />
        <Route path="iso45001" element={<ISO45001 />} />
        <Route path="iatf16949" element={<IATF16949 />} />
        <Route path="en9100-en9120" element={<EN9100_EN9120 />} />
        <Route path="certification-cards" element={<CertificationCardList />} />
        <Route path="certification-cards/:id" element={<CertificationDetail />} />
      </Route>

      {/* Admin routes with admin layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />

        {/* Certifications routes */}
        <Route path="certifications">
          <Route index element={<CertificationList />} />
          <Route path="add" element={<CertificationForm />} />
          <Route path="edit/:id" element={<CertificationForm isEdit />} />
          <Route path="view/:id" element={<CertificationView />} />
        </Route>

        {/* Trainings routes */}
        <Route path="trainings">
          <Route index element={<TrainingList />} />
          <Route path="add" element={<TrainingForm />} />
          <Route path="edit/:id" element={<TrainingForm isEdit />} />
          <Route path="view/:id" element={<TrainingView />} />
        </Route>

        {/* Companies routes */}
        <Route path="companies">
          <Route index element={<CompanyList />} />
          <Route path="add" element={<CompanyForm />} />
          <Route path="edit/:id" element={<CompanyForm isEdit />} />
          <Route path="view/:id" element={<CompanyView />} />
          <Route
            path=":companyId/add-certification"
            element={<CertificationToCompanyForm />}
          />
          <Route
            path=":companyId/edit-certification/:certificationId"
            element={<CertificationToCompanyForm isEdit />}
          />
          <Route path="certificate/:id" element={<CompanyCertificateView />} />
          <Route
            path=":companyId/add-training"
            element={<TrainingToCompanyForm/>}
          />
                    <Route
            path=":companyId/edit-training/:trainingId"
            element={<TrainingToCompanyForm isEdit />}
          />
          <Route path="training/:id" element={<CompanyTrainingView />} />
        </Route>

        {/* Fields routes */}
        <Route path="fields">
          <Route index element={<FieldList />} />
          <Route path="add" element={<FieldForm />} />
          <Route path="edit/:id" element={<FieldForm isEdit />} />
          <Route path="view/:id" element={<FieldView />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
