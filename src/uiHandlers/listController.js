import Icons from "../assets/icons/icons";
import listsManager from "../dataHandlers/listsManager";

function renderSvg(svg) {
  const svgContainer = document.createElement("span");
  svgContainer.innerHTML = svg;
  return svgContainer;
}

const listController = function() {
  const listsBar = document.querySelector(".list-bar");

  const render = () => {
    listsBar.innerHTML = "";

    const h3 = renderListBarTitle();
    listsBar.appendChild(h3);

    const lists = listsManager.getAllLists();

    const listsView = renderLists(lists);
    listsBar.appendChild(listsView);

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
    const containerDiv = document.createElement("div");
    const nameContainer = document.createElement("div");
    const renameAndDeleteContainer = document.createElement("div");

    const listNameP = document.createElement("p");
    listNameP.textContent = list.name;

    nameContainer.appendChild(renderSvg(Icons.folderPoundOutline));
    nameContainer.appendChild(listNameP);

    const renameSvg = renderSvg(Icons.renameOutline);
    const deleteSvg = renderSvg(Icons.deleteOutline);
    renameAndDeleteContainer.appendChild(renameSvg);
    renameAndDeleteContainer.appendChild(deleteSvg);

    containerDiv.appendChild(nameContainer);
    containerDiv.appendChild(renameAndDeleteContainer);

    containerDiv.classList.add("list");

    return containerDiv;
  };

  const renderAddListButton = () => {
    const button = document.createElement("button");
    button.classList.add("add-list-btn");
    button.appendChild(renderSvg(Icons.plusCircle));
    return button;
  };

  return {
    render,
  };
}();

export default listController;
