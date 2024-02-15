import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { signInUser } from "../../store/actions/authAction";

const SigninForm = () => {
  const { isLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(signInUser(formData.email, formData.password));
    navigate("/");
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="sm:w-420 flex-center flex-col">
      <img src="/assets/images/logo.svg" alt="logo" />
      <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Login to you Account</h2>
      <p className="text-light-3 small-medium md:base-regular">
        Welcome back, Please enter your details
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full mt-4">
        <div>
          <label
            htmlFor="email"
            className="mb-3 block text-base small-medium text-white"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            className="shad-input"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-3 block text-base small-medium text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            className="shad-input"
          />
        </div>
        <Button type="submit" className="shad-button_primary">
          <Button type="submit" className="shad-button_primary">
            {isLoading ? (
              <div className="flex-center gap-2">Loading...</div>
            ) : (
              "Sign In"
            )}
          </Button>
        </Button>

        <p className="text-small-regular text-light-2 text-center mt-2">
          Don't have an account?
          <Link
            to="/signup"
            className="text-primary-500 text-small-semibold ml-1"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SigninForm;
