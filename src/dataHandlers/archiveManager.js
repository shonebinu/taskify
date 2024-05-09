import localStorageAPI from "./localStorage";

const archiveManager = function() {
  const getAllArchives = () => {
    return localStorageAPI.getArchiveData();
  };

  const addTaskToArchives = (task) => {
    const archives = getAllArchives();
    archives.push(task);
    localStorageAPI.setArchiveData(archives);
  };

  const removeFromArchives = (taskId) => {
    const archives = getAllArchives();
    const taskIndex = archives.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      const removedTask = archives.splice(taskIndex, 1);
      localStorageAPI.setArchiveData(archives);
      return removedTask;
    }
  };

  const clearArchives = () => {
    localStorageAPI.setArchiveData([]);
  };

  return {
    getAllArchives,
    addTaskToArchives,
    removeFromArchives,
    clearArchives,
  };
}();

export default archiveManager;
