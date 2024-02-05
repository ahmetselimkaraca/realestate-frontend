import axios from "axios";

async function login(credentials) {
  const { data } = await axios.post("/api/Authentication/login", credentials);
  return data;
}
export { login };
