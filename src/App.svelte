<script>
  import TodoList from "./lib/TodoList.svelte";
  import { v4 as uuid } from "uuid";
  import { onMount, tick } from "svelte";

  let todoList;
  let todos = null;
  let isLoading = false;
  let error = null;

  onMount(() => {
    loadTodos();
  });

  async function loadTodos() {
    isLoading = true;
    await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then(async (response) => {
        if (response.ok) {
          todos = await response.json();
        } else {
          error = "An error has occurred";
        }
      })
      .catch((err) => {
        error = "Failed to load todos.";
      });
    isLoading = false;
  }

  async function handleAddTodo(e) {
    e.preventDefault();

    setTimeout(() => {
      todos = [
        ...todos,
        {
          id: uuid(),
          title: e.detail.title,
          completed: false,
        },
      ];
    }, 300);
    await tick();
    todoList.clearInput();
  }

  function handleRemoveTodo(event) {
    todos = todos.filter((t) => t.id !== event.detail.id);
  }

  function handleToggleTodo(event) {
    todos = todos.map((todo) => {
      if (todo.id === event.detail.id) {
        return { ...todo, completed: event.detail.value };
      }
      return { ...todo };
    });
  }
</script>

<div style="max-width: 400px">
  <TodoList
    {todos}
    {error}
    {isLoading}
    bind:this={todoList}
    on:addtodo={handleAddTodo}
    on:removetodo={handleRemoveTodo}
    on:toggletodo={handleToggleTodo}
  />
</div>

<style>
  /* Add any styles here */
</style>
