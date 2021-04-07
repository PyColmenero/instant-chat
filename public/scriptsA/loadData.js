
//Load Username
var username = undefined
const usernameInput   = $("#usernameInput")

sUsername = localStorage.getItem("username")

if(sUsername){
    if( sUsername.length > 3 && sUsername.length < 16 ){
        usernameInput.val(sUsername)
    }

}


// Build Chats Saved
const appendChats = $("#appendChats")
const output = $("#output")

currentChats = localStorage.getItem("customChats")

if(currentChats){
    currentChats = JSON.parse(currentChats)
    for(let e = 0; e < currentChats.length; e++){

        output.append('<div id="op'+currentChats[e]+'" class="chatAppend" style="display:block;"></div>')
            
        appendChats.append('<li class="chatSelect"> <p class="noselect">'+currentChats[e]+'</p><label class="deleteChat" id="'+currentChats[e]+'C"> x </label></li>')
    }
}

var deleteButton = false;

// Delete Chat Saved
$("#appendChats").on("click",".deleteChat",function(){

    if(username){
        deleteButton = true;

        cButton = $(this)
        chatSelected = cButton.parent()
        data = chatSelected.children().eq(0).text()

        
        currentChats = localStorage.getItem("customChats")

        isInIt = false;
        index = -1
        if(currentChats){
            currentChats = JSON.parse(currentChats)

            currentChats.splice(currentChats.indexOf(data), 1);

            currentChats = JSON.stringify(currentChats)

            localStorage.setItem("customChats", currentChats)
        }

        chatSelected.remove();

        currentChat = $("#op"+data)
        currentChat.remove();

        bodyWeb.css("display","none")
        selectOne.css("display","flex")
        chatusername.css("display","none")

        $("#opSevilla").css("display","block")

    }
    
})