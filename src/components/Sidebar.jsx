import React from "react";

const Sidebar = ({ isSidebarVisible, setIsSidebarVisible }) => {
  return (
    <>
      <section
        className={`bg-[#0E0E0E] py-6 flex flex-col justify-between lg:w-[20%] md:w-[25%] md:static absolute z-10 w-[80%] h-[100dvh] md:translate-x-0 duration-300 ease-linear ${
          isSidebarVisible ? "translate-x-[0%]" : "translate-x-[-100%]"
        }`}
      >
        <div className="flex flex-col gap-10">
          <div className="flex justify-between gap-6 px-10">
            <img
              src="./assets/svg/Logo.svg"
              alt="logo-icon"
              className="w-[180px] max-w-2xl h-[40px]"
            />
          </div>
          <nav className="flex flex-col gap-1">
            <h6 className=" text-sm px-10">Menu</h6>
            <div className="flex items-center gap-4 hover:bg-zinc-900 px-10 py-2 cursor-pointer duration-300">
              <img
                src="./assets/svg/Home.svg"
                alt="home-icon"
                className="w-[1.4rem] h-[1.4rem]"
              />
              <div>Home</div>
            </div>
            <div className="flex items-center gap-4 hover:bg-zinc-900 px-10 py-2 cursor-pointer duration-300">
              <img
                src="./assets/svg/trend.svg"
                alt="trend-icon"
                className="w-[1.4rem] h-[1.4rem]"
              />
              <div>Trends</div>
            </div>
            <div className="flex items-center gap-4 hover:bg-zinc-900 px-10 py-2 cursor-pointer duration-300">
              <img
                src="./assets/svg/music.svg"
                alt="music-icon"
                className="w-[1.4rem] h-[1.4rem]"
              />
              <div>Library</div>
            </div>
            <div className="flex items-center gap-4 hover:bg-zinc-900 px-10 py-2 cursor-pointer duration-300">
              <img
                src="./assets/svg/navigate.svg"
                alt="navigate-icon"
                className="w-[1.4rem] h-[1.4rem]"
              />
              <div>Discover</div>
            </div>
          </nav>
        </div>
        <nav className="flex flex-col gap-1">
          <h6 className=" text-sm px-10">General</h6>
          <div className="flex items-center gap-4 hover:bg-zinc-900 px-10 py-2 cursor-pointer duration-300">
            <img
              src="./assets/svg/settings.svg"
              alt="settings-icon"
              className="w-[1.4rem] h-[1.4rem]"
            />
            <div>Settings</div>
          </div>
          <div className="flex items-center gap-4 hover:bg-zinc-900 px-10 py-2 cursor-pointer duration-300">
            <img
              src="./assets/svg/Log-Out.svg"
              alt="logout-icon"
              className="w-[1.4rem] h-[1.4rem]"
            />
            <div>Logout</div>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Sidebar;
