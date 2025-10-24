import logo from "@/assets/logo.jpg";
function Logo() {
  return (
    <div
      className="hidden bg-muted lg:flex flex-col items-center justify-center text-center cursor-pointer mb-8"
      // onClick={() => nav("/")}
    >
      <img
        src={logo}
        alt="SpectraQ Logo"
        className="w-20 h-20 object-contain logo-image"
        onError={(e) => {
          e.currentTarget.onerror = null;
        }}
      />
      <h1 className="text-4xl font-bold text-quantum-red">SpectraQ</h1>
      <h2 className="lg:text-xl font-bold text-foreground mb-6 leading-tight">
        The Future of <span className="text-primary">Prediction Markets</span>{" "}
        is Here
      </h2>
    </div>
  );
}

export default Logo;
