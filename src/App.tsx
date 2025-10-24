import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home(401)/home";
import Dashboard from "./pages/home/dashboard";
import LoginPage from "./pages/auth/loginPage";
import SignupPage from "./pages/auth/signupPage";
import EmailVerifyPage from "./pages/auth/emailVerifyPage";
import ResetPasswordPage from "./pages/auth/resetPasswordPage";
import ForgotPasswordPage from "./pages/auth/forgotPasswordPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-email" element={<EmailVerifyPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:id" element={<ResetPasswordPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
