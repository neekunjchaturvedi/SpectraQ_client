import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import Logo from "../common/logo";
import useAuth from "@/hooks/useAuth";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [localMessage, setLocalMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const {
    validateReset,
    resetUserPassword,
    loading,
    error,
    message,
    clearAuthError,
    clearAuthMessage,
  } = useAuth();

  useEffect(() => {
    clearAuthError();
    clearAuthMessage();
    if (!token) {
      navigate("/forgot-password");
      return;
    }
    validateReset({ token })
      .then(() => {})
      .catch((err: any) => {
        setLocalError(
          typeof err === "string" ? err : "Invalid or expired token"
        );
        setTimeout(() => navigate("/forgot-password"), 1200);
      });
  }, [token, navigate, validateReset, clearAuthError, clearAuthMessage]);

  useEffect(() => {
    if (error) setLocalError(error);
  }, [error]);

  useEffect(() => {
    if (message) setLocalMessage(message);
  }, [message]);

  const handleReset = async () => {
    setLocalError(null);
    setLocalMessage(null);
    if (!newPassword || !confirmPassword) {
      setLocalError("Please fill in both fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setLocalError("Password must be at least 8 characters.");
      return;
    }
    if (!token) {
      setLocalError("Invalid reset token.");
      return;
    }
    setSubmitting(true);
    try {
      const action = await resetUserPassword({ token, password: newPassword });
      const payload = (action as any).payload;
      setLocalMessage(
        payload?.message ||
          "Password reset successfully. Redirecting to login..."
      );
      setTimeout(() => navigate("/login"), 900);
    } catch (err: any) {
      setLocalError(
        typeof err === "string"
          ? err
          : err?.message || "Failed to reset password"
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
            Reset Your Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-muted-foreground">
            Enter your new password below
          </p>

          <div className="relative">
            <Input
              type={showNew ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="pr-10 text-quantum-red"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-2.5 text-muted-foreground"
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <Input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pr-10 text-quantum-red"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-2.5 text-muted-foreground"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

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
            onClick={handleReset}
            disabled={submitting || loading}
          >
            {submitting || loading ? "Resetting..." : "Reset Password"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
