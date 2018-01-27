var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};


var app = {
  
  init: function () {
    
  },

  send: function (message) {
    $.ajax({
      url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',  
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

  fetch: function (message) {
    $.ajax({
      url: undefined,  
      type: 'GET',
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
  
  clearMessages: function () {
    $('#chats').children().remove(); //this currently clears everything!
  },
  
  renderMessage: function (message) {
    // var $div = document.createElement('div');
    $('#chats').prepend('<span>' + message + '</span>');
  },
  
  handleSubmit: function () {
    $('#CreateRoom').on('click', function() {
      this.renderRoom();
    });
  },
  
  renderRoom: function(message) {
    var nameValue = $('.nameAroom').val();
    $('#roomSelect').prepend('<option>' + nameValue + '</option>');
  }



};

