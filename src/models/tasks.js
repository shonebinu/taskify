function createTask(title, description, dueDate, priority) {
  return {
    title,
    description,
    dueDate,
    priority,
  };
}

const addTaskToList = (list, title, description, dueDate, priority) => {
  const task = createTask(title, description, dueDate, priority);
  list.tasks.push(task);
};

const removeTaskFromList = (list, task) => {
  const index = list.tasks.indexOf(task);
  list.tasks.splice(index, 1);
};

export { addTaskToList, removeTaskFromList };
