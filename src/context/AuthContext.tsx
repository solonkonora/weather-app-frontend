// context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, Dispatch, SetStateAction } from 'react';
import { API_BASE_URL } from '../providers/constants/constants';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;

  setCurrentUser: Dispatch<SetStateAction<null | User>>;
  currentUser: null | User;
  currentUserLoading: boolean;

  setRefetchCurrentUser: Dispatch<SetStateAction<boolean>>;
}

interface User {
  _id: string;
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentUserLoading, setCurrentUserLoading] = useState<boolean>(false);
  const [refetchCurrentUser, setRefetchCurrentUser] = useState<boolean>(false);

  const isAuthenticated = useMemo(() => {
    if (currentUserLoading || !currentUser) return false;

    if (currentUser && currentUser?._id) return true;

    return false;
  }, [currentUserLoading, currentUser])

  useEffect(() => {
    const token = localStorage.getItem("token");
    setCurrentUserLoading(true);

    if (!token) {
      setCurrentUserLoading(false);
      return;
    }

    fetch(API_BASE_URL + "/auth/current-user", {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
      .then((res) => res.json())
      .then(({ data, message }) => {
        setCurrentUser(data);
      })
      .finally(() => {
        setCurrentUserLoading(false);
      });
  }, [refetchCurrentUser]);

  const login = () => {
    setCurrentUser(null);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      currentUser,
      setCurrentUser,
      currentUserLoading,

      setRefetchCurrentUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
