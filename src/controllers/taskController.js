import addTaskSvg from "../assets/icons/plus-circle.svg";

const mainContainer = document.querySelector("main");

function renderTasks(list) {
  mainContainer.innerHTML = "";

  let numberOfTasks = list.tasks.length;

  const listNameDiv = document.createElement("div");

  const h2 = document.createElement("h2");
  h2.textContent = list.name + ` (${numberOfTasks})`;

  const button = document.createElement("button");

  const addIcon = new Image();
  addIcon.src = addTaskSvg;

  const addSpan = document.createElement("span");
  addSpan.textContent = "Add Task";

  button.appendChild(addIcon);
  button.appendChild(addSpan);

  listNameDiv.appendChild(h2);
  listNameDiv.appendChild(button);

  const hr = document.createElement("hr");

  mainContainer.appendChild(listNameDiv);
  mainContainer.appendChild(hr);
}

export { renderTasks };
