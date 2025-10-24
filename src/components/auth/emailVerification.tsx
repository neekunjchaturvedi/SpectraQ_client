import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "../common/logo";

export default function VerifyEmail() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length === 6) {
      console.log("Verifying OTP:", code);
      // Add your verification logic (API call) here
    } else {
      alert("Please enter all 6 digits of the OTP.");
    }
  };

  const handleResend = () => {
    console.log("Resending OTP...");
    // API call to resend OTP
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Logo />
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Verify Your Email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-muted-foreground">
            Enter the 6-digit code sent to your email
          </p>

          {/* OTP Inputs */}
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

          {/* Buttons */}
          <div className="flex flex-col items-center gap-3">
            <Button className="w-full bg-quantum-red text-white" onClick={handleVerify}>
              Verify
            </Button>
            <button
              onClick={handleResend}
              className="text-sm text-muted-foreground hover:underline"
            >
              Didn’t receive the code?{" "}
              <span className="text-primary font-medium">Resend</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
