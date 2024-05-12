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

    const allTasksButton = renderAllTasksButton(tasksManager.getAllTasks().length);
    taskGroupingContainer.appendChild(allTasksButton);

    const todayTasksButton = renderTodayTasks(tasksManager.getAllTodaysTasks().length);
    taskGroupingContainer.appendChild(todayTasksButton);

    const overdueTasksButton = renderOverdueTasks(tasksManager.getAllOverdueTasks().length);
    taskGroupingContainer.appendChild(overdueTasksButton);

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
    });

    return containerBtn;
  };

  const renderAllTasksButton = (numberOfTasks) => {
    const allTaskButton = renderTaskGroupingButtons(Icons.allTask, "All tasks", numberOfTasks);
    allTaskButton.dataset.taskGrouping = "0";
    allTaskButton.classList.add("selected");
    return allTaskButton;
  };

  const renderTodayTasks = (numberOfTasks) => {
    const todayTasksButton = renderTaskGroupingButtons(Icons.today, "Today", numberOfTasks);
    todayTasksButton.dataset.taskGrouping = "1";
    return todayTasksButton;
  };

  const renderOverdueTasks = (numberOfTasks) => {
    const overdueTasksButton = renderTaskGroupingButtons(Icons.overdue, "Overdue", numberOfTasks);
    overdueTasksButton.dataset.taskGrouping = "2";
    return overdueTasksButton;
  };

  return {
    render,
  };
}();

const taskController = function() {
}();

export { taskController, taskSideBarController };
