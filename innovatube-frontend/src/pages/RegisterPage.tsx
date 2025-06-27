import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const nameRegex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{2,}$/;
    const usernameRegex = /^[a-zA-Z0-9_-]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^\S{6,}$/;

    if (!nameRegex.test(form.name)) {
      setError("Nombre inválido (solo letras y espacios, mínimo 2)");
      return false;
    }
    if (!usernameRegex.test(form.username)) {
      setError("Usuario inválido (mínimo 3 caracteres sin símbolos especiales)");
      return false;
    }
    if (!emailRegex.test(form.email)) {
      setError("Correo electrónico inválido");
      return false;
    }
    if (!passwordRegex.test(form.password)) {
      setError("La contraseña debe tener al menos 6 caracteres y sin espacios");
      return false;
    }
    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }

    setError("");
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: form.name,
              username: form.username,
              email: form.email,
              password: form.password,
            }),
          });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "No se pudo registrar el usuario");
      }

      window.location.href = "/login";
    } catch (err: any) {
      setError(err.message || "Error al registrar");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f0f0f] text-white px-4">
      <div className="bg-[#1f1f1f] p-8 rounded-xl w-full max-w-md shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <UserPlus className="text-red-600 mr-2" size={28} />
          <h1 className="text-3xl font-bold">Crea tu cuenta</h1>
        </div>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {["name", "username", "email", "password", "confirmPassword"].map((field) => (
          <input
            key={field}
            type={field.includes("password") ? "password" : field === "email" ? "email" : "text"}
            name={field}
            placeholder={
              field === "name"
                ? "Nombre completo"
                : field === "username"
                ? "Nombre de usuario"
                : field === "email"
                ? "Correo electrónico"
                : field === "password"
                ? "Contraseña"
                : "Confirmar contraseña"
            }
            value={(form as any)[field]}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        ))}

        <button
          onClick={handleRegister}
          className="w-full bg-red-600 hover:bg-red-500 p-3 rounded font-semibold transition-colors"
        >
          Registrarse
        </button>

        <p className="text-center text-sm mt-6 text-gray-400">
          ¿Ya tienes cuenta? {" "}
          <Link
            to="/login"
            className="text-red-400 hover:underline hover:text-red-300"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;