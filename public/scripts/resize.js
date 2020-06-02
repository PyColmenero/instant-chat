var proportion = undefined;

getProportion()

window.addEventListener("resize", function(event){
    
    getProportion()

    

    if(proportion){
        everyUser.html(everyConnectes)
    } else {
        everyUsersMovile.html(everyConnectes)
    }
});

function getProportion(){

    widthWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    heightWindow = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    
    proportion = false;
    if(widthWindow >= heightWindow){
        proportion = true;
        
        try{
            everyUsersMovile.css("display","none")
            everyChat.css("display","block")
        } catch { }
        

    } else {
        
        try{
            closeNav()
        } catch { }
    }
    mobileChatMeasures()

}


function mobileChatMeasures(){
    console.log("ifgeuig")
    if(!proportion || !realDevide){

        

        nav = $("nav")
        weba = $("#web")

        weba.css("height", (window.innerHeight - nav.height()) )

        outputa = $("#output")
        infoChat =$("#infoChat")
        currentUsernameDiv =$("#currentUsernameDiv")
        barInputs = $("#barInputs")

        webH = weba.height()
        total = ( webH - (infoChat.height()+currentUsernameDiv.height()+barInputs.height()+20 ) )
        outputa.css("height",  total)
    }

}

var realDevide;
if(window.screen.width > window.screen.height){
    realDevide = true;
} else {
    realDevide = false;
}