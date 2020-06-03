var msg = $(".msg")

socket.on('newLike', function(data){

    //array of users
    currentArray = []

    //get comment
    msg = $(".msg")
    msg.each(function(){
        if( parseInt($(this).parent().attr("data-id")) == data.msgID){
            currenMSG = $(this)
            return false;
        }
    })
    
    //get likes
    likes = parseInt(currenMSG.children().eq(1).text())

    console.log(data.usern)
    if(data.usern == username){
        console.log("Own")
        currentLikeD = currenMSG.children().eq(2)
        status = currentLikeD.attr("data-status")

        if(status == "no"){
            currentLikeD.css("display","block")
            currentLikeD.attr("data-status", "yes")
        } else {
            currentLikeD.css("display","none")
            currentLikeD.attr("data-status", "no")
        }

    } else {
        console.log("Other")
        //get string of users
        strUsers =  currenMSG.attr("data-users")
        

            //Turn to Array
            currentStr = '';
            arrLength = 0;
            for(let e = 0; e < strUsers.length; e++){

                try{
                    if( strUsers[e] == "," ){
                        if(currentStr){
                            currentArray[arrLength] = currentStr
                            arrLength++;
                        } 
                        currentStr = '';
                    } else {
                        currentStr += strUsers[e]
                    }
                } catch(e) {}
            }


        //prove if im in
            amIIn = false;
            for(let e = 0; e < currentArray.length; e++){
                if( currentArray[e] == data.usern ){
                    currentArray[e] = undefined
                    likes--;
                    amIIn = true;
                    break;
                } 
            }

            //append me if no in it yet
            if(!amIIn){
                likes++;
                currentArray[currentArray.length] = data.usern;
            } 

        if(likes >= 1){
            //console.log("gegj")
            currenMSG.children().eq(1).css("display", "block")
        } else {
            currenMSG.children().eq(1).css("display", "none")
        }
        
        //turn again to str
        strUsers = '';
        for(let e = 0; e < currentArray.length; e++){
            try{
                if(currentArray[e]){
                    strUsers += currentArray[e] + ','
                }
            } catch(e){}
        }

        //console.log(likes)
        //console.log(amIIn)
        //console.log(currentArray)

        currenMSG.children().eq(1).text(likes)
        currenMSG.attr("data-users", strUsers)

    }
    
})

$("#output").on("dblclick",".msg", function(){

    msgID = parseInt($(this).parent().attr("data-id"))

    emitLikesMSG({usern:username, chat: chat, msgID: msgID})

})

function emitLikesMSG(data){
    socket.emit('emitLike', data)
}