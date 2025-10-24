import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import logo from "@/assets/logo.jpg";

type FormState = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  mobileNumber: string;
  password: string;
  role?: string;
};

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

const Signupform = () => {
  const navigate = useNavigate();
  const {
    registerUser,
    loading,
    error,
    message,
    clearAuthError,
    clearAuthMessage,
  } = useAuth();

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    mobileNumber: "",
    password: "",
  });

  const [localError, setLocalError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    clearAuthError();
    clearAuthMessage();
  }, [clearAuthError, clearAuthMessage]);

  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    setLocalError(null);
  };

  const validate = () => {
    const { firstName, lastName, username, email, mobileNumber, password } =
      form;
    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !mobileNumber ||
      !password
    ) {
      setLocalError("All fields are required");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setLocalError("Please enter a valid email address");
      return false;
    }
    if (!/^\+?\d{7,15}$/.test(mobileNumber)) {
      setLocalError("Please enter a valid mobile number");
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

    if (!validate()) {
      return;
    }

    setSubmitted(true);
    try {
      const payload = {
        email: form.email.trim(),
        password: form.password,
        mobileNumber: form.mobileNumber.trim(),
        username: form.username.trim(),
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
      };

      const resultAction = await registerUser(payload as any);
      const payloadResult: any = (resultAction as any).payload;

      if ((resultAction as any).error) {
        const maybeError =
          (resultAction as any).error?.message || "Registration failed";
        setLocalError(maybeError);
        setSubmitted(false);
        return;
      }

      try {
        localStorage.setItem("email", form.email.trim());
      } catch (err) {
        console.warn("Failed to persist signup email", err);
      }

      navigate("/verify-email", { state: { email: form.email } });
    } catch (err: any) {
      setLocalError(err?.message || "Registration failed");
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
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-balance text-muted-foreground">
            Enter your information to create a new account
          </p>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                placeholder="Max"
                required
                value={form.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                placeholder="Robinson"
                required
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="maxrobinson"
              required
              value={form.username}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="mobileNumber">Mobile number</Label>
            <Input
              id="mobileNumber"
              type="tel"
              placeholder="+1234567890"
              required
              value={form.mobileNumber}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {localError && (
            <div className="text-sm text-destructive mt-1">{localError}</div>
          )}

          {message && !localError && (
            <div className="text-sm text-success mt-1">{message}</div>
          )}

          <Button
            type="submit"
            className="w-full btn-quantum"
            disabled={loading || submitted}
          >
            {loading || submitted ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline font-semibold">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

const Signup = () => {
  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2 bg-background text-foreground relative">
      <BrandingPanel />
      <Signupform />
    </div>
  );
};

export default Signup;
