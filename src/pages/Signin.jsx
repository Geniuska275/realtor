import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
export default function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showpassword, setShowPassword] = useState(false);
  const { email, password } = formData;
  function onChange(e) {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign In</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://media.istockphoto.com/id/1351204753/photo/open-the-door-and-door-handle-with-a-key-and-a-keychain-shaped-house-property-investment-and.jpg?s=612x612&w=0&k=20&c=AgaxbkpQ2ScjbMRvYjgPYP2nL1EE3Kiy5EVcLUEvsbQ="
            alt="key"
            className="w-full rounded-sm shadow-lg"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-4">
          <form>
            <input
              type="text"
              className="w-full px-4 py-2 mb-6 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email Address"
            />
            <div className="relative mb-6">
              <input
                type={showpassword ? "text" : "password"}
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                id="password"
                value={password}
                placeholder="Password"
                onChange={onChange}
              />
              {showpassword ? (
                <AiFillEye
                  className="absolute top-3 right-3 text-xl"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <AiFillEyeInvisible
                  className="absolute top-3 right-3 text-xl"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg ">
              <p>
                Don't have an account ?{" "}
                <Link to="/Sign-up" className="font-semibold text-blue-700">
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/Forgot-Password"
                  className="font-semibold text-red-600"
                >
                  Forgot Password?
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md mt-2 hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
            >
              sign in
            </button>
            <div
              className="my-4 items-center flex before:border-t before:flex-1  before:border-gray-300
        after:border-t after:flex-1  after:border-gray-300
          "
            >
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}
