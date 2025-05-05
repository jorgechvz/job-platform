import { useMutation } from "@tanstack/react-query";
import { loginRequest, registerRequest } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { saveUserToLocalStorage } from "../lib/utils";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface DecodedToken {
  exp?: number;
  [key: string]: any;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      if (data.access_token && typeof data.access_token === "string") {
        const token = data.access_token.replace(/^"|"$/g, "");
        saveUserToLocalStorage(token);
        navigate("/dashboard/admin");
      }
    },
    onError: (error: AxiosError) => {
      toast.error("Error en el inicio de sesión", {
        description:
          error.response?.data &&
          typeof error.response.data === "object" &&
          "message" in error.response.data
            ? String(error.response.data.message)
            : "Error desconocido",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: () => {
      navigate("/auth/login");
    },
    onError: () => {
      toast.error("Error en el registro");
    },
  });

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/auth/login");
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      return false;
    }

    try {
      const decodedToken = jwtDecode<DecodedToken>(token);

      if (typeof decodedToken.exp !== "number") {
        return false;
      }

      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        logout();
        return false;
      }

      return true;
    } catch (error) {
      localStorage.removeItem("access_token");
      return false;
    }
  };

  const userRole = () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      return null;
    }
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      return decodedToken.role || null;
    } catch (error) {
      return null;
    }
  };

  return { loginMutation, logout, isAuthenticated, registerMutation, userRole };
};
