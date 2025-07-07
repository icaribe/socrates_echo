import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import AuthenticationScreen from "pages/authentication-screen";
import StudentDashboard from "pages/student-dashboard";
import TeacherDashboard from "pages/teacher-dashboard";
import LearningTrailsManagement from "pages/learning-trails-management";
import PhilosophyJourneyMode from "pages/philosophy-journey-mode";
import ClassManagementInterface from "pages/class-management-interface";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<AuthenticationScreen />} />
        <Route path="/authentication-screen" element={<AuthenticationScreen />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/learning-trails-management" element={<LearningTrailsManagement />} />
        <Route path="/philosophy-journey-mode" element={<PhilosophyJourneyMode />} />
        <Route path="/class-management-interface" element={<ClassManagementInterface />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;