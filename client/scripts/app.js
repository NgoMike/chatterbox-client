var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};


var app = {
  
  constructor: function() {
    this.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';
  },
  
  init: function () {
    
  },

  send: function (message) {
    $.ajax({
      url: this.server,  
      type: 'POST',
      data: message,
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });  
  },

  fetch: function () {

    $.ajax({
      url: this.server,  
      type: 'GET',
      data: message,
      contentType: 'json',
      success: function (data) {
        console.log('chatterbox: Message sent', data);
      },
      error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });  
  },
  
  clearMessages: function () {
    $('#chats').children().remove(); //this currently clears everything!
  },
  
  renderMessage: function (message) {
    // var $div = document.createElement('div');
    $('#chats').prepend('<span>' + message + '</span>');
  },
  
  handleSubmit: function (e) {
    $('#CreateRoom').click(function(e) {
      app.renderRoom();
    }); 
  }, 
  
  renderRoom: function() {
    var nameValue = $('#nameAroom').val();
    $('#roomSelect').prepend('<option "value=room">' + nameValue + '</option>');
  },
  
  
  handleUser: function (e) {
    $('.createUser').click(function(e) {
      app.renderUser();
    }); 
  },
  
  renderUser: function() {
    var nameValue = $('#user').val();
    $('#names').append('<li "value=user">' + nameValue + '</li>');
  }
 

};

// $(document).ready(function(handleUser, handleSubmit);
  
