import Icons from "../assets/icons/icons";
import listsManager from "../dataHandlers/listsManager";

const listController = function() {
  const listsBar = document.querySelector(".list-bar");

  const render = () => {
    listsBar.innerHTML = "";

    const h3 = renderListBarTitle();
    listsBar.appendChild(h3);

    const lists = listsManager.getAllLists();

    if (isNoLists()) {
      renderNoListsWarning();
    } else {
      const listsView = renderLists(lists);
      listsBar.appendChild(listsView);
    }

    const addListButton = renderAddListButton();
    listsBar.appendChild(addListButton);
  };

  const renderListBarTitle = () => {
    const h3 = document.createElement("h3");
    h3.textContent = "My Lists";
    return h3;
  };

  const renderLists = (lists) => {
    const listsContainer = document.createElement("div");
    lists.forEach(list => listsContainer.appendChild(renderList(list)));
    listsContainer.classList.add("lists");
    return listsContainer;
  };

  const renderList = (list) => {
    const containerDiv = document.createElement("button");
    const nameContainer = document.createElement("div");
    const renameAndDeleteContainer = document.createElement("div");

    const listNameP = document.createElement("p");
    listNameP.textContent = list.name;

    nameContainer.appendChild(Icons.folderPoundOutline);
    nameContainer.appendChild(listNameP);

    const renameSvg = Icons.renameOutline;
    const deleteSvg = Icons.deleteOutline;
    renameAndDeleteContainer.appendChild(renameSvg);
    renameAndDeleteContainer.appendChild(deleteSvg);

    containerDiv.appendChild(nameContainer);
    containerDiv.appendChild(renameAndDeleteContainer);

    containerDiv.classList.add("list");

    containerDiv.dataset.listId = list.id;

    renameSvg.addEventListener("click", () => {
      const listId = containerDiv.dataset.listId;
      renderRenameListForm(listId);
    });

    deleteSvg.addEventListener("click", () => {
      const listId = containerDiv.dataset.listId;
      const listName = list.name;
      const confirmDelete = confirm(`Are you sure you want to delete the list "${listName}"?`);
      if (confirmDelete) {
        listsManager.deleteList(listId);
        render();
      }
    });

    containerDiv.addEventListener("click", () => {
      document.querySelectorAll(".selected").forEach(node => node.classList.remove("selected"));
      containerDiv.classList.add("selected");
    });

    return containerDiv;
  };

  const renderAddListButton = () => {
    const button = document.createElement("button");
    button.classList.add("add-list-btn");

    button.appendChild(Icons.plusCircle);

    button.addEventListener("click", () => {
      renderAddListForm();
    });

    return button;
  };

  const renderAddListForm = () => {
    if (document.querySelector(".add-list-form")) {
      return;
    }

    const container = document.createElement("form");

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter list name";

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", (event) => {
      event.preventDefault();
      container.remove();
    });

    const addButton = document.createElement("button");
    addButton.textContent = "Add";
    addButton.addEventListener("click", (event) => {
      event.preventDefault();
      const newListName = input.value.trim();
      if (newListName) {
        listsManager.addList(newListName);
        render();
      }
      input.value = "";
      container.remove();
    });

    input.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        addButton.click();
      }
    });

    container.classList.add("add-list-form");

    container.appendChild(input);
    container.appendChild(cancelButton);
    container.appendChild(addButton);

    listsBar.appendChild(container);
  };

  const renderRenameListForm = (listId) => {
    const existingForm = document.querySelector(`.rename-list-form`);
    if (existingForm) {
      existingForm.remove();
    }

    const container = document.createElement("form");
    container.classList.add("rename-list-form");

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter new list name";

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", (event) => {
      event.preventDefault();
      container.remove();
    });

    const renameButton = document.createElement("button");
    renameButton.textContent = "Rename";
    renameButton.addEventListener("click", (event) => {
      event.preventDefault();
      const newListName = input.value.trim();
      if (newListName) {
        listsManager.renameList(listId, newListName);
        render();
      }
      input.value = "";
      container.remove();
    });

    input.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        renameButton.click();
      }
    });

    container.classList.add("rename-list-form");
    container.dataset.listId = listId;

    container.appendChild(input);
    container.appendChild(cancelButton);
    container.appendChild(renameButton);

    const listButton = document.querySelector(`.list[data-list-id="${listId}"]`);
    listButton.parentNode.insertBefore(container, listButton.nextSibling);
  };

  const isNoLists = () => {
    return listsManager.getAllLists().length === 0;
  };

  const renderNoListsWarning = () => {
    const warningMessage = document.createElement("p");
    warningMessage.textContent = "You should have at least one list to save tasks.";
    warningMessage.classList.add("list-empty-warning");
    listsBar.appendChild(warningMessage);
  };

  return {
    render,
  };
}();

export default listController;
