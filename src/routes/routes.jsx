import { Routes, Route } from "react-router-dom";

// Layout
import AdminLayout from "../components/AdminLayout";

// Admin pages
import AdminDashboard from "../pages/Admin/AdminDashboard";

// Certifications
import CertificationList from "../pages/Admin/Certifications/CertificationList";
import CertificationForm from "../pages/Admin/Certifications/CertificationForm";
import CertificationView from "../pages/Admin/Certifications/CertificationView";

// Trainings
import TrainingList from "../pages/Admin/Trainings/TrainingList";
import TrainingForm from "../pages/Admin/Trainings/TrainingForm";
import TrainingView from "../pages/Admin/Trainings/TrainingView";

// Companies
import CompanyList from "../pages/Admin/Companies/CompanyList";
import CompanyForm from "../pages/Admin/Companies/CompanyForm";
import CompanyView from "../pages/Admin/Companies/CompanyView";
import CertificationToCompanyForm from "../pages/Admin/Companies/CompanyCertification/CertificationToCompanyForm";
import CompanyCertificateView from "../pages/Admin/Companies/CompanyCertification/CompanyCertificateView";
import TrainingToCompanyForm from "../pages/Admin/Companies/CompanyTraining/TrainingToCompanyForm";
import CompanyTrainingView from "../pages/Admin/Companies/CompanyTraining/CompanyTrainingView";

// Fields
import FieldList from "../pages/Admin/Fields/FieldList";
import FieldForm from "../pages/Admin/Fields/FieldForm";
import FieldView from "../pages/Admin/Fields/FieldView";

// Pages
import PageList from "../pages/Admin/NavPages/PageList";
import PageForm from "../pages/Admin/NavPages/PageForm";
import PageView from "../pages/Admin/NavPages/PageView";

// Not Found page (you should create this component)
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Admin layout wrapper */}
      <Route path="" element={<AdminLayout />}>
        {/* Dashboard */}
        <Route index element={<AdminDashboard />} />

        {/* Certifications */}
        <Route path="certifications" element={<CertificationList />} />
        <Route path="certifications/add" element={<CertificationForm />} />
        <Route
          path="certifications/edit/:id"
          element={<CertificationForm isEdit />}
        />
        <Route path="certifications/view/:id" element={<CertificationView />} />

        {/* Trainings */}
        <Route path="trainings" element={<TrainingList />} />
        <Route path="trainings/add" element={<TrainingForm />} />
        <Route path="trainings/edit/:id" element={<TrainingForm isEdit />} />
        <Route path="trainings/view/:id" element={<TrainingView />} />

        {/* Companies */}
        <Route path="companies" element={<CompanyList />} />
        <Route path="companies/add" element={<CompanyForm />} />
        <Route path="companies/edit/:id" element={<CompanyForm isEdit />} />
        <Route path="companies/view/:id" element={<CompanyView />} />
        <Route
          path="companies/:companyId/add-certification"
          element={<CertificationToCompanyForm />}
        />
        <Route
          path="companies/:companyId/edit-certification/:certificationId"
          element={<CertificationToCompanyForm isEdit />}
        />
        <Route
          path="companies/certificate/:id"
          element={<CompanyCertificateView />}
        />
        <Route
          path="companies/:companyId/add-training"
          element={<TrainingToCompanyForm />}
        />
        <Route
          path="companies/:companyId/edit-training/:trainingId"
          element={<TrainingToCompanyForm isEdit />}
        />
        <Route
          path="companies/training/:id"
          element={<CompanyTrainingView />}
        />

        {/* Fields */}
        <Route path="fields" element={<FieldList />} />
        <Route path="fields/add" element={<FieldForm />} />
        <Route path="fields/edit/:id" element={<FieldForm isEdit />} />
        <Route path="fields/view/:id" element={<FieldView />} />

        {/* Pages */}
        <Route path="pages" element={<PageList />} />
        <Route path="pages/add" element={<PageForm />} />
        <Route path="pages/edit/:id" element={<PageForm isEdit />} />
        <Route path="pages/view/:id" element={<PageView />} />

        {/* 404 - Admin section fallback */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Global fallback (optional) */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
