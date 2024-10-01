// src/api/auth.ts

interface UserData {
    username: string;
    password: string;
  }
  
  interface LoginResponse {
    token: string;
    user: string; // Replace 'any' with your actual user type
  }
  
  interface SignUpResponse {
    message: string; // Adjust based on your API response
  }
  
  export const saveToken = (token: string): void => {
    localStorage.setItem("jwt_token", token);
  };
  
  export const getToken = (): string | null => {
    return localStorage.getItem("jwt_token");
  };
  
  export const removeToken = (): void => {
    localStorage.removeItem("jwt_token");
  };
  
  export const login = async (userData: UserData): Promise<LoginResponse> => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }
  
    const data: LoginResponse = await response.json();
    saveToken(data.token);
    return data;
  };
  
  export const signUp = async (userData: UserData): Promise<SignUpResponse> => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Sign up failed");
    }
  
    return await response.json(); // Assuming it returns a message or similar response
  };