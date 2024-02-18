import { Navigate, Outlet } from "react-router-dom";
import Topbar from "../components/shared/Topbar";
import LeftSidebar from "../components/shared/LeftSidebar";
import Bottombar from "../components/shared/Bottombar";
import { useSelector } from "react-redux";

const RootLayout = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return (
    <>
      <div className="w-full md:flex">
        <Topbar />
        <LeftSidebar />
        <section className="flex flex-1 h-full">
          <Outlet />
        </section>
        <Bottombar />
      </div>
    </>
  );
};

export default RootLayout;
