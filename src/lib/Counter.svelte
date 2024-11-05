<script>
  let count1 = 0;
  let count2 = 0;

  function getTotal(x,y){
    return x + y;

  }

  function increment1 () {
     count1++;
  }
  function increment2 () {
     count2++;
  }

  $: string =  `total count ${getTotal(count1, count2)}`;
  $: if(count2 > 5){
 console.log(count2)
  }
</script>

<h1>{string}</h1>

<button on:click={increment1}>Click {count1}</button>
<button on:click={increment2}>Click {count2}</button>

<style>
  button {
    padding: 15px;
  }
</style>