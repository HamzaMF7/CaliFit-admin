const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const config = {
  headers: {
    // Accept: "application/json",
    "Content-Type": "multipart/form-data"
  },
};
