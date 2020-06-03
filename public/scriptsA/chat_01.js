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




msgInput.click(function(){
    elem = document.getElementById('output');
    elem.scrollTop = elem.scrollHeight;
})
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
    if(username && chat == data.msgCont.chat){

        classOwn = lastMsg ? "firstM" : ""
        classOther = lastOtherMsg ? "firstOM" : ""

        if(data.msgCont.username == username){
            output.append('<div data-id="'+data.msgID+'" class="ownMSG noselect"><div data-users="" class="msg '+classOwn+'"> <p>'+data.msgCont.message+'</p> <div class="otherLikeOwn" style="display: none;" >0</div><div class="myLikeOwn" data-status="no" style="display: none;" >0</div> </div></div>')
            lastMsg = false;
            lastOtherMsg = true;
        } else {
            output.append('<div data-id="'+data.msgID+'" class="otherMSG noselect"><div data-users="" class="msg '+classOther+'"><label><label><b>'+data.msgCont.username+':</b> </label>  <label>'+data.msgCont.message+'</label></label><div class="otherLikeOther" style="display: none;" >0</div><div class="myLikeOther" data-status="no" style="display: none;" ></div></div></div>')
            lastMsg = true;
            lastOtherMsg = false;
        }

        elem = document.getElementById('output');
        elem.scrollTop = elem.scrollHeight;


        for(let e = 0; e < everyTypings.length; e++){
            try{
                if(everyTypings[e].user == data.msgCont.username){

                    everyTypings[e] = undefined
                    
                }
            } catch(e) {}
    
        }
        proveTypings()
        msg = $(".msg")
    }
})

