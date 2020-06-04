everyConnectes = 'Only you connected...'

ammountP = $("#ammountP")

// Users Connected MANAGER
socket.on('newConnected', function(data){
    appendOutput = $("#op"+chat)

    if(username){
        totalUsers = 0;
        everyConnectes = ''
        boolCon = true;
        for(let e = 0; e < data.everyUsers.length; e++){
            if(data.everyUsers[e].usern != username){
                if(data.everyUsers[e].chat == chat){
                    everyConnectes+='<div data-id='+data.everyUsers[e].usern+'> '+data.everyUsers[e].usern+' </div>';
                    totalUsers++;
                    if(data.everyUsers[e].chat != data.beforeChat && data.usern == data.everyUsers[e].usern){
                        appendOutput.append('<div class="adMsg"><div> <p>'+data.everyUsers[e].usern+' connected...</p> </div></div>')
                        boolCon = false;
                    }
                }
                if(data.everyUsers[e].chat != data.beforeChat && boolCon && chat == data.beforeChat){
                    appendOutput.append('<div class="adMsg"><div> <p>'+data.everyUsers[e].usern+' disconnected...</p> </div></div>')
                }
            }
        }
        if(data.totalDisconnect && data.chat == chat){
            appendOutput.append('<div class="adMsg"><div> <p>'+data.usern+' disconnected...</p> </div></div>')
        }

        if(totalUsers == 0){
            everyConnectes = 'Only you connected...'
            ammountP.text("")
        } else {
            ammountP.text(totalUsers)
            getUsers()
        }


        everyUsersMovile.html(everyConnectes)
        
        

    }
    
        for(let index = 0; index < data.everyChat.length; index++){
            currentName = data.everyChat[index].chatName;
            currentAmmount = data.everyChat[index].chatAmmount;
            
            currentLI = $("#"+currentName+"C")  

            if(currentAmmount != 0 || currentAmmount != "" || currentAmmount){
                currentLI.text(currentAmmount)
            } else {
                currentLI.text("")
            }
            
        }
    
})
