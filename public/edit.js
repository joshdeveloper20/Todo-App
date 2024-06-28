const todoForm = document.querySelector(".todo-form");
const todoDomID = document.querySelector(".todo-id");
const todoInput = document.querySelector(".edit-todo-input");
const completedDom = document.querySelector(".completed");
const formAlert = document.querySelector(".form-alert");
const spinner = document.querySelector(".spinner");
const todoList = document.querySelector(".todo");
const params = window.location.search;
const id = new URLSearchParams(params).get("id");

const showTodo = async () => {
  try {
    const { data: todo } = await axios.get(`/api/todos/${id}`);
    const { completed, _id: todoId, name } = todo;
    todoDomID.textContent = todoId;
    todoInput.value = name;
    if (completed) {
      completedDom.checked = true;
    }
  } catch (error) {
    console.log(error);
  }
};

showTodo();

todoForm.addEventListener("submit", async () => {
  try {
    const todoName = todoInput.value;
    const todoCompleted = completedDom.checked;

    await axios.patch(`/api/todos/${id}`, {
      name: todoName,
      completed: todoCompleted,
    });

    formAlert.textContent = "Task successfully edited";
    formAlert.classList.add("text-success");
  } catch (error) {
    console.log(error);
    formAlert.textContent = `error, please try again`;
  }

  setTimeout(() => {
    formAlert.style.display = "none";
    formAlert.classList.remove("text-success");
  }, 5000);
});
