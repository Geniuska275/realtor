import { getAuth, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { FcHome } from "react-icons/fc";

export default function Profile() {
  const [changeDetails, setChangeDetails] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  function signOut() {
    auth.signOut();
    navigate("/");
  }
  function onchange(e) {
    setFormData((prevstate) => ({
      ...prevstate,
      [e.target.id]: e.target.value,
    }));
  }
  async function onsubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        // update displayName in firebase in authentication
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        // update name in firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("profile details updated");
    } catch (error) {
      toast.error("could not update the profile details");
    }
  }
  return (
    <div className=" md:p-40 h-full">
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className=" text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            <input
              type="text"
              id="name"
              value={name}
              disabled={!changeDetails}
              onChange={onchange}
              className={`w-full px-4 py-2 text-xl mb-6 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
                changeDetails && "bg-blue-200 focus:bg-blue-200"
              }`}
            />
            <input
              type="email"
              id="email"
              value={email}
              onChange={onchange}
              disabled={!changeDetails}
              className={`w-full px-4 py-2 text-xl mb-6 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
                changeDetails && "bg-blue-200 focus:bg-blue-200"
              }`}
            />
            <div className="flex justify-between items-center text-sm whitespace-nowrap sm:text-lg">
              <p className="flex items-center">
                Do you want to change your name?
                <span
                  onClick={() => {
                    changeDetails && onsubmit();
                    setChangeDetails((prevstate) => !prevstate);
                  }}
                  className="text-red-600 ml-2 cursor-pointer hover:text-red-700 transition ease-in-out font-semibold"
                >
                  {changeDetails ? "Change" : "Edit"}
                </span>
              </p>
              <p
                onClick={signOut}
                className="text-blue-600 cursor-pointer font-semibold hover:text-blue-800 transition duration-200 "
              >
                Sign Out
              </p>
            </div>
          </form>
          <button
            type="submit"
            className="text-center cursor-pointer font-semibold bg-blue-500 rounded w-full py-2 shadow-lg px-2 mt-4 text-white uppercase hover:bg-blue-600 transition ease-in-out "
          >
            <Link
              to="/create-listings"
              className="flex justify-center items-center "
            >
              <FcHome className="mr-2 text-3xl bg-white rounded-full p-1 border-2" />
              rent or sell your home
            </Link>
          </button>
        </div>
      </section>
    </div>
  );
}
