const setToLocalStorage = ({ authToken }) => {
  localStorage.setItem("authToken", JSON.stringify(authToken));
};

const getFromLocalStorage = key => JSON.parse(localStorage.getItem(key));

const deleteFromLocalStorage = () => localStorage.removeItem("authToken");

export { setToLocalStorage, getFromLocalStorage, deleteFromLocalStorage };
