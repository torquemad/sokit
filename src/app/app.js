import Vue from 'vue'
import $ from 'jquery' 
import emojione from 'emojione' 
import CryptoJS from 'crypto-js'
import Materialize from 'materialize-css'

new Vue({
  el: "#app",

  data: {
    ws: null,
    newMsg: '',
    chatContent: '',
    email: null,
    username: null,
    joined: false
  },

  created: () => {
    var self = this;
    this.ws = new WebSocket('ws://' + window.location.host + '/ws');
    this.ws.addEventListener('message', (e) => {
      var msg = JSON.parse(e.data)
      console.log(msg)
      this.chatContent += '<div class="chip">'
          + '<img src="' + this.gravatarURL(msg.email) + '">'
          + msg.username
        + '</div>'
        + emojione.toImage(msg.message) + '<br/>'

      let element = document.getElementById('chat-messages');
      element.scrollTop = element.scrollHeight;
    });
  },

  methods: {
    send: () => {
      if (this.newMsg != '') {
        this.ws.send(
          JSON.stringify({
            email:    this.email,
            username: this.username,
            message: $('<p>').html(this.newMsg).text()
          })
        );
        this.newMsg = '';
      }
    },

    join: () => {
     // if (!this.email) {
     //   console.log('no email');
     //   //Materialize.toast('You must enter an email', 2000)
     //   return
     // }
     // if (!this.username) {
     //   console.log('no username');
     //   //Materialize.toast('You must choose a username', 2000)
     //   return
     // }
      this.email = $('<p>').html(this.email).text();
      this.username = $('<p>').html(this.username).text();
      this.joined = true;
    },
    gravatarURL: (email) => {
      return 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(email);
    }
  }

})
