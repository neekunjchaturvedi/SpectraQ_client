import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import logo from "@/assets/logo.jpg";

const BrandingPanel = () => {
  const nav = useNavigate();

  return (
    <>
      <div
        className="absolute top-6 left-6 flex items-center gap-2 cursor-pointer text-sm text-foreground hover:text-primary"
        onClick={() => nav(-1)}
      >
        <ArrowLeft size={16} />
        Go Back
      </div>

      <div
        className="hidden bg-muted lg:flex flex-col items-center justify-center p-8 text-center border-r cursor-pointer"
        onClick={() => nav("/")}
      >
        <img src={logo} alt="SpectraQ Logo" className="h-20" />
        <h1 className="text-4xl font-bold text-primary">SpectraQ</h1>
        <h2 className="lg:text-xl font-bold text-foreground mb-6 leading-tight">
          The Future of <span className="text-primary">Prediction Markets</span>{" "}
          is Here
        </h2>
      </div>
    </>
  );
};

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    loginUser,
    loading,
    error,
    message,
    clearAuthError,
    clearAuthMessage,
  } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [localMessage, setLocalMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    clearAuthError();
    clearAuthMessage();
  }, [clearAuthError, clearAuthMessage]);

  useEffect(() => {
    if (error) setLocalError(error);
  }, [error]);

  useEffect(() => {
    if (message) setLocalMessage(message);
  }, [message]);

  const validate = () => {
    if (!email || !password) {
      setLocalError("Email and password are required");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setLocalError("Please enter a valid email");
      return false;
    }
    if (password.length < 8) {
      setLocalError("Password must be at least 8 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setLocalMessage(null);

    if (!validate()) return;

    setSubmitted(true);
    try {
      const action = await loginUser({ email: email.trim(), password });
      const payload = (action as any).payload;
      const rejected = (action as any).error;

      if (rejected) {
        const maybeError = (action as any).error?.message || "Login failed";
        setLocalError(maybeError);
        setSubmitted(false);
        return;
      }

      if (payload?.message && !payload?.token) {
        try {
          localStorage.setItem("signup_email", email.trim());
        } catch {}
        navigate("/verify-email", { state: { email: email.trim() } });
        return;
      }

      if (payload?.token && payload?.user) {
        navigate("/");
        return;
      }

      setLocalMessage("Login successful");
    } catch (err: any) {
      setLocalError(err?.message || "Login failed");
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-6">
      <div className="mx-auto grid w-[380px] gap-6">
        <div className="flex flex-col justify-center items-center md:hidden">
          <img src={logo} alt="SpectraQ Logo" />
          <h1 className="text-xl font-bold tracking-tighter">SpectraQ</h1>
        </div>
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to log into your account
          </p>
        </div>
        <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              required
              className="bg-black border border-gray-800 outline-none rounded p-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                to="/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              className="bg-black border border-gray-800 outline-none rounded p-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {localError && (
            <div className="text-sm text-destructive mt-1">{localError}</div>
          )}
          {!localError && localMessage && (
            <div className="text-sm text-success mt-1">{localMessage}</div>
          )}

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground p-2 rounded border"
            disabled={loading || submitted}
          >
            {loading || submitted ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="underline font-semibold">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2 bg-background text-foreground">
      <BrandingPanel />
      <LoginForm />
    </div>
  );
};

export default Login;
