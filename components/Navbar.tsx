import React, { useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownItemClick = (url: string | URL | undefined) => {
    window.open(url, "_blank");
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const handleListMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleListMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="absolute xl:fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-none">
      <div className="text-white text-3xl">Dogesigner.</div>
      <div className="flex items-center">
        <div
          className="relative"
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
        >
          <button
            className="flex items-center focus:outline-none"
            onClick={handleDropdownToggle}
          >
            <Image src="/doge-dark.png" width={40} height={35} alt="" />
          </button>
          {isDropdownOpen && (
            <div
              className="absolute top-full w-max right-0 bg-[#222222] text-white py-2 px-4 rounded-md"
              onMouseEnter={handleListMouseEnter}
              onMouseLeave={handleListMouseLeave}
            >
              <ul className="space-y-1">
                <li>
                  <button
                    className="w-full text-left hover:bg-[#333333] py-2 px-3"
                    onClick={() =>
                      handleDropdownItemClick("https://www.dogeswap.live/")
                    }
                  >
                    Dogeswap.
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left hover:bg-[#333333] py-2 px-3"
                    onClick={() =>
                      handleDropdownItemClick("https://www.kenl.live/raffles")
                    }
                  >
                    Kenl.
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left hover:bg-[#333333] py-2 px-3"
                    onClick={() =>
                      handleDropdownItemClick("https://www.xnft.gg/app/3DtDRCUxFThJixdpotU2sq7n3Fbzz2bqtQPHaDqjHQae")
                    }
                  >
                    Fetch.
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left hover:bg-[#333333] py-2 px-3"
                    onClick={() =>
                      handleDropdownItemClick("https://thedogecapital.com/nameyourdoge")
                    }
                  >
                    Name Your Doge.
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        <a
          href="https://twitter.com/thedogecapital"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center ml-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="35"
            zoomAndPan="magnify"
            viewBox="0 0 375 374.999991"
            height="35"
            preserveAspectRatio="xMidYMid meet"
            version="1.0"
          >
            <defs>
              <clipPath id="c20da69934">
                <path
                  d="M 32.574219 61 L 342.324219 61 L 342.324219 312.222656 L 32.574219 312.222656 Z M 32.574219 61 "
                  clip-rule="nonzero"
                />
              </clipPath>
            </defs>
            <g clip-path="url(#c20da69934)">
              <path
                fill="#ffffff"
                d="M 310.488281 123.554688 C 310.675781 126.28125 310.675781 129.007812 310.675781 131.75 C 310.675781 215.554688 246.8125 312.203125 130.039062 312.203125 L 130.039062 312.152344 C 95.542969 312.207031 61.765625 302.339844 32.726562 283.726562 C 37.738281 284.324219 42.78125 284.628906 47.839844 284.640625 C 76.425781 284.664062 104.195312 275.082031 126.683594 257.4375 C 99.515625 256.925781 75.695312 239.230469 67.371094 213.390625 C 76.890625 215.230469 86.691406 214.851562 96.03125 212.296875 C 66.410156 206.320312 45.105469 180.320312 45.105469 150.132812 C 45.105469 149.855469 45.105469 149.59375 45.105469 149.328125 C 53.929688 154.238281 63.8125 156.964844 73.917969 157.265625 C 46.027344 138.652344 37.429688 101.578125 54.277344 72.589844 C 86.507812 112.214844 134.0625 136.300781 185.113281 138.847656 C 179.996094 116.820312 186.988281 93.742188 203.484375 78.253906 C 229.054688 54.238281 269.269531 55.46875 293.308594 81.003906 C 307.523438 78.203125 321.152344 72.992188 333.621094 65.609375 C 328.882812 80.292969 318.96875 92.761719 305.71875 100.683594 C 318.300781 99.199219 330.597656 95.835938 342.175781 90.699219 C 333.648438 103.460938 322.910156 114.574219 310.488281 123.554688 Z M 310.488281 123.554688 "
                fill-opacity="1"
                fill-rule="nonzero"
              />
            </g>
          </svg>
        </a>
        <a
          href="https://discord.gg/XfZaFsbtDr"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center ml-4"
        >
          <Image src="/discord.png" width={35} height={35} alt="" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
