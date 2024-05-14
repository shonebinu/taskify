import localStorageAPI from "../dataHandlers/localStorage";
import listController from "./listController";
import { taskController, taskSideBarController } from "./taskController";

const stateController = function() {
  const render = () => {
    listController.render();
    taskController.render();
    taskSideBarController.render();
  };

  return {
    render,
  };
}();

// state module should control render,
// every side bar content should have id.
// state will select them based on id {id:, name:, list: false}

export default stateController;
