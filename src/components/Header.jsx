import React from "react";

const Header = ({ isSidebarVisible, setIsSidebarVisible }) => {
  return (
    <>
      <header className="flex justify-between py-4 md:px-20 px-4 sticky">
        <ul className="md:flex hidden gap-10 items-center ">
          <li className="cursor-pointer">Music</li>
          <li className="cursor-pointer">Podcast</li>
          <li className="cursor-pointer">Live</li>
          <li className="cursor-pointer">Radio</li>
        </ul>
        <div className="md:hidden flex items-center justify-between w-full">
          <div>
            <img
              src="./assets/svg/Logo.svg"
              alt="logo-icon"
              className="w-50 h-10"
            />
          </div>
          <div className="flex items-center gap-4">
            <img src="./assets/svg/search.svg" alt="" className=" h-5 w-5" />
            {!isSidebarVisible ? (
              <button onClick={() => setIsSidebarVisible(true)}>
                <img
                  src="./assets/svg/menu.svg"
                  alt="menu-icon"
                  className="h-8 w-8 object-cover"
                />
              </button>
            ) : (
              <button
                className="md:hidden block w-full h-full p-0"
                onClick={() => setIsSidebarVisible(false)}
              >
                <img
                  src="./assets/svg/cancel.svg"
                  alt="cancel-icon"
                  className="w-7 h-6"
                />
              </button>
            )}
          </div>
        </div>
        <div className="relative bg-[#2C0000] rounded-full max-w-sm w-full px-2 md:block hidden">
          <input
            type="search"
            name="search"
            id="search"
            className="rounded-full py-2 px-2 bg-transparent w-full outline-none pr-10"
            placeholder="search music"
          />
          <img
            src="./assets/svg/search.svg"
            alt=""
            className="absolute top-2 right-4 h-5 w-5"
          />
        </div>
      </header>
    </>
  );
};

export default Header;
