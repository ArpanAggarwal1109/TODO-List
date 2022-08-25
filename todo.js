let tasks = [];
const tasksList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const tasksCounter = document.getElementById("tasks-counter");

function fetchTodos() {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((data) => {
      tasks = data.slice(0, 10);
      console.log("data from fetch :: ", data, tasks);
      renderList();
    })
    .catch((error) => console.log("error", error));
}

function addTaskToDOM(task) {
  const li = document.createElement("li");

  li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${
    task.completed ? "checked" : ""
  }  class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    <img src="https://uploads.codesandbox.io/uploads/user/aa912bb1-4177-4cbd-b09e-15892c8a0361/ZsCI-delete-xxl.png" class="delete" data-id="${
      task.id
    }" />`;
  tasksList.append(li);
}

function renderList() {
  tasksList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    addTaskToDOM(tasks[i]);
  }
  tasksCounter.innerHTML = tasks.length;
}

function toggleTask(taskId) {
  let task = tasks.filter(function (task) {
    return task.id == taskId;
  });
  if (task.length > 0) {
    const currentTask = task[0];
    currentTask.completed = !currentTask.completed;
    renderList();
    showNotification("Task toggled successfully");
    return;
  }
  showNotification("Could not toggle the task");
}

function deleteTask(taskId) {
  console.log(taskId, tasks[0]);
  let newTask = tasks.filter(function (task) {
    return task.id !== Number(taskId);
  });
  tasks = newTask;
  renderList();
  showNotification("Task deleted successfully");
}

function addTask(task) {
  if (task) {
    tasks.push(task);
    renderList();
    showNotification("Task added successfully");
    return;
  }
  showNotification("Task cannot be added");
}

function showNotification(text) {
  alert(text);
}

function handleInputKeypress(e) {
  if (e.key == "Enter") {
    const text = e.target.value;

    if (!text) {
      showNotification("Task test cannot be empty");
      return;
    }
    const task = {
      title: text,
      id: Date.now().toString(),
      completed: false
    };

    e.target.value = "";
    addTask(task);
  }
}

function handleClickListener(e) {
  const target = e.target;
  if (target.className == "delete") {
    const taskId = target.dataset.id;
    deleteTask(taskId);
    return;
  } else if (target.className == "custom-checkbox") {
    const taskId = target.id;
    toggleTask(taskId);
    return;
  }
}
function initializeApp() {
  addTaskInput.addEventListener("keyup", handleInputKeypress);
  document.addEventListener("click", handleClickListener);
  fetchTodos();
}

initializeApp();
