const createList = (name) => {
  const tasks = [];
  return {
    name,
    tasks,
  };
};

const lists = [createList("General"), createList("Home"), createList("Work")];

const findList = (name) => {
  return lists.find((list) => list.name === name);
};

const getLists = () => {
  return lists;
};

const addList = (name) => {
  lists.push(createList(name));
};

const renameList = (name, newName) => {
  const list = findList(name);
  list.name = newName;
};

const deleteList = (name) => {
  const index = lists.findIndex((list) => list.name === name);
  lists.splice(index, 1);
};

export { addList, deleteList, getLists, renameList };
