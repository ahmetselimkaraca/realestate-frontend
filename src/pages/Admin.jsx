import React from "react";
import {
  getCurrencies,
  getPropertyTypes,
  getStatuses,
  createCurrency,
  createPropertyType,
  createStatus,
} from "../services/parametersService";
import ParamEditor from "../components/ParamEditor";

export default function Admin() {
  return (
    <div className="border-b mx-auto pt-8 border-gray-900/10 pb-12 w-1/2">
      <h1>Yonetici</h1>
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-96">
        <ParamEditor param={{ description: "" }} onEdit={createCurrency} />
      </div>
    </div>
  );
}
