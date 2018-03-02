'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function(){
    
  const addItem = function(item) {
    this.items.push(item);
  };

  const findById = function(id) {//find item from items[] using the given id
    return this.items.find(item => item.id === id);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  return {
    items: [],
    addItem,
    findById,
    findAndDelete
  };

}());