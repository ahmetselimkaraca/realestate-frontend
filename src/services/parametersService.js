import axios from "axios";

async function getCurrencies() {
  const { data } = await axios.get("/api/Currency/list");
  return data;
}

async function getPropertyTypes() {
  const { data } = await axios.get("/api/PropertyType/list");
  return data;
}

async function getStatuses() {
  const { data } = await axios.get("/api/Status/list");
  return data;
}

async function createCurrency(currency) {
  const { data } = await axios.post("/api/Currency", currency);
  return data;
}

async function createPropertyType(propertyType) {
  const { data } = await axios.post("/api/PropertyType", propertyType);
  return data;
}

async function createStatus(status) {
  const { data } = await axios.post("/api/Status", status);
  return data;
}

export {
  getCurrencies,
  getPropertyTypes,
  getStatuses,
  createCurrency,
  createPropertyType,
  createStatus,
};
