everyConnectes = 'Only you connected...'

ammountP = $("#ammountP")

// Users Connected MANAGER
socket.on('newConnected', function(data){
    if(username){
        totalUsers = 0;
        everyConnectes = ''

        for(let e = 0; e < data.everyUsers.length; e++){

            if(data.everyUsers[e].usern != username){
                if(data.everyUsers[e].chat == chat){
                    everyConnectes+='<div data-un='+data.everyUsers[e].usern+'> '+data.everyUsers[e].usern+' </div>';
                    totalUsers++;
                }
            }
        
        }

        if(totalUsers == 0){
            everyConnectes = 'Only you connected...'
            ammountP.text("")
        } else {
            ammountP.text(totalUsers)
        }

        if(proportion){
            everyUser.html(everyConnectes)
        } else {
            everyUsersMovile.html(everyConnectes)
        }
        

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
