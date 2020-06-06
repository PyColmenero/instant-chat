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

var lastMsg = true;
var lastOtherMsg = true;

var totalLastMSG = false;


msgInput.click(function(){
    setTimeout(function(){
        appendOutputDOM = appendOutput.get()
        appendOutputDOM.scrollTop = appendOutputDOM.scrollHeight;
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

    if(msg && msg.length >= 1){
        socket.emit('chatMsg', {    username: username,
                                    message: msg,
                                    chat: chat})

        msgInput.val("")

        //append red MSG
        classOwn = lastMsg ? "firstM" : ""
        appendOutput.append('<div class="ownMSGOnload noselect"><div class="msgOnLoad '+classOwn+'"> <p>'+msg+'</p> <div class="otherLikeOwn noselect" style="display: none;" >0</div><div class="myLikeOwn noselect" data-status="no" style="display: none;" >0</div> </div></div>')
            
        //Scroll
            appendOutput.scrollTop(appendOutput.prop("scrollHeight"));

            seen.text('')
    }
}

output.click(function(){
    msgInput.focus()
})


//Get Message
socket.on('newMessage', function(data){
    if(username && chat == data.msgCont.chat){

        appendOutput = $("#op"+chat)
        
        classOwn = lastMsg ? "firstM" : ""
        classOther = lastOtherMsg ? "firstOM" : ""
        seenUSersInChat = []

        if(data.msgCont.username == username){
            appendOutput.append('<div data-id="'+data.msgID+'" class="ownMSG"><div data-users="" class="msg '+classOwn+'"> <label class="noselect"><label></label> <label class="textMSG">'+data.msgCont.message+'</label></label> <div class="otherLikeOwn noselect" style="display: none;" >0</div><div class="myLikeOwn noselect" data-status="no" style="display: none;" >0</div> </div></div>')
            lastMsg = false;
            lastOtherMsg = true;
            totalLastMSG = true;
            
            everyOnLoadMsg = $(".ownMSGOnload")
            everyOnLoadMsg.remove();

        } else {
            appendOutput.append('<div data-id="'+data.msgID+'" class="otherMSG"><div data-users="" class="msg '+classOther+'"><label class="noselect"><label><b>'+data.msgCont.username+':</b> </label>  <label class="textMSG">'+data.msgCont.message+'</label></label><div class="otherLikeOther noselect" style="display: none;" >0</div><div class="myLikeOther noselect" data-status="no" style="display: none;" ></div></div></div>')
            lastMsg = true;
            lastOtherMsg = false;
            totalLastMSG = false
        }

        
        appendOutput.scrollTop(appendOutput.prop("scrollHeight"));


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

        
    }
})

