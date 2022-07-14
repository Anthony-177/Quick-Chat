<template>
  <div class="view login" v-if="state.username === '' || state.username === null">
    <form class="login-form" @submit.prevent="Login">
      <div class="form-inner">
        <h1>Login to quickChat</h1>
        <label for="username">Username</label>
        <input 
          type="text" 
          v-model="inputUsername" 
          placeholder="Please enter your username..." />
        <input 
          type="submit" 
          value="Login" />
      </div>
    </form>
  </div>
  
  <div class="view chat" v-else>
    <header>
      <button class="logout" @click="Logout">Logout</button>
      <h1>Welcome, {{ state.username }}</h1>
    </header>
    
    <section class="chat-box">
      <div 
        v-for="message in state.messages" 
        :key="message.key" 
        :class="(message.username == state.username ? 'message current-user' : 'message')">
        <div class="message-inner">
          <div class="username">{{ message.username }}</div>
          <div class="content">{{ message.content }}</div>
        </div>
      </div>
    </section>

    <footer>
      <form @submit.prevent="SendMessage">
        <input 
          type="text" 
          v-model="inputMessage" 
          placeholder="Write a message..." />
        <input 
          type="submit" 
          value="Send" />
      </form>
    </footer>
  </div>
</template>

<script>
 
 import { db } from '@/index'
 import { ref, onValue, push, set } from  "firebase/database"
export default {
  data () {
	return {
    inputUsername: '',
	inputMessage: '',
	state: {
        username: '',
		messages: []
	}
	}
  },
  methods: {
    Login() {
      if (this.inputUsername != "" || this.inputUsername != null) {
        this.state.username = this.inputUsername;
        this.inputUsername = "";
      }
    },
    Logout(){
      this.state.username = "";
    },
    SendMessage() {
      const messagesRef = ref(db, 'messages')
      if(this.inputMessage === "" || this.inputMessage === null) {
        return;
      }

      const message = push(messagesRef)
      set(message,{
        username: this.state.username,
        content: this.inputMessage
      } )
      this.inputMessage = "";
    }
 
  },
  mounted() {
      const messagesRef = ref(db, "messages");

      onValue(messagesRef, snapshot => {
        console.log(snapshot)
        const data = snapshot.val();
        let messages = [];

        Object.keys(data).forEach(key => {
          messages.push({
            id: key,
            username: data[key].username,
            content: data[key].content
          });
        });

        this.state.messages = messages;
      })
	}
}
</script>


<style>
* {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	margin: 0;
	padding: 0;
	box-sizing: border-box;
} 
.view {
	display: flex;
	justify-content: center;
	min-height: 100vh;
	background-color: #414743;
}
.login {align-items: center;}
		.login-form {
			display: block;
			width: 100%;
			padding: 15px;}
			
			.form-inner {
				display: block;
				background-color: rgb(155, 37, 37);
				padding: 50px 15px;
				border-radius: 16px;
				box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);}
				h1 {
					color: rgb(242, 244, 247);
					font-size: 28px;
					margin-bottom: 30px;
				}
				label {
					display: block;
					margin-bottom: 5px;
					color: #AAA;
					font-size: 16px;
					transition: 0.4s;
				}
				input[type="text"] {
					appearance: none;
					border: none;
					outline: none;
					background: none;
					display: block;
					width: 100%;
					padding: 10px 15px;
					border-radius: 8px;
					margin-bottom: 15px;
					
					color: #333;
					font-size: 18px;
					box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
					background-color: #F3F3F3;
					transition: 0.4s;}
					::placeholder {
						color: #888;
						transition: 0.4s;
					}
				input[type="submit"] {
					appearance: none;
					border: none;
					outline: none;
					background: none;
					display: block;
					width: 100%;
					padding: 10px 15px;
					background-color: #271115;
					border-radius: 8px;
					color: #FFF;
					font-size: 18px;
					font-weight: 700;
				}
				:focus-within .label {
						color: #aa5b69;
					}
					input[type="text"] {
						background-color: #FFF;
						box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);}
						::placeholder {
							color: #666;
						}
		.chat {
		flex-direction: column;}
		header {
			position: relative;
			display: block;
			width: 100%;
			padding: 50px 30px 10px;}
			.logout {
				position: absolute;
				top: 15px;
				right: 15px;
				appearance: none;
				border: none;
				outline: none;
				background: none;
				
				color: #FFF;
				font-size: 18px;
				margin-bottom: 10px;
				text-align: right;
			}
			h1 {
				color: #FFF;
			}

		.chat-box {
			border-radius: 24px 24px 0px 0px;
			background-color: #FFF;
			box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
			flex: 1 1 100%;
			padding: 30px;}
			.message {
				display: flex;
				margin-bottom: 15px;}
				
				.message-inner.username {
						color: rgb(70, 50, 50);
						font-size: 16px;
						margin-bottom: 5px;
						padding-left: 15px;
						padding-right: 15px;
					}
					.content {
						display: inline-block;
						padding: 10px 20px;
						background-color: #440505;
						border-radius: 999px;
						color: #333;
						font-size: 18px;
						line-height: 1.2em;
						text-align: left;
					}
.current-user {
					margin-top: 30px;
					justify-content: flex-end;
					text-align: right;}
					.message-inner {
						max-width: 75%;}
						.content {
							color: #FFF;
							font-weight: 600;
							background-color: #500e0e;
						}

		footer {
			position: sticky;
			bottom: 0px;
			background-color: #FFF;
			padding: 30px;
			box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);}
			form {
				display: flex;}
				input[type="text"] {
					flex: 1 1 100%;
					appearance: none;
					border: none;
					outline: none;
					background: none;
					display: block;
					width: 100%;
					padding: 10px 15px;
					border-radius: 8px 0px 0px 8px;
					
					color: #333;
					font-size: 18px;
					box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
					background-color: #F3F3F3;
					transition: 0.4s;}
					::placeholder {
						color: #888;
						transition: 0.4s;
					}
				
				
				input[type="submit"] {
					appearance: none;
					width: 200px;
					height:40px;
					border: none;
					outline: none;
					background: none;
					display: block;
					padding: 10px 15px;
					border-radius: 0px 8px 8px 0px;
					background-color: #0a0909;
					color: #FFF;
					font-size: 18px;
					font-weight: 700;
				}
</style>