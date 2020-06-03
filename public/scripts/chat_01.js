console.log("Chat Inicializating...")

const socket = io('')

// DOM Elemments
const msgInput          = $("#msgInput")
const send              = $("#send")
const everyUser         = $("#everyUser")
const customChatCont   = $("#customChatCont")

typings = new Array()
typings = []

var chat = undefined

var lastMsg = true;
var lastOtherMsg = true;

send.click(function(){
    sendMSG()
})

msgInput.on('keyup', function (e) {
    if (e.keyCode === 13) {
        sendMSG()
    }
});

function sendMSG(){
    msg = msgInput.val()
    
    if(msg && msg.length >= 1){
        socket.emit('chatMsg', {    username: username,
                                    message: msg,
                                    chat: chat})
        msgInput.val("")
    }
    
    
}




//Get Message
socket.on('newMessage', function(data){
    if(username && chat == data.chat){

        classOwn = lastMsg ? "firstM" : ""
        classOther = lastOtherMsg ? "firstOM" : ""

        if(data.username == username){
            output.append('<div class="ownMSG"><div class="'+classOwn+'"> <p>'+data.message+'</p> </div></div>')
            lastMsg = false;
            lastOtherMsg = true;
        } else {
            output.append('<div class="otherMSG"><div class="'+classOther+'"><label>'+data.username+': </label>  <label>'+data.message+'</label></div></div>')
            lastMsg = true;
            lastOtherMsg = false;
        }
        var elem = document.getElementById('output');
        elem.scrollTop = elem.scrollHeight;

        for(let e = 0; e < everyTypings.length; e++){
            try{
                if(everyTypings[e].user == data.username){

                    everyTypings[e] = undefined
                    
                }
            } catch(e) {}
    
        }
        proveTypings()
    }
})

