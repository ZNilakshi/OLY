const Navbar = () => {
    return (
      <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-5 p-4 flex items-center">
        <div className="flex items-center gap-2 text-white ml-6">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <h1 className="text-xl font-semibold">Vinted</h1>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  