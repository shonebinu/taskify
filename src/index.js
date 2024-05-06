import { renderLists } from "./controllers/listController";
import { addList, deleteList, getLists, renameList } from "./models/lists";
import "./styles.css";

const app = (() => {
  const lists = getLists();

  const init = () => {
    renderLists(lists, addList, renameList, deleteList);
  };

  return {
    init,
  };
})();

app.init();
