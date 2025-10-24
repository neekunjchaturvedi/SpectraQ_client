import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "../common/logo";
import useAuth from "@/hooks/useAuth";

export default function VerifyEmail() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    verifyUser,
    resendOtpToEmail,
    loading,
    error,
    message,
    clearAuthError,
    clearAuthMessage,
  } = useAuth();

  const emailFromState = (location.state as any)?.email as string | undefined;
  const [email, setEmail] = useState<string | null>(
    () => emailFromState ?? localStorage.getItem("email") ?? null
  );
  const [localError, setLocalError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    inputRefs.current[0]?.focus();
    clearAuthError();
    clearAuthMessage();
  }, [clearAuthError, clearAuthMessage]);

  useEffect(() => {
    if (error) setLocalError(error);
  }, [error]);

  useEffect(() => {
    if (message) setSuccessMsg(message);
  }, [message]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index]) return;
      if (index > 0) inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0)
      inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < 5)
      inputRefs.current[index + 1]?.focus();
  };

  const handleVerify = async () => {
    setLocalError(null);
    setSuccessMsg(null);
    const code = otp.join("");
    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      setLocalError("Please enter all 6 digits of the OTP.");
      return;
    }
    if (!email) {
      setLocalError(
        "Email is required to verify. Enter your email or come from signup flow."
      );
      return;
    }
    setSubmitting(true);
    try {
      const action = await verifyUser({ email, otp: parseInt(code, 10) });
      setSuccessMsg(
        (action as any).payload?.message ||
          "Email verified. Redirecting to login..."
      );
      setTimeout(() => navigate("/login"), 700);
    } catch (err: any) {
      setLocalError(err?.toString?.() || "Verification failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    setLocalError(null);
    setSuccessMsg(null);
    if (!email) {
      setLocalError(
        "Email is required to resend OTP. Enter your email or come from signup flow."
      );
      return;
    }
    setResending(true);
    try {
      const action = await resendOtpToEmail({ email });
      setSuccessMsg(
        (action as any).payload?.message || "OTP resent. Check your email."
      );
    } catch (err: any) {
      setLocalError(err?.toString?.() || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Logo />
      <Card className="w-full max-w-md shadow-lg mt-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Verify Your Email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-muted-foreground">
            Enter the 6-digit code sent to your email
          </p>

          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-12 text-center text-quantum-red text-lg font-semibold border border-red-500 outline-none rounded-md focus:ring-2 focus:ring-quantum-red"
              />
            ))}
          </div>

          {localError && (
            <div className="text-sm text-destructive text-center">
              {localError}
            </div>
          )}
          {!localError && successMsg && (
            <div className="text-sm text-success text-center">{successMsg}</div>
          )}

          <div className="flex flex-col items-center gap-3">
            <Button
              className="w-full bg-quantum-red text-white"
              onClick={handleVerify}
              disabled={submitting || loading}
            >
              {submitting || loading ? "Verifying..." : "Verify"}
            </Button>

            <button
              onClick={handleResend}
              className="text-sm text-muted-foreground hover:underline"
              disabled={resending || loading}
            >
              Didn’t receive the code?{" "}
              <span className="text-primary font-medium">
                {resending || loading ? "Sending..." : "Resend"}
              </span>
            </button>

            <button
              onClick={() => navigate("/login")}
              className="text-sm text-muted-foreground hover:underline"
            >
              Back to <span className="text-primary font-medium">Sign in</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
