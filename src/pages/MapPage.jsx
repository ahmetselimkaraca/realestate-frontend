import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { getListings } from "../services/listingsService";

export default function MapPage() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function fetchListings() {
      const listings = await getListings();
      setListings(listings);
    }
    fetchListings();
  }, []);

  return (
    <MapContainer
      className="h-[calc(100vh-80px)] w-full"
      center={[0, 0]}
      zoom={3}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {listings.map((listing) => (
        <Marker
          key={listing.id}
          position={[listing.latitude, listing.longitude]}
        >
          <Popup>
            <img src={listing.thumbnail} alt="" />
            <div>
              {listing.status} {listing.propertyType} <br /> {listing.price}{" "}
              {listing.currency}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
