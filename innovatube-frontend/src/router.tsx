import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute";

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* Redirección inicial al login */}
      <Route path="/" element={<Navigate to="/login" />} />
      
      {/* Rutas públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Ruta protegida */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);
