import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import RoutesConfig from "./routes/RoutesConfig";
import Login from "./pages/Login";
import { AuthContext } from "./context/AuthContext";
import "./styles/globals.css";

function App() {
  const { isLoggedIn, login, logout } = useContext(AuthContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("isLoggedIn");
    if (storedUser) {
      login();
    }
  }, [login]);

  return (
    <Router basename={process.env.PUBLIC_URL || "/"}>
      {isLoggedIn ? (
        <div className="app-container flex h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Header onLogout={logout} />
            <div className="p-6">
              <Routes>
                <Route path="/*" element={<RoutesConfig />} />
                <Route path="/login" element={<Navigate to="/dashboard" />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
