import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";

export default function ListingItem({ listing, onDelete }) {
  const navigate = useNavigate();

  const { isAdmin, userId } = useContext(AppContext);
  const isOwner = listing.realEstateUser === userId || isAdmin;
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4">
        <img src={listing.thumbnail} alt="" />
      </td>
      <td className="px-6 py-4">{listing.startDate}</td>
      <td className="px-6 py-4">{listing.endDate}</td>
      <td className="px-6 py-4">{listing.propertyType}</td>
      <td className="px-6 py-4">{listing.status}</td>
      <td className="px-6 py-4">{listing.currency}</td>
      <td className="px-6 py-4">{listing.price}</td>
      <td className="px-6 py-4">{listing.realEstateUser}</td>
      <td>
        <button
          className="mx-1"
          onClick={() => navigate(`/listings/${listing.id}`)}
        >
          View
        </button>
        {isOwner && (
          <>
            <button className="mx-1" onClick={() => onDelete(listing.id)}>
              Delete
            </button>
            <button
              className="mx-1"
              onClick={() => navigate(`/edit-listing/${listing.id}`)}
            >
              Edit
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
