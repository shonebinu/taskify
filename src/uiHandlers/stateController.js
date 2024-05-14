import localStorageAPI from "../dataHandlers/localStorage";
import listController from "./listController";
import { taskController, taskSideBarController } from "./taskController";

localStorageAPI.setListState({ list: false, name: "Today", id: "today" });

const stateController = function() {
  const init = () => {
    render();
    document.querySelector("#today").classList.add("selected");
  };

  const getState = () => {
    return localStorageAPI.getListState();
  };

  const setState = (state) => {
    localStorageAPI.setListState(state);
  };

  const render = () => {
    listController.render();
    taskSideBarController.render();
    taskController.render();

    const state = getState();
    if (state.list) {
      const element = document.querySelector(`[data-list-id='${state.id}']`);
      element.classList.add("selected");
    } else {
      const element = document.querySelector(`#${state.id}`);
      element.classList.add("selected");
    }
  };

  return {
    init,
    getState,
    setState,
    render,
  };
}();

export default stateController;
