import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clipboard, Check } from "phosphor-react";
import "../App.css";

const Dashboard: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("google_token");
    if (!storedToken) {
      navigate("/"); // Redireciona para a página de Login se não houver token
    } else {
      setToken(storedToken);
    }
  }, [navigate]);

  const handleCopy = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);

      // Reseta o estado "copied" após 2 segundos
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-900 via-gray-800/90 bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Dashboard
        </h1>
        {token ? (
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Google Token
            </h2>
            <div
              className="flex items-center bg-gray-100 p-4 rounded-lg border border-gray-300"
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              <pre className="text-sm font-mono flex-grow break-all whitespace-pre-wrap">
                {token}
              </pre>
              <div className="flex items-center justify-center ml-4">
                <button
                  onClick={handleCopy}
                  className="p-3 rounded-full bg-gray-600 text-white hover:bg-gray-700 focus:outline-none transition duration-300 flex items-center justify-center"
                  aria-label="Copiar Token"
                >
                  {copied ? (
                    <Check size={24} className="text-white" />
                  ) : (
                    <Clipboard size={24} />
                  )}
                </button>
              </div>
            </div>
            {copied && (
              <p className="text-sm text-green-500 mt-2 text-center">
                Token copiado com sucesso!
              </p>
            )}
          </div>
        ) : (
          <p className="text-lg text-gray-700 text-center">Carregando...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
