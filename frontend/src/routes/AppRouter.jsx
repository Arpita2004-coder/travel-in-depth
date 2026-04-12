import React from "react"
import { BrowserRouter,Route,Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import DestinationPage from "../pages/DestinationPage"
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import ForgotPage from "../pages/ForgotPage";

import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminPlacesPage from "../pages/admin/AdminPlacesPage";
import AdminPlaceFormPage from "../pages/admin/AdminPlaceFormPage";
import ProtectedRoute from "../routes/ProtectedRoute"

const AppRouter=()=>{
    return (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />

      {/*Admin side*/}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/places"
        element={
          <ProtectedRoute>
            <AdminPlacesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/places/new"
        element={
          <ProtectedRoute>
            <AdminPlaceFormPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/places/:id/edit"
        element={
          <ProtectedRoute>
            <AdminPlaceFormPage />
          </ProtectedRoute>
        }
      />
        <Route path="/destinations" element={<DestinationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPage />} />
        {/* 404 Page for error*/}
        <Route path="*" element={<NotFoundPage />} />
        </Routes>
        
    );
}

export default AppRouter;
