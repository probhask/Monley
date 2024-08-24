import { Outlet } from "react-router-dom";
import { MonleyContextProvider } from "../context/context";
import { Suspense, useState } from "react";
import { Footer, Header, SideBar } from "../features";

const HomeLayout = () => {
  const [toggleSideBar, setToggleSideBar] = useState<boolean>(false);
  return (
    <div className="dark:bg-black dark:text-white w-full min-h-screen">
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
      <div className=" w-full min-h-[calc(100vh-64px-92px)] ">
        <MonleyContextProvider>
          <Suspense fallback={<p>loading</p>}>
            <Outlet />
          </Suspense>
        </MonleyContextProvider>
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
