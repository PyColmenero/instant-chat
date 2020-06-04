everyUsersOnMyChatAndOnline = []


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
    if(chat){
        socket.emit('everyUsers', username)
    }
}

socket.on('loadEveryUsers', (data) => {
    
    getEveryUsersOnMyChatAndOnline(data)
    

})


function getEveryUsersOnMyChatAndOnline(data){
    console.log(data)

    currentSTR = ''
    everyUsersOnMyChatAndOnline = []

    for( let e = 0; e < data.length; e++){
        if(data[e].chat == chat){
            if(data[e].line){
                if(data[e].usern != username){
                    everyUsersOnMyChatAndOnline[everyUsersOnMyChatAndOnline.length] = data[e].usern
                }
            }
        }
    }
    for( let e = 0; e < everyUsersOnMyChatAndOnline.length; e++){
        if(e == everyUsersOnMyChatAndOnline.length-1){
            currentSTR+= everyUsersOnMyChatAndOnline[e]
        } else {
            currentSTR+= everyUsersOnMyChatAndOnline[e] +', '
        }
    }

    seen.text(currentSTR)
}