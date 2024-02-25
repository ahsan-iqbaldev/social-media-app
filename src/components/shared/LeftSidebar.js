import { Link, NavLink, useLocation } from "react-router-dom";
import { sidebarLinks } from "../../routes";
import { Button } from "reactstrap";
import { useSelector } from "react-redux";

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);

  const signOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav className="leftsidebar custom-scrollbar">
      <div className="flex flex-col gap-8">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="Logo"
            width={170}
            height={36}
          />
        </Link>
        <Link
          to={`/profile/${user.userId}`}
          className="flex gap-3 items-center"
        >
          <img
            src={user?.profileImage || "/assets/icons/profile-placeholder.svg"}
            alt="Profile Image"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-4">
          {sidebarLinks.map((link, index) => {
            const isActive = pathname === link.route;
            return (
              <li
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
                key={index + 100}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={() => signOut()}
      >
        <img src="/assets/icons/logout.svg" alt="" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
