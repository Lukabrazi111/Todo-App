// Class UI
class UI {
  // Add Todo
  static addTodos() {
    const input = document.querySelector(".todo__inner input");

    if (!input.value) {
      alert("Please write something!");
      return;
    }

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo__items");
    todoDiv.setAttribute("id", "todo__items");

    const li = document.createElement("li");

    li.textContent = input.value;

    const storage = Storage.addTodo(input.value);

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
  static deleteTodo(e) {
    const item = e.target;
    if (item.textContent === "Delete") {
      item.parentElement.classList.add("active");
      // remove from localStorage
      const storage = Storage.removeFromLocalStorage(item.parentElement);
      setTimeout(() => {
        item.parentElement.remove();
      }, 500);
    }
  }

  // Filter Todo
  static filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
      const firstLi = todo.firstChild;
      const filterValue = e.target.value;
      switch (filterValue) {
        case "all":
          firstLi.parentElement.style.display = "flex";
          break;
        case "completed":
          if (firstLi.classList.contains("active")) {
            firstLi.parentElement.style.display = "flex";
          } else {
            firstLi.parentElement.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!firstLi.classList.contains("active")) {
            firstLi.parentElement.style.display = "flex";
          } else {
            firstLi.parentElement.style.display = "none";
          }
          break;
      }
    });
  }
}

// Class Stora
class Storage {
  static addToLocalStorage() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
  }

  // Add Todo
  static addTodo(inputValue) {
    const storage = Storage.addToLocalStorage();
    storage.push(inputValue);
    localStorage.setItem("todos", JSON.stringify(storage));
  }

  // Show Todo From LocalStorage
  static showTodoFromLocalStorage() {
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

    return todos;
  }

  // Remove From localStorage
  static removeFromLocalStorage(rm) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }

    const itemList = rm.children[0].innerText;
    const indexOfList = todos.indexOf(itemList);
    todos.splice(indexOfList, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

// DOM Selectors
const btnSubmit = document.getElementById("btn__submit");
const todoList = document.getElementById("todo__list");
const filterTodo = document.querySelector(".filter__todo");

// Event Listeners
btnSubmit.addEventListener("click", UI.addTodos);
todoList.addEventListener("click", UI.deleteTodo);
filterTodo.addEventListener("click", UI.filterTodo);
document.addEventListener("DOMContentLoaded", Storage.showTodoFromLocalStorage);
