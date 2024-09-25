import React, { useState, useContext } from "react";
import { AppContext } from "../AppContext";
import { Popover } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const { isAdmin, logout } = useContext(AppContext);

  function handleLogout() {
    logout();
    navigate("/");
  }
  if (window.location.pathname === "/") {
    return null;
  }
  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>

        <Popover.Group className=" flex lg:gap-x-12 md:gap-x-4 gap-x-2">
          <a
            href="/listings"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Listings
          </a>
          <a
            href="/map"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Harita
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            My Listings
          </a>
          <a
            href="/new-listing"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Create a Listing
          </a>
          {isAdmin && (
            <a
              href="/admin"
              className="text-sm font-semibold leading-6 text-red-600"
            >
              Admin
            </a>
          )}
        </Popover.Group>
        {window.location.pathname !== "/" && (
          <div className="flex flex-1 justify-end">
            <button
              onClick={handleLogout}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log out <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
