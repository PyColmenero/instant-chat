hambChats = $("#hambChats")
hambUsersC = $("#hambUsersC")
aside = $("aside")
black = $("#black")


boolAside1 = false;

hambChats.click(function(){
    if(boolAside1){
        closeNav()
    } else {
        openNav()
    }
    
})

black.click(function(){
    closeNav()
})

function closeNav(){
    if(boolAside1 && !proportion || !realDevide){
        boolAside1 = false;
        aside.animate({ left: ("-100vw") }, "fast");
        black.animate({ opacity: "0" }, function(){
            black.css("display","none")
        });
    }
}

function openNav(){
    if(!boolAside1 && !proportion || !realDevide){
        boolAside1 = true;
        black.css("display","block")
        aside.animate({ left: "0" }, "fast");
        black.animate({ opacity: "0.5" });
    }
}

const chatsButton = $("#chatsButton")
const usersButton = $("#usersButton")

const everyChat = $("#everyChat")
const everyUsersMovile = $("#everyUsersMovile")



chatsButton.click(function(){
    everyUsersMovile.css("display","none")
    everyChat.css("display","block")
})

usersButton.click(function(){
    everyUsersMovile.css("display","block")
    everyChat.css("display","none")
})