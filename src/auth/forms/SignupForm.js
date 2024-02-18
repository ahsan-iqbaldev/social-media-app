import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { signUpUser } from "../../store/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const SignupForm = () => {
  const { isLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
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
    await dispatch(
      signUpUser(
        formData.name,
        formData.username,
        formData.email,
        formData.password
      )
    );

    navigate("/signin");

    console.log("Form data submitted:", formData);
  };

  return (
    <div className="sm:w-420 flex-center flex-col">
      <img src="/assets/images/logo.svg" alt="logo" />
      <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
      <p className="text-light-3 small-medium md:base-regular">
        To use snapgram, Please enter your details
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full mt-4">
        <div>
          <label
            htmlFor="name"
            className="mb-3 block text-base small-medium text-white"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            className="shad-input"
            required
          />
        </div>

        <div>
          <label
            htmlFor="username"
            className="mb-3 block text-base small-medium text-white"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
            className="shad-input"
            required
          />
        </div>

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
          {isLoading ? (
            <div className="flex-center gap-2">Loading...</div>
          ) : (
            "Sign Up"
          )}
        </Button>

        <p className="text-small-regular text-light-2 text-center mt-2">
          Already have an account?
          <Link
            to="/signin"
            className="text-primary-500 text-small-semibold ml-1"
          >
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
