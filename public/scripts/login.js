const enterChat = $("#enterChat")
const usernameInput   = $("#usernameInput")
const validP1 = $("#validP1")

const currentUsernameP = $("#currentUsernameP")

const enterCustomChat = $("#enterCustomChat")
const customChatInput = $("#customChatInput")

const chatusername = $("#chat-username")
const contchat = $("#cont-chat")

var username = undefined

// Click Enter username
enterChat.click(function(){

    username = usernameInput.val()
    socket.emit('validateUsername', username)

})

//Validate If its not Taken
socket.on('confirmUsernameValidation', function(data){

    if(data === "ok"){
        chatusername.css("display", "none")
        selectOne.css("display", "flex")
        currentUsernameP.text(username)

        openNav()
        
    } else {
        validP1.text(data)
    }
    
})


