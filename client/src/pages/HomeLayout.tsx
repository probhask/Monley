import { Outlet } from "react-router-dom";
import { MonleyContextProvider } from "../context/context";
import { useState } from "react";
import { Footer, Header, SideBar } from "../features";

const HomeLayout = () => {
  const [toggleSideBar, setToggleSideBar] = useState<boolean>(false);
  return (
    <div className="dark:bg-black dark:text-white">
      {toggleSideBar && (
        <SideBar
          toggleSideBar={toggleSideBar}
          setToggleSideBar={setToggleSideBar}
        />
      )}
      <Header
        toggleSideBar={toggleSideBar}
        setToggleSideBar={setToggleSideBar}
      />
      <div className="w-full mx-auto">
        <MonleyContextProvider>
          <Outlet />
        </MonleyContextProvider>
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
