import localStorageAPI from "./localStorage";

function generateUniqueId() {
  return Date.now().toString();
}

const tasksManager = function() {
  const sortByDueDateAscending = (tasks) => {
    return tasks.sort((a, b) => {
      const dueDateA = new Date(a.dueDate);
      const dueDateB = new Date(b.dueDate);
      return dueDateA - dueDateB;
    });
  };

  const getAllTasks = () => {
    const lists = localStorageAPI.getListData();
    return sortByDueDateAscending(lists.map(list => list.tasks).flat());
  };

  const getAllTodaysTasks = () => {
    const lists = localStorageAPI.getListData();
    const today = new Date();
    const todayTasks = [];

    lists.forEach(list => {
      list.tasks.forEach(task => {
        const dueDate = new Date(task.dueDate);
        if (dueDate.toDateString() === today.toDateString()) {
          todayTasks.push(task);
        }
      });
    });

    return todayTasks;
  };

  const getAllOverdueTasks = () => {
    const lists = localStorageAPI.getListData();
    const today = new Date();
    const overdueTasks = [];

    lists.forEach(list => {
      list.tasks.forEach(task => {
        const dueDate = new Date(task.dueDate);
        if (dueDate < today) {
          overdueTasks.push(task);
        }
      });
    });

    return overdueTasks;
  };

  const getAllTaskFromList = (listId) => {
    const lists = localStorageAPI.getListData();
    const currentList = lists.find(list => list.id === listId);
    return sortByDueDateAscending(currentList.tasks) || [];
  };

  const findList = (lists, listId) => {
    const list = lists.find(list => list.id === listId);
    if (list) {
      return list;
    }
  };

  const findListFromTaskId = (lists, taskId) => {
    const list = lists.find(list => list.tasks.some(task => task.id === taskId));
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
    const lists = localStorageAPI.getListData();
    const currentList = findList(lists, listId);
    currentList.tasks.push({
      id: generateUniqueId(),
      listId,
      title,
      details,
      dueDate,
      priority,
    });
    localStorageAPI.setListData(lists);
  };

  const editTaskOfList = (taskId, task) => {
    const lists = localStorageAPI.getListData();
    const currentList = findListFromTaskId(lists, taskId);
    const taskIndex = findTaskIndex(currentList, taskId);
    currentList.tasks.splice(taskIndex, 1, task);
    localStorageAPI.setListData(lists);
  };

  const removeTaskFromList = (taskId) => {
    const lists = localStorageAPI.getListData();
    const currentList = findListFromTaskId(lists, taskId);
    const taskIndex = findTaskIndex(currentList, taskId);
    currentList.tasks.splice(taskIndex, 1);
    localStorageAPI.setListData(lists);
  };

  return {
    getAllTasks,
    getAllTodaysTasks,
    getAllOverdueTasks,
    getAllTaskFromList,
    addTaskToList,
    editTaskOfList,
    removeTaskFromList,
  };
}();

export default tasksManager;
