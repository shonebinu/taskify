function renderTasks(list) {
  const mainContainer = document.querySelector("main");

  const h1 = document.createElement("h1");
  h1.textContent = list.name;

  mainContainer.appendChild(h1);
}

export { renderTasks };
