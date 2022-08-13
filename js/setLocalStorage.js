const setLocalStorage = () => {
  localStorage.setItem("name", greetingName.value);
  localStorage.setItem("city", city.value);
  localStorage.setItem("temperature", '0');
};
window.addEventListener("beforeunload", setLocalStorage);
const getLocalStorage = () => {
  if (localStorage.getItem("name")) {
    greetingName.value = localStorage.getItem("name");
  }
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }
};
window.addEventListener("load", getLocalStorage);
