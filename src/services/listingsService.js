import axios from "axios";

async function getListings() {
  const { data } = await axios.get("/api/Listing/list");
  // convert the date strings to Date objects in each listing
  data.forEach((listing) => {
    listing.startDate = new Date(listing.startDate).toLocaleDateString("en-GB");
    listing.endDate = new Date(listing.endDate).toLocaleDateString("en-GB");
  });
  return data;
}

async function getListing(id) {
  const { data } = await axios.get(`/api/Listing?id=${id}`);
  return data;
}

async function getListingView(id) {
  const { data } = await axios.get(`/api/Listing/view?id=${id}`);
  return data;
}

async function createListing(newListing) {
  const { data } = await axios.post("/api/Listing", newListing);
  return data;
}

async function updateListing(id, listing) {
  console.log("update", id, JSON.stringify(listing));
  listing.Id = id;
  const { data } = await axios.put(`/api/Listing?id=${id}`, listing);
  return data;
}

async function deleteListing(id) {
  const { data } = await axios.delete(`/api/Listing?id=${id}`);
  return data;
}

export {
  getListings,
  getListing,
  getListingView,
  createListing,
  updateListing,
  deleteListing,
};
