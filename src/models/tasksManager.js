import localStorageAPI from "./localStorage";

function generateUniqueId() {
  return Date.now().toString();
}

const tasksManager = function() {
  const getAllTask = (listId) => {
    const lists = localStorageAPI.getData();
    const currentList = lists.find(list => list.id === listId);
    return currentList.tasks || [];
  };

  const findList = (lists, listId) => {
    const list = lists.find(list => list.id === listId);
    if (list) {
      return list;
    }
  };

  const findTaskIndex = (list, taskId) => {
    const taskIndex = list.tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      return taskIndex;
    }
  };

  const addTaskToList = (listId, title, details, dueDate, priority) => {
    const lists = localStorageAPI.getData();
    const currentList = findList(lists, listId);
    currentList.tasks.push({
      id: generateUniqueId(),
      title,
      details,
      dueDate,
      priority,
    });
    localStorageAPI.setData(lists);
  };

  const editTaskOfList = (listId, taskId, task) => {
    const lists = localStorageAPI.getData();
    const currentList = findList(lists, listId);
    const taskIndex = findTaskIndex(currentList, taskId);
    currentList.tasks.splice(taskIndex, 1, task);
  };

  const removeTaskFromList = (listId, taskId) => {
    const lists = localStorageAPI.getData();
    const currentList = findList(lists, listId);
    const taskIndex = findTaskIndex(currentList, taskId);
    currentList.tasks.splice(taskIndex, 1);
    localStorageAPI.setData(lists);
  };

  return {
    getAllTask,
    addTaskToList,
    editTaskOfList,
    removeTaskFromList,
  };
}();

export default tasksManager;
