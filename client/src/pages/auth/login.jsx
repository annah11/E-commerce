import React, { useState } from "react";
import { login } from "@/services/api";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await login({ email, password });
      // Handle successful login (e.g., save token, redirect)
      console.log(response.data);
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error(error);
    }
  };

  return (
    <div>
      {/* Your login form UI */}
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
