import Icons from "../assets/icons/icons";
import tasksManager from "../dataHandlers/tasksManager";

const taskSideBarController = function() {
  const tasksBar = document.querySelector(".task-bar");

  const render = () => {
    tasksBar.innerHTML = "";

    const addTaskButton = renderAddTaskButton();
    tasksBar.appendChild(addTaskButton);

    const taskGroupingContainer = document.createElement("div");
    taskGroupingContainer.classList.add("task-grouping");

    const todayTasksButton = renderTodayTasks(tasksManager.getAllTodaysTasks().length);
    taskGroupingContainer.appendChild(todayTasksButton);

    const overdueTasksButton = renderOverdueTasks(tasksManager.getAllOverdueTasks().length);
    taskGroupingContainer.appendChild(overdueTasksButton);

    const allTasksButton = renderAllTasksButton(tasksManager.getAllTasks().length);
    taskGroupingContainer.appendChild(allTasksButton);

    tasksBar.appendChild(taskGroupingContainer);
  };

  const renderAddTaskButton = () => {
    const button = document.createElement("button");
    button.classList.add("add-task-btn");

    const addSvg = Icons.plusCircle;
    button.appendChild(addSvg);

    const p = document.createElement("p");
    p.textContent = "Add task";
    button.appendChild(p);

    return button;
  };

  const renderTaskGroupingButtons = (svg, text, no) => {
    const containerBtn = document.createElement("button");

    const div = document.createElement("div");

    const p = document.createElement("p");
    p.textContent = text;

    div.appendChild(svg);
    div.appendChild(p);

    containerBtn.appendChild(div);

    const numberOfTasksP = document.createElement("p");
    numberOfTasksP.textContent = no;

    containerBtn.appendChild(numberOfTasksP);

    containerBtn.addEventListener("click", () => {
      document.querySelectorAll(".selected").forEach(node => node.classList.remove("selected"));
      containerBtn.classList.add("selected");
      taskController.render();
    });

    return containerBtn;
  };

  const renderTodayTasks = (numberOfTasks) => {
    const todayTasksButton = renderTaskGroupingButtons(Icons.today, "Today", numberOfTasks);
    todayTasksButton.dataset.taskGrouping = "Today";
    todayTasksButton.classList.add("selected");
    return todayTasksButton;
  };

  const renderOverdueTasks = (numberOfTasks) => {
    const overdueTasksButton = renderTaskGroupingButtons(Icons.overdue, "Overdue", numberOfTasks);
    overdueTasksButton.dataset.taskGrouping = "Overdue";
    return overdueTasksButton;
  };

  const renderAllTasksButton = (numberOfTasks) => {
    const allTaskButton = renderTaskGroupingButtons(Icons.allTask, "All tasks", numberOfTasks);
    allTaskButton.dataset.taskGrouping = "All tasks";
    return allTaskButton;
  };

  return {
    render,
  };
}();

const taskController = function() {
  const tasksContainer = document.querySelector("main > div");

  const taskGroupMapping = {
    "Today": tasksManager.getAllTodaysTasks,
    "Overdue": tasksManager.getAllOverdueTasks,
    "All tasks": tasksManager.getAllTasks,
  };

  const priorityMapping = {
    "1": "low",
    "2": "medium",
    "3": "high",
  };

  const render = () => {
    tasksContainer.innerHTML = "";
    const selected = document.querySelector(".selected");
    let name = undefined;
    let tasksFromList = undefined;

    if (selected.dataset.listName) {
      name = selected.dataset.listName;
      tasksFromList = tasksManager.getAllTaskFromList(selected.dataset.listId);
    } else {
      name = selected.dataset.taskGrouping;
      tasksFromList = taskGroupMapping[name]();
    }

    const header = renderHeader(name);

    const tasksRender = renderTasks(tasksFromList);

    tasksContainer.appendChild(header);
    tasksContainer.appendChild(tasksRender);
  };

  const renderHeader = (name) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h1>${name}</h1>
      <hr>
    `;

    return div;
  };

  const renderTasks = (tasks) => {
    const div = document.createElement("div");

    tasks.forEach(task => div.appendChild(renderTask(task)));

    return div;
  };

  const renderTask = (task) => {
    const div = document.createElement("div");
    div.classList.add("task");
    div.classList.add(priorityMapping[task.priority]);

    const input = document.createElement("input");
    input.type = "checkbox";

    input.addEventListener("click", () => {
      tasksManager.removeTaskFromList(task.id);
      taskSideBarController.render();
      render();
    });

    const taskDescDiv = document.createElement("div");
    taskDescDiv.classList.add("task-desc");
    taskDescDiv.innerHTML = `
      <p>${task.title}</p>
      <p>${task.details}</p>
    `;

    div.appendChild(input);
    div.appendChild(taskDescDiv);

    return div;
  };

  return { render };
}();

export { taskController, taskSideBarController };
