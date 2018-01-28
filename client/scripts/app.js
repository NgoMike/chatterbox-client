var message = {
  username: this.username,
  text: this.text,
  roomname: this.roomname
};




var app = {
  server: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
 
  
  init: function () {
    setInterval(function() {
      app.fetch();
    }, 3000);
   
  },
  
  renderMessage: function(messages) {
    for (var i = 0; i < messages.length; i++) { 
      if (messages.results[i].username === undefined || messages.results[i].text.length === 0 || messages.results[i].username.length === 0 ) {
          
      } else {
        $('#chats').append('<p>' + messages.results[i].username + ':' + '<br> <br>' + messages.results[i].text + '</p>');
      }
    }
  },

  handleSubmit: function() {
  //build message to send
    var message = {
      username: $('#user').val(),
      text: $('textarea.chat').val(),
      roomname: $('#nameAroom').val()
    };

    //pass built message to send
    this.send(message);
    this.fetch();
    $('textarea.chat').val('');
  },

  send: function(message) {
    //send a message
    $.ajax({
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      dataType: 'json',
      contentType: 'application/json',
      success: function(data) {
       
      },
      failure: function(data) {
        console.log('Message not sent');
      }
    });
  },

  fetch: function () {
    $.ajax({
      url: this.server,  
      type: 'GET',
      data: 'order=-createdAt&limit=10',
      success: function (data) {
        for (var i = 0; i < data.results.length; i++) {
          var obj = data.results[i];
          app.renderMessage(obj);
        }
        
        console.log('Fetch Success', JSON.stringify(data.results));
      },
      error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('Fetch Failed', data);
      }
    });  
  },

  escapeString: function(string) {
    if (string) {
      return string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
  },
 
  clearMessages: function () {
    $('#chats').children().remove(); //this currently clears everything!
  },
  
  renderMessage: function (obj) {
    // for (var i = 0; i < messages.results.length; i++) { 
    $('#chats').prepend('<div><p class=username >' + app.escapeString(obj.username) +'</p>'+ '</br>'+'<p id=messages>' + app.escapeString(obj.text) + '</p></div>');
  },
  
  
  renderRoom: function() {
    var nameValue = $('#nameAroom').val();
    $('#roomSelect').prepend('<option "value=room">' + nameValue + '</option>');
  },
  
  
  handleUsernameClick: function() {
    var name = $('#user').val();
    console.log(name);
    $('#names').append('<li class="liNames" value="user">' + name + '</li>');
  },

  createMessage: function() {
    var msg = $('.chat').html($('textarea:text')).val();
    console.log(msg);
    $('#chats').prepend('<p class="message">' + msg + '</p>');
  },

  addFriend: function(data) {
    var frienNameValue = $('.username').val();
    $('.FriendList').append('<div class=friends>' + frienNameValue + '</div>');
  }


};
 
  

$(document).ready(function() {
  
  app.init();
  // $(document).on('click', '#send-message', app.handleSubmit);
 
  $('#main').find('#names').trigger('click', 'li.liNames', function() {
    console.log('click');
  });

  $(document).on('click', '.username', function(e) {
    e.preventDefault();
    app.addFriend();
  });

  $(document).on('click', '#CreateRoom', function(e) {
    e.preventDefault();
    app.renderRoom();
  });
  $(document).on('click', '.createUser', function(e) {
    e.preventDefault();
    app.handleUsernameClick();
  });

  $(document).on('click', '#send-message', function(e) {
    e.preventDefault();
    app.handleSubmit();
  });
});
  
