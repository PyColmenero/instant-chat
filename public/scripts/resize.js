var proportion = undefined;
var realDevide;



window.addEventListener("resize", function(event){
    
    getProportion()

    if(proportion){
        everyUser.html(everyConnectes)
    }
});

getProportion()
function getProportion(){

    widthWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    heightWindow = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    //Current Proportion
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
    
    //Real Proportiion
    if(window.screen.width > window.screen.height){
        realDevide = true;
    } else {
        realDevide = false;
    }

    //mobileChatMeasures()

}


// function mobileChatMeasures(){
//     console.log("ifgeuig")
//     console.log("1")

//     outputt = $("#output")
//     infoChat =$("#infoChat")
//     currentUsernameDiv =$("#currentUsernameDiv")
//     barInputs = $("#barInputs")

//     webH = weba.height()
//     total = ( webH - (infoChat.height()+currentUsernameDiv.height()+barInputs.height()+20 ) )
//     outputt.css("height",  total)
    

// }


