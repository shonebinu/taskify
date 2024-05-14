import localStorageAPI from "./localStorage";

function generateUniqueId() {
  return Date.now().toString();
}

const listsManager = function() {
  const getAllLists = () => {
    return localStorageAPI.getListData();
  };

  const getNameFromId = (id) => {
    const list = getAllLists().find(list => list.id === id);
    return list.name;
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
    localStorageAPI.setListData(lists);
  };

  const renameList = (listId, newName) => {
    const lists = getAllLists();
    const currentList = lists.find(list => list.id === listId);
    if (currentList) {
      const uniqueName = getUniqueName(newName, lists.filter(list => list.id !== listId));
      currentList.name = uniqueName;
      localStorageAPI.setListData(lists);
    }
  };

  const deleteList = (listId) => {
    const lists = getAllLists();
    const listIndex = lists.findIndex(list => list.id === listId);
    if (listIndex !== -1) {
      lists.splice(listIndex, 1);
    }
    localStorageAPI.setListData(lists);
  };

  return {
    getNameFromId,
    getAllLists,
    addList,
    renameList,
    deleteList,
  };
}();

export default listsManager;
