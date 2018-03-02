'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function(){
    
  const addItem = function(item) {//item is an object
    this.items.push(item);
  };

  const findById = function(id) {//find item from items[] using the given id
    return this.items.find(item => item.id === id);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  const searchByRating = function(num) {
    //
  };


  return {
    items: [],//array of ojects
    isAdding: false,
    minimumRating: 1,
    addItem,
    findById,
    findAndDelete,
    searchByRating
  };

}());