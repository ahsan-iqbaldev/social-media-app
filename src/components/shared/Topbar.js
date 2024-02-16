import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { useSelector } from "react-redux";

const Topbar = () => {
  const { user } = useSelector((state) => state.auth);

  const ahsan = {
    imageUrl: null,
    userId: 8787876766, 
  }

  const signOut = () =>{
  localStorage.clear()
  window.location.reload()
  }

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 item-center">
          <img
            src="/assets/images/logo.svg"
            alt="Logo"
            height={325}
            width={130}
          />
        </Link>

        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}
          >
            <img src="/assets/icons/logout.svg" alt="" />
          </Button>
          <Link to={`/profile/${ahsan.userId}`} className="flex-center gap-3">
            <img
              src={ahsan.imageUrl || "./assets/icons/profile-placeholder.svg"}
              alt="Profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
