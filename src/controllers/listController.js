import deleteSvg from "../assets/icons/delete-outline.svg";
import folderSvg from "../assets/icons/folder-pound-outline.svg";
import renameSvg from "../assets/icons/rename-outline.svg";

const listsDiv = document.querySelector(".lists");
const addListButton = document.querySelector(".add-list");
let isFormOpen = false;
let selectedList = null;
let selectedListChangeCallback = null;

function renderLists(lists, addListCallback, renameListCallback, deleteListCallback) {
  listsDiv.innerHTML = "";

  let firstList = null;

  lists.forEach((list) => {
    const containerDiv = document.createElement("div");
    const div = document.createElement("div");

    const folderIcon = new Image();
    folderIcon.src = folderSvg;
    div.appendChild(folderIcon);

    const p = document.createElement("p");
    p.textContent = list.name;
    div.appendChild(p);

    const iconDiv = document.createElement("div");
    const renameIcon = new Image();
    renameIcon.src = renameSvg;
    renameIcon.addEventListener("click", () => {
      listEditor(renameListCallback, p.textContent, () => {
        renderLists(lists, addListCallback, renameListCallback, deleteListCallback);
      });
    });
    iconDiv.appendChild(renameIcon);

    const deleteIcon = new Image();
    deleteIcon.src = deleteSvg;
    deleteIcon.addEventListener("click", () => {
      deleteListCallback(list.name);
      renderLists(lists, addListCallback, renameListCallback, deleteListCallback);
    });
    iconDiv.appendChild(deleteIcon);

    containerDiv.classList.add("list");
    containerDiv.appendChild(div);
    containerDiv.appendChild(iconDiv);

    containerDiv.addEventListener("click", () => {
      selectedList = list;
      if (selectedListChangeCallback) {
        selectedListChangeCallback(selectedList);
      }
      const listItems = listsDiv.querySelectorAll(".list");
      listItems.forEach((item) => {
        item.classList.remove("selected");
      });
      containerDiv.classList.add("selected");
    });

    listsDiv.appendChild(containerDiv);

    if (!firstList) {
      firstList = containerDiv;
    }
  });

  if (firstList) {
    firstList.classList.add("selected");
    selectedList = lists[0];
    if (selectedListChangeCallback) {
      selectedListChangeCallback(selectedList);
    }
  }

  addListButton.addEventListener("click", () => {
    listEditor(addListCallback, null, () => {
      renderLists(lists, addListCallback, renameListCallback, deleteListCallback);
    });
  });
}

function listEditor(actionCallback, initialName, rerenderCallback) {
  if (isFormOpen) return;
  isFormOpen = true;

  const formDiv = document.createElement("div");
  formDiv.classList.add("list-form");

  const input = document.createElement("input");
  input.type = "text";

  if (initialName) {
    input.value = initialName;
  } else {
    input.placeholder = "Enter list name...";
  }

  formDiv.appendChild(input);

  const actionButton = document.createElement("button");
  actionButton.textContent = initialName ? "Rename" : "Add";
  actionButton.addEventListener("click", () => {
    submitForm();
  });

  formDiv.appendChild(actionButton);

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.addEventListener("click", () => {
    closeForm();
  });

  formDiv.appendChild(closeButton);

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      submitForm();
    }
  });

  function submitForm() {
    const newName = input.value.trim();
    if (newName !== "") {
      if (initialName !== null) {
        actionCallback(initialName, newName); // rename list
      } else {
        actionCallback(newName); // create new list
      }
      closeForm();

      if (rerenderCallback) {
        rerenderCallback();
      }
    }
  }

  function closeForm() {
    formDiv.remove();
    isFormOpen = false;
  }

  if (initialName) {
    listsDiv.appendChild(formDiv);
  } else {
    addListButton.parentElement.appendChild(formDiv);
  }

  input.focus();
}

function getSelectedList() {
  return selectedList;
}

function setOnSelectedListChange(callback) {
  selectedListChangeCallback = callback;
}

export { getSelectedList, renderLists, setOnSelectedListChange };
