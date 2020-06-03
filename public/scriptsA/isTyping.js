everyTypings = new Array()
everyTypings = []

const typings = $("#typings")

// msgInput.on('keypress', function(){
    
    
// })

msgInput.on('keyup', function (e) {
    if (e.keyCode != 13) {
        emitTypings()
    }
});

function emitTypings(){
    //$("#logo").text(msgInput.val())

    millisecondsNow = getCurrentMilliseconds()

    socket.emit('chatTyping', {usern: username, time: millisecondsNow, chat: chat})
}

function getCurrentMilliseconds(){
    var nowDateTyping = new Date();
    var secondsTotal = 0;

    hour = nowDateTyping.getHours(),
    minutes = nowDateTyping.getMinutes(),
    seconds = nowDateTyping.getSeconds()
    mseconds = nowDateTyping.getMilliseconds()
    
    for(let e = 0; e < hour; e++){
        secondsTotal+=3600000
    }
    for(let e = 0; e < minutes; e++){
        secondsTotal+=60000
    }
    for(let e = 0; e < seconds; e++){
        secondsTotal+=1000
    }

    secondsTotal += mseconds

    return secondsTotal;
}

// WIP
socket.on('userTyping', function(data){

    userT = data.usern;
    timeT = data.time

    indexUser = -1;
    isInItT = false;
    lengthT = everyTypings.length

    for(let e = 0; e < lengthT; e++){
        try{
            if(everyTypings[e].user == userT){
                isInItT = true;
                indexUser = e;
                break;
                
            }
        } catch(e) {}
    }
    
    if(!isInItT){
        everyTypings[lengthT] = {user: userT, date: timeT, chat: data.chat}
    } else {
        everyTypings[indexUser].date += 50
    }

    proveTypings()
})

setInterval(proveTypings,500)

function proveTypings(){

    changeOutHeight()

    millisecondsNow = getCurrentMilliseconds()
    
    everyUsersTypings = []

    
    for(let e = 0; e < everyTypings.length; e++){
        try{
            if(everyTypings[e].date+2500 <= millisecondsNow){
                everyTypings[e] = undefined
                console.log("up")
                console.log(everyTypings[e].date+2500)
                console.log(millisecondsNow)
            } else {
                if(everyTypings[e].chat == chat)(
                    everyUsersTypings[everyUsersTypings.length] = everyTypings[e].user
                )
            }
        } catch(e) {}

    }

    strTypings = '';
    if(everyUsersTypings.length >= 1){
        for(let e = 0; e < everyUsersTypings.length; e++){
            try{
                if(everyUsersTypings.length-1 == e){
                    strTypings += everyUsersTypings[e]
                } else {
                    strTypings += everyUsersTypings[e] + ", "
                }
            } catch(e) {}
            
        }
        if(everyUsersTypings.length == 1){
            strTypings += " is "
        } else {
            strTypings += " are "
        }

        strTypings += " typing..."
        typings.text(strTypings)
    } else {
        typings.text("")
    }
    

}