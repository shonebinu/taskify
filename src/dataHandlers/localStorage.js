// const DEFAULT_LISTS_DATA = [
//   { id: "1", name: "General", tasks: [] },
//   { id: "2", name: "Home", tasks: [] },
//   { id: "3", name: "Work", tasks: [] },
// ];

const DEFAULT_LISTS_DATA = [
  {
    id: "1",
    name: "General",
    tasks: [
      {
        id: "1",
        listId: "1",
        title: "Finish Report",
        details: "Complete the quarterly report for the team meeting.",
        dueDate: "2024-05-10",
        priority: 2,
      },
      {
        id: "2",
        listId: "1",
        title: "Prepare Presentation",
        details: "Gather materials and create slides for the upcoming presentation.",
        dueDate: "2024-05-15",
        priority: 1,
      },
    ],
  },
  {
    id: "2",
    name: "Home",
    tasks: [
      {
        id: "3",
        listId: "2",
        title: "Buy Groceries",
        details: "Pick up groceries for the week from the supermarket.",
        dueDate: "2024-05-12",
        priority: 2,
      },
      {
        id: "4",
        listId: "2",
        title: "Clean House",
        details: "Tidy up the living room, kitchen, and bathroom.",
        dueDate: "2024-05-18",
        priority: 3,
      },
    ],
  },
  {
    id: "3",
    name: "Work",
    tasks: [
      {
        id: "5",
        listId: "3",
        title: "Attend Meeting",
        details: "Participate in the project status meeting at 10:00 AM.",
        dueDate: "2024-05-14",
        priority: 1,
      },
      {
        id: "6",
        listId: "3",
        title: "Review Documents",
        details: "Read and provide feedback on the latest project documents.",
        dueDate: "2024-05-20",
        priority: 2,
      },
    ],
  },
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

  const getListState = () => {
    return JSON.parse(localStorage.getItem("listState"));
  };

  const setListState = (obj) => {
    localStorage.setItem("listState", JSON.stringify(obj));
  };

  initializeData();

  return {
    getListData,
    setListData,
    getListState,
    setListState,
  };
}();

export default localStorageAPI;
