"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import userServices from "@/services/user-api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    // debugger;

    console.log("handleLogin submit");

    try {
      console.log("handleLogin submit inside if");
      const response = await userServices.loginUser({
        email,
        password,
      });
      console.log("handleLogin submit inside if, response", response);
      localStorage.setItem("token", response.token);
      router.push("/car-form");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
