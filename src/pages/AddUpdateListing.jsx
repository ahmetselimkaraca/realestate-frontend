import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../AppContext";
import Datepicker from "react-tailwindcss-datepicker";
import Resizer from "react-image-file-resizer";
import {
  getCurrencies,
  getPropertyTypes,
  getStatuses,
} from "../services/parametersService";
import {
  createListing,
  getListing,
  updateListing,
} from "../services/listingsService";

export default function AddUpdateListing() {
  const navigate = useNavigate();
  const { userId, isAdmin } = useContext(AppContext);

  const { listingId } = useParams();

  const [currencies, setCurrencies] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const [loading, setLoading] = useState(false);
  let isOwner = false;

  const [initialListing, setInitialListing] = useState({
    startDate: "2029-08-10T19:21:27.035",
    endDate: "2029-08-10T19:21:27.035",
    propertyTypeId: 1,
    statusId: 1,
    currencyId: 1,
    price: 0,
    image: "",
    latitude: 0,
    longitude: 0,
  });

  const [dateValue, setDateValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleDateChange = (newValue) => {
    console.log("newValue:", newValue);
    setInitialListing({
      ...initialListing,
      startDate: new Date(newValue.startDate).toISOString(),
      endDate: new Date(newValue.endDate).toISOString(),
    });
    setDateValue(newValue);
  };

  async function changeHandler(e) {
    setInitialListing({
      ...initialListing,
      [e.target.name]:
        // if the target name is not startDate or endDate, then convert the value to a number
        e.target.name !== "startDate" && e.target.name !== "endDate"
          ? +e.target.value
          : e.target.value,
    });
  }

  const resizeFile = (file, { width, height, quality }) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        width,
        height,
        "JPG",
        quality,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  async function fileHandler(e) {
    const file = e.target.files[0];
    let base64 = await resizeFile(file, {
      width: 600,
      height: 600,
      quality: 100,
    });
    let thumbnail = await resizeFile(file, {
      width: 100,
      height: 100,
      quality: 90,
    });
    setInitialListing({
      ...initialListing,
      image: base64,
      thumbnail: thumbnail,
    });
    console.log(base64);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (listingId) {
      updateListing(listingId, initialListing);
    } else {
      createListing(initialListing);
    }
    navigate("/listings");
  }

  async function fetchCurrencies() {
    const currencies = await getCurrencies();
    setCurrencies(currencies);
  }

  async function fetchPropertyTypes() {
    const propertyTypes = await getPropertyTypes();
    setPropertyTypes(propertyTypes);
  }

  async function fetchStatuses() {
    const statuses = await getStatuses();
    setStatuses(statuses);
  }

  async function fetchListing() {
    const listing = await getListing(listingId);
    setInitialListing({ ...initialListing, ...listing });
    setDateValue({
      startDate: new Date(listing.startDate),
      endDate: new Date(listing.endDate),
    });
    isOwner = listing.realEstateUserId === userId || isAdmin;
  }

  useEffect(() => {
    Promise.all([
      fetchCurrencies(),
      fetchPropertyTypes(),
      fetchStatuses(),
    ]).then(() => {
      setLoading(false);
      if (listingId) {
        setLoading(true);
        fetchListing().then(() => {
          setLoading(false);
          if (!isOwner) {
            console.log("NOT OWNER", isOwner, listingId);
            navigate("/listings");
          }
        });
      }
    });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="border-b mx-auto pt-8 border-gray-900/10 pb-12 w-1/2">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          {listingId ? "Update listing" : "Create listing"}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label
              htmlFor="file"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Image
            </label>
            <div className="mt-2">
              {initialListing.image ? (
                <img
                  src={initialListing.image}
                  alt="listing"
                  className="mx-auto mb-2"
                />
              ) : null}

              <input
                accept="image/*"
                type="file"
                name="file"
                id="file"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={fileHandler}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="propertyTypeId"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Property type
            </label>
            <div className="mt-2">
              <select
                id="propertyTypeId"
                name="propertyTypeId"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={initialListing.propertyTypeId}
                onChange={changeHandler}
              >
                {propertyTypes.map((propertyType) => (
                  <option key={propertyType.id} value={propertyType.id}>
                    {propertyType.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="statusId"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Status
            </label>
            <div className="mt-2">
              <select
                id="statusId"
                name="statusId"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={initialListing.statusId}
                onChange={changeHandler}
              >
                {statuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Price
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="price"
                id="price"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={initialListing.price}
                onChange={changeHandler}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="currencyId"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Currency
            </label>
            <div className="mt-2">
              <select
                id="currencyId"
                name="currencyId"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={initialListing.currencyId}
                onChange={changeHandler}
              >
                {currencies.map((currency) => (
                  <option key={currency.id} value={currency.id}>
                    {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="latitude"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Latitude
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="latitude"
                id="latitude"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={initialListing.latitude}
                onChange={changeHandler}
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="longitude"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Longitude
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="longitude"
                id="longitude"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={initialListing.longitude}
                onChange={changeHandler}
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Start Date - End Date
            </label>
            <div className="mt-2">
              <Datepicker
                primaryColor={"indigo"}
                value={dateValue}
                onChange={handleDateChange}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link to="/listings">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
