var message = {
  username: this.username,
  text: this.text,
  roomname: this.roomname
};


var app = {
  server: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
 
  
  init: function () {
    setInterval(function() {
      this.fetch();
    });
   
  },
  
  // renderMessage: function(messages) {
  //   for (var i = 0; i < messages.length; i++) { 
  //     if (messages.results[i].username === undefined || messages.results[i].text.length === 0 || messages.results[i].username.length === 0 ) {
          
  //     } else {
  //       $('#chats').append('<p>' + messages.results[i].username + ':' + '<br> <br>' + messages.results[i].text + '</p>');
  //     }
  //   }
  // },

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
      data: 'order=-createdAt&limit=100',
      success: function (data) {
        app.renderMessage(data);
        console.log('Fetch Success', data.results);
      },
      error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('Fetch Failed', data);
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
  
  
  handleUser: function () {
    $('.createUser').click(function() {
      app.renderUser();
    }); 
  },
  
  renderUser: function() {
    var nameValue = $('#user').val();
    $('#names').append('<li "value=user">' + nameValue + '</li>');
  }
};
 



  
