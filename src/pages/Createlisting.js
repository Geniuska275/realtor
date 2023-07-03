import React, { useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Createlisting() {
  const auth = getAuth();
  const [geolocationenabled, setGeolocation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "kingsley Aigbojie",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: " hhhdhdhhdhdhdhdhdhdhdhdhdhd",
    description: "gdgdgdgdgdgdgdgdgdgdggdgd",
    offer: true,
    regularprice: 1,
    discountedPrice: 1,
    percentageDiscount: 1,
    latitude: 0,
    longitude: 0,
    images: {},
  });
  const {
    latitude,
    longitude,
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularprice,
    discountedPrice,
    percentageDiscount,
    images,
  } = formData;
  function onchange(e) {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    //files
    if (e.target.files) {
      setFormData((prevstate) => ({
        ...prevstate,
        images: e.target.files,
      }));
    }
    // text ,boolean or number
    if (!e.target.files) {
      setFormData((prevstate) => ({
        ...prevstate,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }

  async function storeImage(image) {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress + "%done");
          switch (snapshot.state) {
            case "paused":
              console.log("upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  }
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (discountedPrice >= regularprice) {
      setLoading(false);
      toast.error("discounted price should not more than regular price");
      return;
    }
    if (images.length > 6) {
      setLoading(false);
      toast.error("maximum 6 images are allowed");
      return;
    }
    console.log(images);
    const imgUrls = await Promise.all(
      [...images]
        .map((image) => storeImage(image))
        .catch((error) => {
          setLoading(false);
          toast.error("Images not uploaded");
          return;
        })
    );
    console.log(imgUrls);
  }

  if (loading) {
    return <Spinner />;
  }
  console.log(formData);
  return (
    <main className="max-w-md px-2 mx-auto">
      <h1 className="font-bold text-3xl text-center mt-6 mb-6 ">
        Create a listing
      </h1>
      <form
        className="border border-slate-600 bg-white p-8 shadow-lg rounded"
        onSubmit={onSubmit}
      >
        <p className="text-lg mt-6 font-semibold capitalize">sell / rent</p>
        <div className="flex">
          <button
            className={`px-7 py-3 mr-3 font-medium text-sm uppercase shadow-md rounded focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "rent"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
            type="button"
            id="type"
            value="sale"
            onClick={onchange}
          >
            SELL
          </button>
          <button
            className={`px-7 py-3 ml-3 font-medium text-sm uppercase shadow-md rounded focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "sale"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
            type="button"
            id="type"
            value="rent"
            onClick={onchange}
          >
            rent
          </button>
        </div>
        <p className="text-lg font-semibold mt-6 ">Name</p>
        <input
          type="text"
          id="name"
          value={name}
          onChange={onchange}
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 bg-white focus:border-slate-600 mb-6"
          placeholder="Name"
          maxLength="32"
          minLength="10"
          required
        />
        <div className="flex space-x-6 mb-6">
          <div className="">
            <p className="text-lg font-semibold">Beds</p>
            <input
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={onchange}
              min="1"
              className="text-xl w-full px-4 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600 text-center "
              max="50"
              required
            />
          </div>
          <div className="">
            <p className="text-lg font-semibold">Bathrooms</p>
            <input
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={onchange}
              min="1"
              className="text-xl w-full px-4 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600 text-center "
              max="50"
              required
            />
          </div>
        </div>
        <p className="text-lg mt-6 font-semibold capitalize">Parking Spot</p>
        <div className="flex">
          <button
            className={`px-7 py-3 mr-3 font-medium text-sm uppercase shadow-md rounded focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !parking ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
            type="button"
            id="parking"
            value="true"
            onClick={onchange}
          >
            Yes
          </button>
          <button
            className={`px-7 py-3 ml-3 font-medium text-sm uppercase shadow-md rounded focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              parking ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
            type="button"
            id="parking"
            value="false"
            onClick={onchange}
          >
            No
          </button>
        </div>

        <p className="text-lg mt-6 font-semibold capitalize">furnished</p>
        <div className="flex">
          <button
            className={`px-7 py-3 mr-3 font-medium text-sm uppercase shadow-md rounded focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !furnished ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
            type="button"
            id="furnished"
            value="true"
            onClick={onchange}
          >
            Yes
          </button>
          <button
            className={`px-7 py-3 ml-3 font-medium text-sm uppercase shadow-md rounded focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              furnished ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
            type="button"
            id="furnished"
            value="false"
            onClick={onchange}
          >
            No
          </button>
        </div>
        <p className="text-lg font-semibold  mt-2">Address</p>
        <textarea
          type="text"
          id="address"
          value={address}
          onChange={onchange}
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 bg-white focus:border-slate-600 mb-6"
          placeholder="Address"
          required
        />
        {!geolocationenabled && (
          <div className="flex space-x-6">
            <div className="">
              <p className="text-lg font-semibold">Latitude</p>
              <input
                id="latitude"
                min="-90"
                max="90"
                type="number"
                value={latitude}
                onChange={onchange}
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 bg-white focus:border-slate-600 mb-6"
                required
              />
            </div>
            <div className="">
              <p className="text-lg font-semibold">Longitude</p>
              <input
                id="longitude"
                min="-180"
                max="180"
                type="number"
                value={longitude}
                onChange={onchange}
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 bg-white focus:border-slate-600 mb-6"
                required
              />
            </div>
          </div>
        )}
        <p className="text-lg font-semibold  ">Description</p>
        <textarea
          type="text"
          id="description"
          value={description}
          onChange={onchange}
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 bg-white focus:border-slate-600 mb-6"
          placeholder="description"
          required
        />

        <p className="text-lg  font-semibold capitalize">Offer</p>
        <div className="flex">
          <button
            className={`px-7 py-3 mr-3 font-medium text-sm uppercase shadow-md rounded focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !offer ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
            type="button"
            id="offer"
            value="true"
            onClick={onchange}
          >
            Yes
          </button>
          <button
            className={`px-7 py-3 ml-3 font-medium text-sm uppercase shadow-md rounded focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              offer ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
            type="button"
            id="offer"
            value="false"
            onClick={onchange}
          >
            No
          </button>
        </div>

        <div className="">
          <div className="mt-3">
            <p className="text-lg font-semibold"> Regular Price</p>
            <div className="flex w-full space-x-6">
              <input
                type="number"
                id="regularprice"
                value={regularprice}
                max="5000000"
                min="50"
                onChange={onchange}
                className="w-[100px] px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition durattion-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                required
              />
              {type === "rent" ? (
                <div>
                  <p className="text-xl  w-full whitespace-nowrap font-semibold">
                    $/month
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {offer && (
          <div className="">
            <div className="mt-3">
              <p className="text-lg font-semibold"> Percentage Discount</p>
              <div className="flex w-full space-x-6 items-center">
                <input
                  type="number"
                  id="percentageDiscount"
                  value={percentageDiscount}
                  max="5000000"
                  min="50"
                  className="w-[100px] px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition durattion-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                  required
                  onChange={onchange}
                />
                {type === "rent" ? (
                  <div>
                    <p className="text-xl  w-full whitespace-nowrap font-semibold">
                      %
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
        {offer && (
          <div className="">
            <div className="mt-3">
              <p className="text-lg font-semibold"> Discounted Price</p>
              <div className="flex w-full space-x-6 items-center">
                <input
                  onChange={onchange}
                  type="number"
                  id="discountedPrice"
                  value={discountedPrice}
                  max="5000000"
                  min="50"
                  className="w-[100px] px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition durattion-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                  required
                />
                {type === "rent" ? (
                  <div>
                    <p className="text-xl  w-full whitespace-nowrap font-semibold">
                      $/month
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
        <div className="mb-6">
          <p className="text-lg font-semibold">Images</p>
          <p className="text-gray-600">
            The first Image will be the cover (max 6)
          </p>
          <input
            type="file"
            id="images"
            onChange={onchange}
            accept=".jpg,.png,.jpeg"
            multiple
            required
            className="w-full px-3 py-1 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 focus:bg-white border-slate-600"
          />
        </div>
        <button
          type="submit"
          className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Create Listing
        </button>
      </form>
    </main>
  );
}
