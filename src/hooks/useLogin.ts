import { useState } from "react";
import { API_URL } from "../constants/urls";
import client from "../constants/apollo-client";

interface LoginRequest {
  email: string;
  password: string;
}

const useLogin = () => {
  const [error, setError] = useState<string>("");

  const login = async (request: LoginRequest) => {
    setError("");

    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      if (res.status === 401) {
        setError("Credentials are not valid.");
      } else {
        setError("An unknown error occurred.");
      }
      return;
    }

    // Refetch all active queries to update the cache when login with a new user
    await client.refetchQueries({ include: "active" });
  };

  return { login, error };
};

export { useLogin };