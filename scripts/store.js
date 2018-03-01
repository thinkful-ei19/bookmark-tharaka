'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function(){
    
  const addItem = function(item) {
    this.items.push(item);
  };


  return {
    items: [],
    addItem
  };

}());