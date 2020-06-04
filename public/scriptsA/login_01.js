const enterChat = $("#enterChat")
const validP1 = $("#validP1")

const currentUsernameP = $("#currentUsernameP")

const enterCustomChat = $("#enterCustomChat")
const customChatInput = $("#customChatInput")

const chatusername = $("#chat-username")
const contchat = $("#cont-chat")
const selectOne = $("#selectOne")



// Click Enter username
enterChat.click(function(e){

    e.preventDefault()

    tryLogging()

})
usernameInput.on('keyup', function (e) {
    if (e.keyCode === 13) {
        tryLogging()
    }
});

function tryLogging(){
    username = usernameInput.val()

    if(username){
        if(username.length > 3 && username.length < 36){
            socket.emit('validateUsername', username)
            localStorage.setItem("username", username)
        } else {
            validP1.text("More than 3 and less than 36 length")
        }
    } else {
        validP1.text("Write something...")
    }
}


//Validate If its not Taken
socket.on('confirmUsernameValidation', function(data){

    if(data === "ok"){
        chatusername.css("display", "none")
        selectOne.css("display", "flex")
        currentUsernameP.text(username)

        openNav()

        imInChats = false;
        
    } else {
        validP1.text(data)
    }
    
})


