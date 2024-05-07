import localStorageAPI from "./localStorage";

function generateUniqueId() {
  return Date.now().toString();
}

const listsManager = function() {
  const getAllLists = () => {
    return localStorageAPI.getData();
  };

  const isNameUnique = (name, lists) => {
    return !lists.some(list => list.name === name);
  };

  const getUniqueName = (name, lists) => {
    let uniqueName = name;
    let index = 1;
    while (!isNameUnique(uniqueName, lists)) {
      uniqueName = `${name} ${index}`;
      index++;
    }
    return uniqueName;
  };

  const addList = (name) => {
    const lists = getAllLists();
    const uniqueName = getUniqueName(name, lists);
    lists.push({ id: generateUniqueId(), name: uniqueName, tasks: [] });
    localStorageAPI.setData(lists);
  };

  const renameList = (listId, newName) => {
    const lists = getAllLists();
    const currentList = lists.find(list => list.id === listId);
    if (currentList) {
      const uniqueName = getUniqueName(newName, lists.filter(list => list.id !== listId));
      currentList.name = uniqueName;
      localStorageAPI.setData(lists);
    }
  };

  const deleteList = (listId) => {
    const lists = getAllLists();
    const listIndex = lists.findIndex(list => list.id === listId);
    if (listIndex !== -1) {
      lists.splice(listIndex, 1);
    }
    localStorageAPI.setData(lists);
  };

  return {
    getAllLists,
    addList,
    renameList,
    deleteList,
  };
}();

export default listsManager;
