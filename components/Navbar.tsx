import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="absolute xl:fixed  top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4">
          <div className="text-white text-3xl">Dogesigner.</div>
          <div className="space-x-4">
            <a href="#" className="text-white text-sm">Twitter</a>
            <a href="#" className="text-white text-sm">Discord</a>
            <a href="#" className="text-white text-sm">Website</a>
          </div>
        </nav>
      );
};

export default Navbar;
