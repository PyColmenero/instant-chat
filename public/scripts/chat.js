console.log("Chat Inicializating...")

const socket = io('')

// DOM Elemments
const msgInput          = $("#msgInput")
const send              = $("#send")
const output             = $("#output")
const actions           = $("#actions")
const everyUser         = $("#everyUser")
const customChatCont   = $("#customChatCont")

typings = new Array()
typings = []

var chat = undefined

send.click(function(){
    sendMSG()
})

msgInput.on('keyup', function (e) {
    if (e.keyCode === 13) {
        sendMSG()
    }
});

function sendMSG(){
    socket.emit('chatMsg', {
        username: username,
        message: msgInput.val(),
        chat: chat
    })
    msgInput.val("")
}

msgInput.on('keypress', function(){
    //socket.emit('chatTyping', usernameInput.val())
})

//Get Message
socket.on('newMessage', function(data){
    if(username && chat == data.chat){
        console.log(data.username)
        if(data.username == username){
            output.append('<div class="ownMSG"><div> <p>'+data.message+'</p> </div></div>')
        } else {
            output.append('<div class="otherMSG"><div><label>'+data.username+': </label>  <label>'+data.message+'</label></div></div>')
        }

        
    }
})

// WIP
// socket.on('userTyping', function(user){
//     //actions.text(user+" is typing...")
//     isInIt = false;
//     isInIt = isInArray(typings, user)

//     if(isInIt){
//         typings.push(user)
//         console.log(typings)
//     }

// })