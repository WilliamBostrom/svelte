<script >

  import TodoList from "./lib/TodoList.svelte"
  import { v4 as uuid } from "uuid"
  
  let todos = [
    {
      id: uuid(),
      title: "Todo 1",
      completed: true
    },
    {
      id: uuid(),
      title: "Todo 2",
      completed: true
    },
    {
      id: uuid(),
      title: "Todo 3",
      completed: true
    },
  ]

  function handleAddTodo(e){
    // e.preventDefault();
    todos = [...todos, {
      id: uuid(),
      title: e.detail.title,
      completed: false,
    }];
  }

  function handleRemoveTodo(event){
    todos = todos.filter(t => t.id !== event.detail.id )
  }

</script>

<TodoList {todos} 
on:addtodo={handleAddTodo}
on:removetodo={handleRemoveTodo}
/>



<style>

</style>