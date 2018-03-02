'use strict';
/* global bookmark, store, api, $*/

$(document).ready(function() {
  bookmark.bindEventListeners();
  bookmark.render();

  api.getItems((items) => {
    
    items.forEach((item) => store.addItem(item));

    bookmark.render();
  });

});