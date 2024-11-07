<script >

  import TodoList from "./lib/TodoList.svelte"
  import { v4 as uuid } from "uuid"
import {tick} from "svelte";

  
  let todoList;

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

  async function handleAddTodo(e){
    e.preventDefault();
 
    setTimeout(() => {
      todos = [...todos, {
      id: uuid(),
      title: e.detail.title,
      completed: false,
    }];
    }, 300)
    await tick()
   todoList.clearInput()
  }

  function handleRemoveTodo(event){
    todos = todos.filter(t => t.id !== event.detail.id )
  }
  function handleToggleTodo(event){
    todos = todos.map(todo => {
   if(todo.id === event.detail.id){
      return {...todo, completed: event.detail.value};
   }
   return {...todo};
  
  })
  }

</script>

<div style:max-width="400px">
<TodoList {todos} 
bind:this={todoList}
on:addtodo={handleAddTodo}
on:removetodo={handleRemoveTodo}
on:toggletodo={handleToggleTodo}
/>
</div>


<style>

</style>