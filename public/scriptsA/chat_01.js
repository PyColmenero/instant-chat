console.log("Chat Inicializating...")

const socket = io('')

// DOM Elemments
const msgInput          = $("#msgInput")
const send              = $("#send")
const everyUser         = $("#everyUser")
const customChatCont   = $("#customChatCont")

const online = $("#online")
const seen = $("#seen")

typings = new Array()
typings = []

var chat = undefined

var lastMsg = true;
var lastOtherMsg = true;

var totalLastMSG = false;


msgInput.click(function(){
    setTimeout(function(){
        elem = document.getElementById('output');
        elem.scrollTop = elem.scrollHeight;
    },200)
})
send.click(function(){
    sendMSG()
})


msgInput.on('keyup', function (e) {
    if (e.keyCode === 13) {
        sendMSG()
    }
    msgInput.focus()
});

function sendMSG(){
    msgInput.focus()
    msg = msgInput.val()

    elem = document.getElementById('output');
    elem.scrollTop = elem.scrollHeight;

    if(msg && msg.length >= 1){
        socket.emit('chatMsg', {    username: username,
                                    message: msg,
                                    chat: chat})
        msgInput.val("")
        console.log("append")
        classOwn = lastMsg ? "firstM" : ""
        output.append('<div class="ownMSGOnload noselect"><div class="msgOnLoad '+classOwn+'"> <p>'+msg+'</p> <div class="otherLikeOwn" style="display: none;" >0</div><div class="myLikeOwn" data-status="no" style="display: none;" >0</div> </div></div>')
    }
    
    
}

output.click(function(){
    msgInput.focus()
})


//Get Message
socket.on('newMessage', function(data){
    if(username && chat == data.msgCont.chat){

        classOwn = lastMsg ? "firstM" : ""
        classOther = lastOtherMsg ? "firstOM" : ""
        seenUSersInChat = []

        if(data.msgCont.username == username){
            output.append('<div data-id="'+data.msgID+'" class="ownMSG noselect"><div class="msg '+classOwn+'"> <p>'+data.msgCont.message+'</p> <div class="otherLikeOwn" style="display: none;" >0</div><div class="myLikeOwn" data-status="no" style="display: none;" >0</div> </div></div>')
            lastMsg = false;
            lastOtherMsg = true;
            totalLastMSG = true;
            
            everyOnLoadMsg = $(".ownMSGOnload")
            everyOnLoadMsg.remove();

        } else {
            output.append('<div data-id="'+data.msgID+'" class="otherMSG noselect"><div class="msg '+classOther+'"><label><label><b>'+data.msgCont.username+':</b> </label>  <label>'+data.msgCont.message+'</label></label><div class="otherLikeOther" style="display: none;" >0</div><div class="myLikeOther" data-status="no" style="display: none;" ></div></div></div>')
            lastMsg = true;
            lastOtherMsg = false;
            totalLastMSG = false

            seen.text('')
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

        seenUSersInChat = []
        proveTypings()
        getUsers()

        seen.text('')
    }
})

