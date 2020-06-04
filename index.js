const path = require('path');
const express = require('express')
const app = express();

// settings
app.set('port', process.env.PORT || 3000)


// Stattic Files
app.use(express.static( path.join(__dirname) ) )

// Start Server
const server = app.listen(app.get('port'), () => {
    console.log("Server Start at port " + app.get('port'))
})

// WebSockets
    var SocketIO = require('socket.io')
    var io = SocketIO(server)

    usersConnected = new Array()
    usersConnected = []

    idConnected = new Array()
    idConnected = []

    everyChat = new Array()
    everyChat = [   { chatName: 'Sevilla',      chatAmmount: 0 },
                    { chatName: 'Malaga',       chatAmmount: 0 },
                    { chatName: 'Estudios',     chatAmmount: 0 },
                    { chatName: 'Pareja',       chatAmmount: 0 },
                    { chatName: 'Astronomia',   chatAmmount: 0 },
                    { chatName: 'Fiesta',       chatAmmount: 0 },
                    { chatName: 'Meeting',      chatAmmount: 0 },
                    { chatName: '18+',           chatAmmount: 0 }]

    idMSG = 0;
    

    io.on('connection', (socket)=> {
        idConnected.push(socket.id)
        //console.log("New connection: " + idConnected)
        
        // Validate if Usrname is Takken
            socket.on('validateUsername', (username) => {

                isInIt = isInArray(usersConnected, username)

                if(!isInIt){ 
                    try{
                        usersConnected[usersConnected.length] = {id: socket.id, usern: username, chat: ' ', line: false}
                    } catch(e)
                    {
                        usersConnected[0] = {id: socket.id, usern: username}
                    }


                    io.sockets.emit('newConnected', {   usern:username, 
                                                        con: "connected", 
                                                        chat: '',
                                                        everyUsers: usersConnected,
                                                        everyChat: everyChat})
                    //console.log(usersConnected)
                } 

                data = isInIt ? "User is Taken" : "ok";

                io.to(socket.id).emit('confirmUsernameValidation', data);
                if (io.sockets.connected[socket.id]) {
                    io.sockets.connected[socket.id].emit('confirmUsernameValidation', data);
                }

            })


        // Change Chat
            socket.on('changeChat', (data) => {

                beforeChat = '';
                currenChat = '';

                for(let index = 0; index < usersConnected.length; index++){
                    currenChat = data.chat

                    if(data.usern == usersConnected[index].usern){

                        beforeChat = usersConnected[index].chat
                        for(let index = 0; index < 8; index++){
                            if(everyChat[index].chatName == beforeChat){
                                everyChat[index].chatAmmount--;
                            }
                            if(everyChat[index].chatName == currenChat){
                                everyChat[index].chatAmmount++;
                            }
                        }
                        
                        usersConnected[index].chat = currenChat;

                        break;
                    }
                }
                //console.log(beforeChat);
                //console.log(usersConnected)
                io.sockets.emit('newConnected', {   usern: data.usern, 
                                                    con: "connected", 
                                                    chat: currenChat,
                                                    everyUsers: usersConnected,
                                                    everyChat: everyChat,
                                                    beforeChat: beforeChat,
                                                    totalDisconnect: false});
                
            })

        //Send Message
            socket.on('chatMsg', (data) => {
                idMSG++;
                io.sockets.emit('newMessage', {msgCont: data, msgID: idMSG})
            })

        //Get EveryUsers
            socket.on('everyUsers', (data) => {
                realID = undefined
                for(let e = 0; e < usersConnected.length; e++){
                    if(usersConnected[e].usern == data){
                        realID = usersConnected[e].id;
                        break;
                    }
                }
                if(realID){
                    io.sockets.connected[realID].emit('loadEveryUsers', usersConnected)
                }
                
            })

        //Send Like
            socket.on('emitLike', (data) => {
                io.sockets.emit('newLike', data)
            })

            //User Online
                socket.on('onlineUser', (data) => {
                    for(let e = 0; e < usersConnected.length; e++){
                        if(usersConnected[e].usern == data){
                            usersConnected[e].line = true
                            break;
                        }
                    }
                    socket.broadcast.emit('userFocused')
                    //console.log(usersConnected)
                })
            //User Offline
                socket.on('offlineUser', (data) => {
                    for(let e = 0; e < usersConnected.length; e++){
                        if(usersConnected[e].usern == data){
                            usersConnected[e].line = false
                            break;
                        }
                    }
                    socket.broadcast.emit('userDesFocused')
                    //console.log(usersConnected)
                })


        // Is Typing
            socket.on('chatTyping', (data) => {
                socket.broadcast.emit('userTyping', data)
            })


        // If Disconnect
            socket.on('disconnect', () => {
                index = -1;
                chat = '';
                username = '';
                for(let e = 0; e < usersConnected.length; e++){
                    if(usersConnected[e].id == socket.id){
                        index = e;
                        chat = usersConnected[e].chat
                        username = usersConnected[e].usern
                    }
                }                
                
                for(let e = 0; e < 8; e++){
                    if(everyChat[e].chatName==chat){
                        everyChat[e].chatAmmount--;
                    }
                }
                idConnected.splice(idConnected.indexOf(socket.id), 1);
                if(index != -1){
                    usersConnected.splice ( (index), 1);

                    io.sockets.emit('newConnected', {   usern: username, 
                                                        con: "", 
                                                        chat: chat,
                                                        everyUsers: usersConnected,
                                                        everyChat: everyChat,
                                                        totalDisconnect: true})
                }

                //console.log(usersConnected);
                //console.log('Disconnected: ' + idConnected);
            });
    })


function isInArray(array, currentVal){
    isInIt = false;

    for(let e = 0; e < array.length; e++){
        try{
            if(array[e].usern == currentVal) {isInIt = true;}
        } catch(e)
        {
            continue;
        }
        
    }

    return isInIt;
}







