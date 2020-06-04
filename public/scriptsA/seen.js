usersOnlineInChat = []
seenUSersInChat = []


$(window).on('focus', function () {
    makeMeOnline()
});

$(window).on('blur', function () {
    makeMeOffline()            
});

socket.on("userFocused", function(){
    getUsers()
})
socket.on("userDesFocused", function(){
    getUsers()
})

function makeMeOnline(){
    if(chat){
        socket.emit('onlineUser', username)
    }
}

function makeMeOffline(){
    if(chat){
        socket.emit('offlineUser', username)
    }
}


function getUsers(){
    socket.emit('everyUsers', username)
}

socket.on('loadEveryUsers', (data) => {
    getOlineUsers(data)
})



function getOlineUsers(data){
    onlineSTR = ''
    usersOnlineInChat = []

    for( let e = 0; e < data.length; e++){
        if(data[e].chat == chat){
            if(data[e].line){
                if(data[e].usern != username){
                    usersOnlineInChat[usersOnlineInChat.length] = data[e].usern
                }
            }
        }
    }
    for( let e = 0; e < usersOnlineInChat.length; e++){
        if(e == usersOnlineInChat.length-1){
            onlineSTR+= usersOnlineInChat[e]
        } else {
            onlineSTR+= usersOnlineInChat[e] +', '
        }
    }

    online.text(onlineSTR)

    if(totalLastMSG){
        getSeenUsers()
    }
}

function getSeenUsers(){
    seenSTR = ''

    index = 0;

    isiNArr = false;

    for( let e = 0; e < usersOnlineInChat.length; e++){
        for( let a = 0; a < seenUSersInChat.length; a++){
            if(seenUSersInChat[a] == usersOnlineInChat[e]){
                isiNArr = true
                break;
            }
            console.log(isiNArr)
        }
        if(!isiNArr){
            if(usersOnlineInChat[e]){
                if(usersOnlineInChat[e] != username){
                    seenUSersInChat[seenUSersInChat.length] = usersOnlineInChat[e]
                }
            }
        }
    }
    
                

    //console.log(seenUSersInChat)
    //console.log(usersOnlineInChat)


    
    for( let e = 0; e < seenUSersInChat.length; e++){
        if(e == seenUSersInChat.length-1){
            seenSTR+= seenUSersInChat[e]
        } else {
            seenSTR+= seenUSersInChat[e] +', '
        }
    }

    seen.text(seenSTR)
}