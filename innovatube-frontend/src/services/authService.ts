const API = "http://localhost:5000/api";

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
