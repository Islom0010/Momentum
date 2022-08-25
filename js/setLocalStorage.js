const setLocalStorage = () => {
  localStorage.setItem("name", name.value);
  localStorage.setItem("city", city.value);
};
const getLocalStorage = () => {
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }

  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  } else {
    city.value = "Samarkand";
  }
  setCity();
};
window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);
city.addEventListener("change", setCity);
