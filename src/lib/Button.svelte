<script>
  export let size = 'small';
  export let shadow = true;
  export let textColor = undefined;
  export let bgColor = undefined;
</script>

<button style:--buttonBgColor={bgColor} 
style:--buttonTextColor={textColor} 
class:size-lg={size === 'large'}
class:size-sm={size === 'small'}
class:shadow={shadow}>
  <slot>Fallback</slot>
</button>

<style lang="scss">

  button {
    border: none;
    background-color: var(--buttonBgColor);
    color: var(--buttonTextColor);
    padding: 15px 20px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    &:hover{
      background-image: linear-gradient(rgba(0,0,0,0.4) 0 0);
    }
    &:active{
      background-image: linear-gradient(rgba(255,255,255,0.1) 0 0);
    }
    &.size-sm{
      padding: 15px 20px;
    }
    &.size-lg{
      padding: 20px 25px;
      font-size: 20px;
    }
    &.shadow{
      box-shadow: 0 0 10px rgba(1,1,1,0.9);
    }
  
  }
</style>



<!-- &:hover {
  background-color: #fff;
  color:  variables.$color;
} -->