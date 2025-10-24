import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "../common/logo";
import useAuth from "@/hooks/useAuth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [localMessage, setLocalMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    forgotUserPassword,
    loading,
    error,
    message,
    clearAuthError,
    clearAuthMessage,
  } = useAuth();

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

  const handleSubmit = async () => {
    setLocalError(null);
    setLocalMessage(null);
    if (!email) {
      setLocalError("Please enter your email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalError("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    try {
      const action = await forgotUserPassword({ email: email.trim() });
      const payload = (action as any).payload;
      try {
        localStorage.setItem("reset_email", email.trim());
      } catch {}
      setLocalMessage(
        payload?.message || "Reset link sent. Redirecting to login..."
      );
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setLocalError(
        typeof err === "string"
          ? err
          : err?.message || "Failed to send reset email."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Logo />
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Forgot Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-muted-foreground">
            Enter your registered email address to receive a password reset
            link.
          </p>

          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {localError && (
            <div className="text-sm text-destructive text-center">
              {localError}
            </div>
          )}
          {!localError && localMessage && (
            <div className="text-sm text-success text-center">
              {localMessage}
            </div>
          )}

          <Button
            className="w-full bg-quantum-red text-white"
            onClick={handleSubmit}
            disabled={loading || submitting}
          >
            {loading || submitting ? "Sending..." : "Submit"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Remembered your password?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-primary hover:underline cursor-pointer"
            >
              Back to Login
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
