import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AppContext";
import Login from "./pages/Login";
import Header from "./components/Header";
import Listings from "./pages/Listings";
import AddUpdateListing from "./pages/AddUpdateListing";
import ListingDetail from "./pages/ListingDetail";
import MapPage from "./pages/MapPage";
import Admin from "./pages/Admin";
import axios from "axios";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 && window.location.pathname !== "/") {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/listings" element={<Listings />} />
            <Route
              exact
              path="/listings/:listingId"
              element={<ListingDetail />}
            />
            <Route exact path="/new-listing" element={<AddUpdateListing />} />
            <Route
              exact
              path="/edit-listing/:listingId"
              element={<AddUpdateListing />}
            />
            <Route exact path="/admin" element={<Admin />} />
            <Route exact path="/map" element={<MapPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
