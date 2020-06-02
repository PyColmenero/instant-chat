
const chatSelect = $(".chatSelect")
const customChat = $("#customChat")
const chatP = $("#chatP")
const selectOne = $("#selectOne")

chatSelect.click(function(){

    if(username){
        chat = $(this).children().eq(0).text()

        output.html('')

        chatusername.css("display", "none")
        contchat.css("display", "block")
        customChatCont.css("display", "none")
        selectOne.css("display", "none")
        
        socket.emit('changeChat', {usern: username, chat: chat})

        chatP.text(chat)


        closeNav()
    }

})

customChat.click(function(){
    if(username){
        chatusername.css("display", "none")
        contchat.css("display", "none")
        customChatCont.css("display", "block")
        selectOne.css("display", "none")
        closeNav()
    }
})

enterCustomChat.click(function(){

    output.html('')

    chatusername.css("display", "none")
    contchat.css("display", "block")
    customChatCont.css("display", "none")
    selectOne.css("display", "none")
    
    chat = customChatInput.val()
    
    socket.emit('changeChat', {usern: username, chat: chat})

    chatP.text(chat)


})