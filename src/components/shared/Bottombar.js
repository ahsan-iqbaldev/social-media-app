import { Link, useLocation } from "react-router-dom";
import { bottombarLinks } from "../../routes";
import { useSelector } from "react-redux";

const Bottombar = () => {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link, index) => {
        const isActive = pathname === link.route;
        return (
          <Link
            to={link.route}
            key={index + 100}
            className={`bottombar-link group ${
              isActive && "bg-primary-500 rounded-[10px]"
            } flex-center flex-col gap-1 p-2 transition`}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              className={`${isActive && "invert-white"}`}
              height={16}
              width={16}
            />
            <p className="tiny-medium text-light-2"> {link.label} </p>
          </Link>
        );
      })}
      <Link to={`/profile/${user?.userId}`} className="flex-center gap-3">
        <img
          src={user?.profileImage || "./assets/icons/profile-placeholder.svg"}
          alt="Profile"
          className="h-8 w-8 rounded-full"
        />
      </Link>
    </section>
  );
};

export default Bottombar;
