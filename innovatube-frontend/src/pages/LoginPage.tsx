import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PlayCircle } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    emailOrUsername: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Expreesiones regulares para validación
  const usernameRegex = /^[a-zA-Z0-9@._-]+$/;   // usuario o email
  const passwordRegex = /^[^\s'"<>;]+$/;        // password sin espacios, comillas, <, >, ;

   // Función para validar input según campo
  const isValidInput = (input: string, field: 'username' | 'password') => {
    if (field === 'username') return usernameRegex.test(input);
    if (field === 'password') return passwordRegex.test(input);
    return false;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!form.emailOrUsername || !form.password) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (!isValidInput(form.password, 'password')) {
      setError("Contraseña con caracteres inválidos");
      return;
    }


    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.emailOrUsername,
        password: form.password,
      }),
    });


      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Error de autenticación");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f0f0f] text-white px-4 py-10">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-6">
        <PlayCircle size={32} className="text-red-600" />
        <h1 className="text-3xl font-bold">InnovaTube</h1>
      </div>

      {/* Form */}
      <div className="bg-[#1f1f1f] p-6 sm:p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <input
          type="text"
          name="emailOrUsername"
          placeholder="Correo electrónico o usuario"
          value={form.emailOrUsername}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-red-600 hover:bg-red-500 p-3 rounded font-semibold transition-colors"
        >
          Iniciar sesión
        </button>

        <p className="text-center text-sm mt-6 text-gray-400">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="text-red-400 hover:underline hover:text-red-300"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
