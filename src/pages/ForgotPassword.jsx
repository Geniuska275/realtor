import React, { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>
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
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg ">
              <p>
                Have an account ?{" "}
                <Link to="/Sign-in" className="font-semibold text-blue-700">
                  Sign in
                </Link>
              </p>
              <p>
                <Link to="/Sign-in" className="font-semibold text-red-600">
                  Sign in
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md mt-2 hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
            >
              send reset password
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
