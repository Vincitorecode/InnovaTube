const API = `${import.meta.env.VITE_API_URL}/api`;

export const login = async (credentials: {
  emailOrUsername: string;
  password: string;
}) => {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return await res.json(); // contiene token
};
