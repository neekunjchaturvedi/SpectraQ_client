import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Github } from "lucide-react";
import { Button } from "@/components/ui/button"; // Example import path
import { Input } from "@/components/ui/input"; // Example import path
import { Label } from "@/components/ui/label"; // Example import path
import logo from "@/assets/logo.jpg";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const LoginForm = () => (
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
      <form className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            required
            className="bg-black border border-gray-800 outline-none rounded p-2 w-full"
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
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground p-2 rounded border"
        >
          Sign In
        </Button>
        {/* <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border p-2 rounded"
        >
          <FontAwesomeIcon icon={faGoogle} />
          Login with Google
        </Button> */}
      </form>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="underline font-semibold">
          Sign up
        </Link>
      </div>
    </div>
  </div>
);

const Login = () => {
  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2 bg-background text-foreground">
      <BrandingPanel />
      <LoginForm />
    </div>
  );
};

export default Login;
