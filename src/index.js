import { format } from "date-fns";
import { getSelectedList, renderLists, setOnSelectedListChange } from "./controllers/listController";
import { renderTasks } from "./controllers/taskController";
import { addList, deleteList, getLists, renameList } from "./models/lists";
import { addTaskToList, removeTaskFromList } from "./models/tasks";
import "./styles.css";

const app = (() => {
  const lists = getLists();

  const init = () => {
    // sample data
    addTaskToList(lists[0], "Work on website", "Implement the backend", format(Date.now(), "yyyy-MM-dd"), 0);

    setOnSelectedListChange((selectedList) => {
      renderTasks(selectedList);
    });

    renderLists(lists, addList, renameList, deleteList);
  };

  return {
    init,
  };
})();

app.init();
