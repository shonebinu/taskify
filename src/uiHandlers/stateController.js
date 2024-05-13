import localStorageAPI from "../dataHandlers/localStorage";

const stateController = () => {
  const getState = () => {
    return localStorageAPI.getListState();
  };

  const setState = (state) => {
    localStorageAPI.setListState(state);
  };

  const selectElement = (element) => {
    document.querySelectorAll(".selected").forEach(node => node.classList.remove("selected"));
    element.classList.add("selected");
  };

  return {
    getState,
    setState,
    selectElement,
  };
};

export default stateController;
