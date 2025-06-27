import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";

// Simulamos verificación de autenticación
const isAuthenticated = !!localStorage.getItem("token");

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* Redirección raíz según autenticación */}
      <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />} />
      
      {/* Rutas normales */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />} />
    </Routes>
  </BrowserRouter>
);
