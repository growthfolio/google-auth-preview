import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse: any) => {
    const token = credentialResponse.credential;
    localStorage.setItem("google_token", token);
    navigate("/dashboard"); // Redireciona para a página de Dashboard
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-900 via-gray-800/90 bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white/90 shadow-xl rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Bem-vindo!</h1>
        <p className="text-gray-600 mb-6">
          Faça login com sua conta Google para acessar o dashboard.
        </p>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => alert("Login falhou. Tente novamente!")}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
