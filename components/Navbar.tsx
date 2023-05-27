import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="absolute xl:fixed  top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4">
          <div className="text-white text-4xl">Dogesigner.</div>
          <div className="space-x-4">
            <a href="#" className="text-white text-xl">Twitter</a>
            <a href="#" className="text-white text-xl">Discord</a>
            <a href="#" className="text-white text-xl">Website</a>
          </div>
        </nav>
      );
};

export default Navbar;
