'use strict';
/* global store, api, $*/

// eslint-disable-next-line no-unused-vars
const bookmark = (function(){

  function generateBookmarkForm() {
    
    return `
    <h1>Create Bookmark:</h1>
    <form id="js-bookmarks-form">
            <input type="text" name="title-entry" class="js-bookmark-title-entry" placeholder="title">        
            <input type="text" name="url-entry" class="js-bookmark-url-entry" placeholder="url">
            <input type="text" name="desc-entry" class="js-bookmark-desc-entry" placeholder="desc">

            <input type="radio" name="option" id="five" value=5 /> 5 Stars
            <input type="radio" name="option" id="four" value=4 /> 4 Stars
            <input type="radio" name="option" id="three" value=3 /> 3 Stars
            <input type="radio" name="option" id="two" value=2 /> 2 Stars
            <input type="radio" name="option" id="one" value=1 /> 1 Star

            <button type="submit">Create</button>
            <button id='cancel-add-form' type="button">Cancel</button>
        
    </form>`;
  }


  function genereateBookmarkItem(items) {

    let link = '';
    let desc = '';

    if(items.expandBookmark === true) {
     
      link = items.url;
      desc = items.desc;
    }
    

    return `<li class="bookmark-item" data-item-id="${items.id}">
        <header>
            <span class="header-text">${items.title}</span>
        </header>
        <div <p class="ratings">${items.rating}</p> <div>
        <article>
            <p class="description">${desc}</p>
            <p class='linkBookmark'>${link}</p>
        </article>
        <button class="bookmark-item-delete js-item-delete">
          <span class="button-label">delete</span>
        </button>
      </li>`;

  }

  function generateBookmarkItemsString(bookmarkList){
    const items = bookmarkList.map((item) => genereateBookmarkItem(item));
    return items.join('');
  }


  function render() {
    let items = store.items;

    if(store.isAdding) {
     
      const html = generateBookmarkForm();
      $('.bookmark-form').html(html);

    } else {
      $('.bookmark-form').empty();
    }

    if(store.minimumRating > 1) {
      items = items.filter(item => item.rating >= store.minimumRating);
    }

    const bookmarkItemString = generateBookmarkItemsString(items);
    $('.bookmark-list').html(bookmarkItemString);

  }


  function handleShowBookmarkForm() {
    $('#addBookmarkForm').submit(function (event) {
      event.preventDefault();
      store.isAdding = true;
      render();
    });
  }


  function handleCancelBookmarkForm() {
    $('.bookmark-form').on('click', '#cancel-add-form', function (event) {
      event.preventDefault();
      store.isAdding = false;
      render();
    });
  }


  function handleCreateSBookmark() {
    
    $('.bookmark-form').on('submit', '#js-bookmarks-form', function (event) {
   
      event.preventDefault();
      const bookmarkTitle = $('.js-bookmark-title-entry').val();
      const bookmarkUrl = $('.js-bookmark-url-entry').val();
      const bookmarkDesc = $('.js-bookmark-desc-entry').val();

      const bookmarkRate = $('input[type=\'radio\'][name=\'option\']:checked').val();
      
      $('.js-bookmark-title-entry').val();
      $('js-bookmark-url-entry').val();
      $('js-bookmark-desc-entry').val();

      const formObj = {
        title: bookmarkTitle, 
        url: bookmarkUrl,
        desc: bookmarkDesc,
        rating: parseInt(bookmarkRate),
        //expandBookmark: false
      };

      api.createItem(formObj, (itemFromServer) => {

        itemFromServer.expandBookmark = false;
        store.addItem(itemFromServer);
    
        render();
      });
      
    });
  }

  function getItemIdFromElement(item) {

    return $(item)
      .closest('.bookmark-item')
      .data('item-id');
  }

  function handleDeleteItemClicked() {
    $('.js-bookmark-list').on('click', '.js-item-delete', event => {
  
      const id = getItemIdFromElement(event.currentTarget);

      api.deleteItem(id, () => {
        store.findAndDelete(id);
        render();
      });
    });
  }

  function handleBookmarkExpand() {
    $('.js-bookmark-list').on('click', '.bookmark-item', event => {
      
      const id = getItemIdFromElement(event.currentTarget);

      store.toggleExpand(id);
      render();
    });
  }

  function handleRatingChange() {
    $('#js-rating-filter').on('change', function(event){
      let rating = $(event.target).find('option:selected').val();
      store.minimumRating = rating;
      render();
    });
  }


  function bindEventListeners() {
    handleCreateSBookmark();
    handleShowBookmarkForm();
    handleCancelBookmarkForm();
    handleDeleteItemClicked();
    handleRatingChange();
    handleBookmarkExpand();
  }

  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());