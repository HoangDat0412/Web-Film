const DOMAIN = "http://localhost:4000/api/v1/films";
export const TOKEN = "accessToken";
export const USER_LOGIN = "USER_LOGIN";
const currentUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;