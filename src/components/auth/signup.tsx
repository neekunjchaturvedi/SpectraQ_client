import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import logo from "/logo.png";

const BrandingPanel = () => {
  const nav = useNavigate();

  return (
    <>
      {/* Go Back Button */}
      <div
        className="absolute top-6 left-6 flex items-center gap-2 cursor-pointer text-sm text-foreground hover:text-primary"
        onClick={() => nav(-1)}
      >
        <ArrowLeft size={16} />
        Go Back
      </div>

      {/* Branding Section */}
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

const Signupform = () => (
  <div className="flex items-center justify-center py-12 px-6">
    <div className="mx-auto grid w-[380px] gap-6">
      {/* Mobile Branding */}
      <div className="flex flex-col justify-center items-center md:hidden">
        <img src={logo} alt="SpectraQ Logo" />
        <h1 className="text-xl font-bold tracking-tighter">SpectraQ</h1>
      </div>

      {/* Form Header */}
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-balance text-muted-foreground">
          Enter your information to create a new account
        </p>
      </div>

      {/* Signup Form */}
      <form className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="first-name">First name</Label>
            <Input id="first-name" placeholder="Max" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input id="last-name" placeholder="Robinson" required />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="text" placeholder="maxrobinson" required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="mobile-number">Mobile number</Label>
          <Input id="mobile-number" type="tel" required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>

        <Button type="submit" className="w-full">
          Create account
        </Button>
      </form>

      {/* Redirect Link */}
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline font-semibold">
          Sign in
        </Link>
      </div>
    </div>
  </div>
);

const Signup = () => {
  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2 bg-background text-foreground relative">
      <BrandingPanel />
      <Signupform />
    </div>
  );
};

export default Signup;
