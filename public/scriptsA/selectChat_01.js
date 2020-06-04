
const chatSelect = $(".chatSelect")
const customChat = $("#customChat")
const chatP = $("#chatP")
const bodyWeb = $("#bodyWeb")



var imInChats = false;

chatSelect.click(function(){

    if(username){
        chat = $(this).children().eq(0).text()

        output.html('')

        chatusername.css("display", "none")
        customChatCont.css("display", "none")
        bodyWeb.css("display", "block")
        selectOne.css("display", "none")
        
        socket.emit('changeChat', {usern: username, chat: chat})

        chatP.text(chat)

        chatSelect.attr("class", "chatSelect")
        $(this).attr("class", "chatSelect selectedC")

        msgInput.focus()

        changeOutHeight()
        closeNav()
        
        makeMeOnline()
        seen.text('')
        getUsers()
    }

})

customChat.click(function(){
    if(username){

        chat = undefined

        chatusername.css("display", "none")
        customChatCont.css("display", "block")
        bodyWeb.css("display", "none")
        selectOne.css("display", "none")

        changeOutHeight()

        makeMeOffline()
        closeNav()        
        seen.text(currentSTR)
    }
})

enterCustomChat.click(function(){

    output.html('')

    chatusername.css("display", "none")
    bodyWeb.css("display", "block")
    customChatCont.css("display", "none")
    selectOne.css("display", "none")
    
    chat = customChatInput.val()
    
    socket.emit('changeChat', {usern: username, chat: chat})
    
    chatP.text(chat)

    changeOutHeight()

    makeMeOnline()
    seen.text(currentSTR)
    getUsers()
    
})