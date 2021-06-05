// Procedural Todo App on JavaScript
const input = document.querySelector(".todo__inner input");
const buttonSubmit = document.getElementById("btn__submit");
const todoList = document.getElementById("todo__list");
const filterList = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
buttonSubmit.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterList.addEventListener("click", filterTodo);

// Add todo
function addTodo() {
  if (!input.value) {
    alert("Please input something!");
    return;
  }
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo__items");
  todoDiv.setAttribute("id", "todo__items");

  const li = document.createElement("li");

  li.textContent = input.value;

  saveToLocalStorage(input.value);

  input.value = "";

  const firstBtn = document.createElement("button");
  firstBtn.textContent = "Checked";

  firstBtn.addEventListener("click", () => {
    li.classList.toggle("active");
  });

  const secondBtn = document.createElement("button");
  secondBtn.textContent = "Delete";

  todoDiv.appendChild(li);
  todoDiv.appendChild(firstBtn);
  todoDiv.appendChild(secondBtn);

  todoList.append(todoDiv);
}

// Delete Todo
function deleteTodo(e) {
  const item = e.target;
  if (item.textContent === "Delete") {
    item.parentElement.classList.add("active");
    // Remove From LocalStorage
    removeFromLocalStorage(item.parentElement);
    setTimeout(() => {
      item.parentElement.remove();
    }, 500);
  }
}

// Filter Todo
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    const todoLi = todo.firstChild;
    const filterValue = e.target.value;
    switch (filterValue) {
      case "all":
        if (todoLi) {
          todoLi.parentElement.style.display = "flex";
        }
        break;
      case "completed":
        if (todoLi.classList.contains("active")) {
          todoLi.parentElement.style.display = "flex";
        } else {
          todoLi.parentElement.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todoLi.classList.contains("active")) {
          todoLi.parentElement.style.display = "flex";
        } else {
          todoLi.parentElement.style.display = "none";
        }
        break;
    }
  });
}

// Save To LocalStorage
function saveToLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Get From LocalStorage
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo__items");
    todoDiv.setAttribute("id", "todo__items");

    const li = document.createElement("li");

    li.textContent = todo;

    const firstBtn = document.createElement("button");
    firstBtn.textContent = "Checked";

    firstBtn.addEventListener("click", () => {
      li.classList.toggle("active");
    });

    const secondBtn = document.createElement("button");
    secondBtn.textContent = "Delete";

    todoDiv.appendChild(li);
    todoDiv.appendChild(firstBtn);
    todoDiv.appendChild(secondBtn);

    todoList.append(todoDiv);
  });
}

// Remove From LocalStorage
function removeFromLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const indexTodo = todo.children[0].innerText;
  const indexOfTodos = todos.indexOf(indexTodo);
  todos.splice(indexOfTodos, 1);

  localStorage.setItem("todos", JSON.stringify(todos));
}
