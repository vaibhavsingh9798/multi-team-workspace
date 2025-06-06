"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { User, Company } from "@/types";

interface AuthContextProps {
  user: User | null;
  token: string | null;
  companies: Company[];
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load token & user & companies from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedCompanies = localStorage.getItem("companies");
    const storedSelectedCompany = localStorage.getItem("selectedCompany");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));

      if (storedCompanies) {
        const parsedCompanies: Company[] = JSON.parse(storedCompanies);
        setCompanies(parsedCompanies);

        if (storedSelectedCompany) {
          setSelectedCompany(JSON.parse(storedSelectedCompany));
        } else {
          setSelectedCompany(parsedCompanies[0] || null);
        }
      } else {
        fetchCompanies(storedToken);
      }
    }
    setLoading(false);
  }, []);

  // Fetch companies from API
  const fetchCompanies = async (authToken: string) => {
    try {
      const res = await axios.get("/companies", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setCompanies(res.data);
      localStorage.setItem("companies", JSON.stringify(res.data));
      setSelectedCompany(res.data[0] || null);
      localStorage.setItem("selectedCompany", JSON.stringify(res.data[0] || null));
    } catch (error) {
      console.error("Failed to fetch companies", error);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await axios.post("/auth/login", { email, password });
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      setUser(user);

      // fetch companies after login
      await fetchCompanies(token);

      router.push("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      setUser(user);

      // fetch companies after signup
      await fetchCompanies(token);

      router.push("/dashboard");
    } catch (err) {
      console.error("Signup failed", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("companies");
    localStorage.removeItem("selectedCompany");
    setToken(null);
    setUser(null);
    setCompanies([]);
    setSelectedCompany(null);
    router.push("/login");
  };

  // Update selectedCompany in localStorage and state
  const handleSetSelectedCompany = (company: Company) => {
    setSelectedCompany(company);
    localStorage.setItem("selectedCompany", JSON.stringify(company));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        companies,
        selectedCompany,
        setSelectedCompany: handleSetSelectedCompany,
        login,
        signup,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
