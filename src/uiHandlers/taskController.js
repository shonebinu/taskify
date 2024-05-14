import Icons from "../assets/icons/icons";
import tasksManager from "../dataHandlers/tasksManager";
import stateController from "./stateController";

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
      stateController.setState({
        list: false,
        name: containerBtn.dataset.taskGrouping,
        id: containerBtn.getAttribute("id"),
      });
      stateController.render();
    });

    return containerBtn;
  };

  const renderTodayTasks = (numberOfTasks) => {
    const todayTasksButton = renderTaskGroupingButtons(Icons.today, "Today", numberOfTasks);
    todayTasksButton.dataset.taskGrouping = "Today";
    todayTasksButton.setAttribute("id", "today");
    return todayTasksButton;
  };

  const renderOverdueTasks = (numberOfTasks) => {
    const overdueTasksButton = renderTaskGroupingButtons(Icons.overdue, "Overdue", numberOfTasks);
    overdueTasksButton.dataset.taskGrouping = "Overdue";
    overdueTasksButton.setAttribute("id", "overdue");
    return overdueTasksButton;
  };

  const renderAllTasksButton = (numberOfTasks) => {
    const allTaskButton = renderTaskGroupingButtons(Icons.allTask, "All tasks", numberOfTasks);
    allTaskButton.dataset.taskGrouping = "All tasks";
    allTaskButton.setAttribute("id", "all-tasks");
    return allTaskButton;
  };

  return {
    render,
  };
}();

const taskController = function() {
  const tasksContainer = document.querySelector("main > div");

  const taskGroupMapping = {
    "today": tasksManager.getAllTodaysTasks,
    "overdue": tasksManager.getAllOverdueTasks,
    "all-tasks": tasksManager.getAllTasks,
  };

  const priorityMapping = {
    "1": "low",
    "2": "medium",
    "3": "high",
  };

  const render = () => {
    tasksContainer.innerHTML = "";
    const selectedList = stateController.getState();
    let tasksFromList = undefined;

    if (selectedList.list) {
      tasksFromList = tasksManager.getAllTaskFromList(selectedList.id);
    } else {
      tasksFromList = taskGroupMapping[selectedList.id]();
    }

    const header = renderHeader(selectedList.name);

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
      setTimeout(() => {
        tasksManager.removeTaskFromList(task.id);
        stateController.render();
      }, 100);
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
