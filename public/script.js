// SELECTING DOM HTML ELEMENTS
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const formAlert = document.querySelector(".form-alert");
const spinner = document.querySelector(".spinner");
const todoList = document.querySelector(".todo");

// LOAD ALL TODOS

showTodo = async () => {
  spinner.classList.add("show-spinner");
  try {
    const { data: todos } = await axios.get("/api/todos");
    // console.log(todos);

    if (todos.length < 1) {
      todoList.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>';
      spinner.classList.remove("show-spinner");
      return;
    }

    const allTodos = todos
      .map((todo) => {
        const { completed, _id, name } = todo;
        return `
            <div class="single-todo${completed ? " todo-completed" : ""}">
                <h5>
                <span><i class="fa-regular fa-circle-check"></i></span>
                ${name}
                </h5>

                <div class="todo-actions">
                    <a href="edit.html?id=${_id}" class="edit">
                    <i class="fa-regular fa-pen-to-square"></i>
                    </a>
                    <button type="button" class="delete-btn" data-id = "${_id}">
                    <i class="fa-solid fa-trash"></i>
                    </button>

                </div>
            </div>
          `;
      })
      .join("");
    todoList.innerHTML = allTodos;
  } catch (error) {
    console.error(error);
    todoList.innerHTML =
      '<h5 class="empty-list">There was an error, please try later...</h5>';
  }
  spinner.classList.remove("show-spinner");
};

showTodo();

// DELETE TODO

todoList.addEventListener("click", async (e) => {
  if (e.target.parentElement.classList.contains("delete-btn")) {
    spinner.classList.add("show-spinner");
    const { id } = e.target.parentElement.dataset;
    try {
      await axios.delete(`/api/todos/${id}`);
      showTodo();
      spinner.classList.remove("show-spinner");
    } catch (error) {}
  }
});

// POST TODO TASK
todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = todoInput.value;
  // console.log(name);

  try {
    await axios.post("/api/todos", { name: name });
    showTodo();
    todoInput.value = "";
    formAlert.textContent = "Task succesfully addded..";
    formAlert.classList.add("text-success");
  } catch (error) {
    formAlert.textContent = "character limit exceeded..";
    formAlert.classList.remove("text-success");
  }

  setTimeout(() => {
    formAlert.style.display = "none";
  }, 3000);
});
