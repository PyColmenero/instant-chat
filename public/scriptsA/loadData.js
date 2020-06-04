var username = undefined
const usernameInput   = $("#usernameInput")

sUsername = localStorage.getItem("username")

if( sUsername.length > 3 && sUsername.length < 16 ){
    usernameInput.val(sUsername)
}



const appendChats = $("#appendChats")
const output = $("#output")

currentChats = localStorage.getItem("customChats")

if(currentChats){
    currentChats = JSON.parse(currentChats)
    for(let e = 0; e < currentChats.length; e++){

        output.append('<div id="op'+currentChats[e]+'" class="chatAppend" style="display:block;"></div>')
            
        appendChats.append('<li class="chatSelect"> <p class="noselect">'+currentChats[e]+'</p><label id="'+currentChats[e]+'C"> </label></li>')
    }
}