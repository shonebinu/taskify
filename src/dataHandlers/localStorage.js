const DEFAULT_LISTS_DATA = [
  { id: "1", name: "General", tasks: [] },
  { id: "2", name: "Home", tasks: [] },
  { id: "3", name: "Work", tasks: [] },
];

const localStorageAPI = function() {
  const initializeData = () => {
    if (!localStorage.getItem("lists")) {
      localStorage.setItem("lists", JSON.stringify(DEFAULT_LISTS_DATA));
    }
  };

  const getListData = () => {
    return JSON.parse(localStorage.getItem("lists")) || [];
  };

  const setListData = (lists) => {
    localStorage.setItem("lists", JSON.stringify(lists));
  };

  initializeData();

  return {
    getListData,
    setListData,
  };
}();

export default localStorageAPI;
