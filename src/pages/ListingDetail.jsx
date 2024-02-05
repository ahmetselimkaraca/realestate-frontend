import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../utils";

import { getListingView } from "../services/listingsService";
export default function ListingDetail() {
  const { listingId } = useParams();
  const [listing, setListing] = useState({});

  useEffect(() => {
    async function fetchListingData() {
      const listing = await getListingView(listingId);
      setListing(listing);
    }
    fetchListingData();
  }, []);

  console.log(listing);

  return (
    <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
      <div className="flex flex-col gap-6 lg:w-2/4">
        <img
          src={listing.image}
          alt=""
          className="w-full h-full aspect-square object-cover rounded-xl"
        />
      </div>
      {/* ABOUT */}
      <div className="flex flex-col gap-4 lg:w-2/4">
        <div>
          <span className=" text-5xl text-violet-600 font-semibold">
            {listing.status} {listing.propertyType}
          </span>
          <h1 className="text-5xl font-bold">
            {listing.price} {listing.currency}
          </h1>
          <h1 className="text-3xl ">
            {formatDate(listing.startDate)} - {formatDate(listing.endDate)}
          </h1>
        </div>
      </div>
    </div>
  );
}
