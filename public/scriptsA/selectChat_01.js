
const chatSelect = $(".chatSelect")
const customChat = $("#customChat")
const chatP = $("#chatP")
const bodyWeb = $("#bodyWeb")

var imInChats = false;

$("#appendChats").on("click",".chatSelect",function(){

    if(username){
        if(!deleteButton){
            chatAppend = $(".chatAppend")
            chatAppend.css("display","none")
            
            chat = $(this).children().eq(0).text()

            //Get Output if exist, else it creates it
                appendOutput = $("#op"+chat)

                if(appendOutput.length >= 1){
                    appendOutput.css("display","block")
                    
                } else {
                    output.append('<div id="op'+chat+'" class="chatAppend" style="display:block;"></div>')
                }
                appendOutput = $("op"+chat)

            //display output
            chatusername.css("display", "none")
            customChatCont.css("display", "none")
            bodyWeb.css("display", "block")
            selectOne.css("display", "none")

            //Change my chat on server
            socket.emit('changeChat', {usern: username, chat: chat})

            //Append chat name to Info
            chatP.text(chat)

            //Select chat
            chatSelect.attr("class", "chatSelect")
            $(this).attr("class", "chatSelect selectedC")

            //Show Keyboard
                msgInput.focus()

            //Close Nav and make sure OutPut is Ok
                changeOutHeight()
                closeNav()

            //Online, Seen
                makeMeOnline()
                getUsers()
                seen.text('')

            // Make first msg
                totalLastMSG = false;
                lastMsg = true;
                lastOtherMsg = true
        } else {
            deleteButton = false;
        }
    }

})

//Just Click "CUSTOM Button"
    customChat.click(function(){
        if(username){
            chat = undefined

            chatusername.css("display", "none")
            customChatCont.css("display", "block")
            bodyWeb.css("display", "none")
            selectOne.css("display", "none")

            //Remove other Chat
            chatAppend = $(".chatAppend")
            chatAppend.css("display","none")

            changeOutHeight()

            makeMeOffline()
            closeNav()  
            customChatInput.focus()
        }
    })
    
function changeCustomChat(){

    chat = customChatInput.val()

    //Get Output if exist, else it creates it
    
        appendOutput = $("#op"+chat)
        console.log(appendOutput.length)

        if(appendOutput.length >= 1){
            appendOutput.css("display","block")
            
        } else {
            output.append('<div id="op'+chat+'" class="chatAppend" style="display:block;"></div>')
            appendChats.append('<li class="chatSelect"> <p class="noselect">'+chat+'</p><label class="deleteChat" id="'+chat+'C"> x </label></li>')
        }
        appendOutput = $("op"+chat)

    //Show output
    chatusername.css("display", "none")
    bodyWeb.css("display", "block")
    customChatCont.css("display", "none")
    selectOne.css("display", "none")
    
    //Change Chat on server
    socket.emit('changeChat', {usern: username, chat: chat})
    
    //Change ingo
    chatP.text(chat)

    //resize
    changeOutHeight()

    // Open Key
    msgInput.focus()
    
    //Make me Online
    seen.text('')
    getUsers()

    //Save Custom Chat
    dataChatsSaved = localStorage.getItem("customChats")
    if(!dataChatsSaved){
        localStorage.setItem("customChats", JSON.stringify([chat]))
    } else {
        isInIt = false;
        dataChatsSaved = JSON.parse(dataChatsSaved)
        for(let e = 0; e < dataChatsSaved.length; e++){
            if(dataChatsSaved[e] == chat){
                isInIt = true;
                break;
            }
        }
        if(!isInIt){
            dataChatsSaved[dataChatsSaved.length] = chat
        }
        dataChatsSaved = JSON.stringify(dataChatsSaved)
        localStorage.setItem("customChats", dataChatsSaved)
    }
    console.log(JSON.parse(localStorage.getItem("customChats")))

    customChatInput.val('')

}

//Enter Custom chat
enterCustomChat.click(function(){
    changeCustomChat()
})
customChatInput.on('keyup', function (e) {
    cVal = customChatInput.val()

    if(e.keyCode === 13) {
        cVal.replace( /\s/g, '')
        changeCustomChat()
    } else {
        if(e.keyCode === 32) {
            customChatInput.val( cVal.replace( /\s/g, '') )
            $("#validP2").text('Spaces are not allowed')
        } else {
            $("#validP2").text('')
        }
    }
    console.log(e.keyCode)
});