import deleteSvg from "../assets/icons/delete-outline.svg";
import folderSvg from "../assets/icons/folder-pound-outline.svg";
import renameSvg from "../assets/icons/rename-outline.svg";

const listsDiv = document.querySelector(".lists");
const addListButton = document.querySelector(".add-list");
let isFormOpen = false;

function renderLists(lists, addListCallback, renameListCallback, deleteListCallback) {
  listsDiv.innerHTML = "";

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

    listsDiv.appendChild(containerDiv);
  });

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
    const newName = input.value.trim();
    if (newName !== "") {
      if (initialName !== null) {
        actionCallback(initialName, newName); // rename list
      } else {
        actionCallback(newName); // create new list
      }
      formDiv.remove();
      isFormOpen = false;

      if (rerenderCallback) {
        rerenderCallback();
      }
    }
  });

  formDiv.appendChild(actionButton);

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.addEventListener("click", () => {
    formDiv.remove();
    isFormOpen = false;
  });

  formDiv.appendChild(closeButton);

  if (initialName) {
    listsDiv.appendChild(formDiv);
  } else {
    addListButton.parentElement.appendChild(formDiv);
  }
}

export { renderLists };
