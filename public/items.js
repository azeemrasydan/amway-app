var item_state = [
    {
      title:"New Phone",
      num:0,
    },
    {
      title:"Toilet Paper",
      num:0,
    },
    {
      title:"Grocer Package",
      num:0
  
    }
  ]
  
  function ItemUpdate(){
    //update the item UI with the item_state info
  }
  
  function ItemStatusAdd(item_index){
    var item_state = parseInt(document.getElementById('new-phone').value);
    item_state = isNaN(item_state) ? 0 : item_state;
    item_state++;
    document.getElementById('new-phone').value = item_state
    //add 1 to the num of item_state, and update the UI
  }
  
  function ItemStatusRemove(item_index){
    var item_state = parseInt(document.getElementById('new-phone').value);
    item_state = isNaN(item_state) ? 0 : item_state;
    item_state--;
    document.getElementById('new-phone').value = item_state
    //subtract 1 to the num of item_state, and update the UI
  }