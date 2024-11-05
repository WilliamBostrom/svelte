<script>
  export let initialCount;
  export let maxCount;

  let count = initialCount;

  console.log($$props )
  function increment() {
    if(count === maxCount) return;
    count += 1;
    
  }

</script>

<button on:click={increment}>Click {count}</button>

<style>
  button {
    padding: 15px;
  }
</style>
