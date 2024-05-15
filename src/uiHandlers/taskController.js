import { formatDistance, parseISO } from "date-fns";
import Icons from "../assets/icons/icons";
import listsManager from "../dataHandlers/listsManager";
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

    button.addEventListener("click", () => {
      if (listsManager.getAllLists().length === 0) {
        alert("Create a list");
        return;
      }
      createModal();
      const modal = document.getElementById("addTaskModal");
      modal.showModal();
    });

    return button;
  };

  const createModal = () => {
    const dialog = document.createElement("dialog");
    dialog.id = "addTaskModal";

    const form = document.createElement("form");

    const getListOptions = () => {
      const lists = listsManager.getAllLists();
      return lists.map(list => `<option value=${list.id}>${list.name}</option>`).join("");
    };

    form.innerHTML = `

      <h2>Add task</h2>
      <div>
        <label>Title:</label>
        <input type=text name=title>  
      </div>
      <div>
        <label>Details:</label>
        <textarea name=details></textarea>
      </div>
      <div>
        <label>Due Date:</label>
        <input type=date name=due>
      </div>
      <div>
        <label>Priority:</label>
        <select name=priority>
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
      </div>
      <div>
        <label>List:</label>
        <select name=list>
          ${getListOptions()}
        </select>
      </div>
    `;

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", (e) => {
      e.preventDefault();
      dialog.close();
      dialog.remove();
    });

    const addButton = document.createElement("button");
    addButton.textContent = "Add";
    addButton.addEventListener("click", (e) => {
      e.preventDefault();
      const listId = form.querySelector("[name=list]").value;
      const title = form.querySelector("[name=title]").value;
      const details = form.querySelector("[name=details]").value;
      const dueDate = form.querySelector("[name=due]").value;
      const priority = form.querySelector("[name=priority]").value;

      tasksManager.addTaskToList(listId, title, details, dueDate, priority);

      dialog.close();
      dialog.remove();
      stateController.render();
    });

    const buttonContainer = document.createElement("div");
    buttonContainer.appendChild(closeButton);
    buttonContainer.appendChild(addButton);

    form.appendChild(buttonContainer);

    dialog.appendChild(form);

    document.body.appendChild(dialog);
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

    const descDiv = document.createElement("div");

    const taskDescDiv = document.createElement("div");
    taskDescDiv.classList.add("task-desc");
    taskDescDiv.innerHTML = `
      <p>${task.title}</p>
      <p>${task.details}</p>
    `;

    taskDescDiv.addEventListener("click", () => {
      openEditModal(task);
      const editModal = document.querySelector("#editTaskModal");
      editModal.showModal();
    });

    const listName = document.createElement("div");
    listName.addEventListener("click", (e) => {
      e.stopPropagation();
      stateController.setState({ list: true, name: listsManager.getNameFromId(task.listId), id: task.listId });
      stateController.render();
    });
    listName.textContent = listsManager.getNameFromId(task.listId);

    const dateDiv = document.createElement("div");
    if (task.dueDate) {
      dateDiv.textContent = formatDistance(parseISO(task.dueDate), new Date(), { addSuffix: true });
    } else {
      dateDiv.textContent = "No Due Date";
    }

    descDiv.appendChild(taskDescDiv);
    descDiv.appendChild(listName);
    descDiv.appendChild(dateDiv);

    div.appendChild(input);
    div.appendChild(descDiv);

    return div;
  };

  const openEditModal = (task) => {
    const dialog = document.createElement("dialog");
    dialog.id = "editTaskModal";

    const form = document.createElement("form");

    const getListOptions = () => {
      const lists = listsManager.getAllLists();
      return lists.map(list =>
        `<option value="${list.id}" ${list.id === task.listId ? "selected" : ""}>${list.name}</option>`
      ).join("");
    };

    form.innerHTML = `
        <h2>Edit Task</h2>
        <div>
            <label>Title:</label>
            <input type="text" name="title" value="${task.title}">
        </div>
        <div>
            <label>Details:</label>
            <textarea name="details">${task.details}</textarea>
        </div>
        <div>
            <label>Due Date:</label>
            <input type="date" name="due" value="${task.dueDate}">
        </div>
        <div>
            <label>Priority:</label>
            <select name="priority">
                <option value="1" ${task.priority === 1 ? "selected" : ""}>Low</option>
                <option value="2" ${task.priority === 2 ? "selected" : ""}>Medium</option>
                <option value="3" ${task.priority === 3 ? "selected" : ""}>High</option>
            </select>
        </div>
        <div>
          <label>List:</label>
          <select name="list">
            ${getListOptions(task.listId)}
          </select>
        </div>
        <div>
            <button id="cancelEditBtn">Cancel</button>
            <button id="editTaskBtn">Update</button>
        </div>
    `;

    form.querySelector("#editTaskBtn").addEventListener("click", (e) => {
      e.preventDefault();

      const listId = form.querySelector("[name=list]").value;
      const title = form.querySelector("[name=title]").value;
      const details = form.querySelector("[name=details]").value;
      const dueDate = form.querySelector("[name=due]").value;
      const priority = form.querySelector("[name=priority]").value;

      tasksManager.removeTaskFromList(task.id);

      tasksManager.addTaskToList(listId, title, details, dueDate, priority);

      dialog.close();
      dialog.remove();
      stateController.render();
    });

    form.querySelector("#cancelEditBtn").addEventListener("click", (e) => {
      e.preventDefault();
      dialog.close();
      dialog.remove();
    });

    dialog.appendChild(form);
    document.body.appendChild(dialog);
  };

  return { render };
}();

export { taskController, taskSideBarController };
