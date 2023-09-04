// const getTokenFromLocalStorage = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : null;

export const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data"
  },
};

export const userConfig = {
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` 
  }
}
