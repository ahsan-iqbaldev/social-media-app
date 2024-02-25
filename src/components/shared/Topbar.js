import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { useSelector } from "react-redux";

const Topbar = () => {
  const { user } = useSelector((state) => state.auth);

  const signOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <div className="flex">
        <Link to="/" className="flex gap-3 item-center">
          <img
            src="/assets/images/logo.svg"
            alt="Logo"
            height={325}
            width={130}
          />
        </Link>
        </div>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}
          >
            <img src="/assets/icons/act.svg" alt="" />
          </Button>

          <Link
            to="/chats"
            className={`bottombar-link group
         
             flex-center flex-col gap-1 p-2 transition`}
          >
            <img
              src="/assets/icons/chat.svg"
              alt="chat"
              height={24}
              width={24}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
