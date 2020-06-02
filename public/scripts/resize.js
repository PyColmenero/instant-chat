
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

}