<script>
  import { onMount, tick } from 'svelte';
  import { v4 as uuid } from 'uuid';
  import TodoList from './lib/TodoList.svelte';

  let todoList;
  let todos = null;
  let isLoading = false;
  let isAdding = false;
  let error = null;
  let disabledItems = [];

  onMount(() => {
    loadTodos();
  });

  async function loadTodos() {
    isLoading = true;
    await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(async (response) => {
        if (response.ok) {
          todos = await response.json();
        } else {
          error = 'An error has occurred';
        }
      })
      .catch((err) => {
        error = 'Failed to load todos.';
      });
    isLoading = false;
  }

  async function handleAddTodo(e) {
    isAdding = true;
    e.preventDefault();
    await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({
        title: e.detail.title,
        completed: false
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(async (res) => {
      if (res.ok) {
        const todo = await res.json();
        todos = [...todos, { ...todo, id: uuid() }];

        todoList.clearInput();
      } else {
        alert('Some error has occurred');
      }
    });
    isAdding = false;
    await tick();
    todoList.focusInput();
  }

  async function handleRemoveTodo(e) {
    const id = e.detail.id;
    if (disabledItems.includes(id)) return;
    disabledItems = [...disabledItems, id];
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE'
    }).then((res) => {
      if (res.ok) {
        todos = todos.filter((t) => t.id !== e.detail.id);
      } else {
        alert('Some error has occurred');
      }
    });
    disabledItems = disabledItems.filter((itemId) => itemId !== id);
  }

  async function handleToggleTodo(e) {
    const id = e.detail.id;
    const value = e.detail.value;
    if (disabledItems.includes(id)) return;
    disabledItems = [...disabledItems, id];
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        completed: value
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(async (res) => {
      if (res.ok) {
        const updateTodo = await res.json();
        todos = todos.map((todo) => {
          if (todo.id === id) {
            return updateTodo;
          }
          return { ...todo };
        });
      } else {
        alert('Some error has occurred');
      }

      disabledItems = disabledItems.filter((itemId) => itemId !== id);
    });
  }
</script>

<div style="max-width: 400px">
  <TodoList
    {todos}
    {error}
    {isLoading}
    {disabledItems}
    disableAdding={isAdding}
    bind:this={todoList}
    on:addtodo={handleAddTodo}
    on:removetodo={handleRemoveTodo}
    on:toggletodo={handleToggleTodo}
    let:todo
  ></TodoList>
</div>

<style>
  /* Add any styles here */
</style>
