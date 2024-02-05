import React, { useState, useEffect, useContext } from "react";
import { getListings, deleteListing } from "../services/listingsService";
import { AppContext } from "../AppContext";
import ListingItem from "../components/ListingItem";

export default function Listings() {
  const [listings, setListings] = useState([]);

  async function fetchListings() {
    const listings = await getListings();
    setListings(listings);
  }

  async function removeListing(id) {
    await deleteListing(id);
    fetchListings();
  }

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <table className="mt-20 w-1/2 mx-auto text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Image
          </th>
          <th scope="col" className="px-6 py-3">
            Start date
          </th>
          <th scope="col" className="px-6 py-3">
            End date
          </th>
          <th scope="col" className="px-6 py-3">
            Property Type
          </th>
          <th scope="col" className="px-6 py-3">
            Status
          </th>
          <th scope="col" className="px-6 py-3">
            Currency
          </th>
          <th scope="col" className="px-6 py-3">
            Price
          </th>
          <th scope="col" className="px-6 py-3">
            Creator Id
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {listings.map((listing) => (
          <ListingItem
            key={listing.id}
            listing={listing}
            onDelete={removeListing}
          />
        ))}
      </tbody>
    </table>
  );
}
