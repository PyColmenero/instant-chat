var proportion = undefined;
var realDevide;

const output = $("#output")


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


    //Real Proportiion
    if(window.screen.width > window.screen.height){
        try{closeNav()} catch(e) {}
        realDevide = true;
    } else {
        realDevide = false;
    }


    //Current Proportion
    proportion = false;
    if(widthWindow >= heightWindow){
        proportion = true;

    } else {
        
        
    }

    changeOutHeight()

    

}

function changeOutHeight(){

    bodyH =     window.innerHeight

    navH =      $("nav").outerHeight()
    infoH =     $("#info").outerHeight()
    bottomDivH =    $("#bottomDiv").outerHeight()

    summatori = ((navH + infoH + bottomDivH) + 20)

    outputH = (bodyH - summatori)

    $("#all").height( bodyH )
    $("#all").css("background","red")


    //output.append( outputH+' , '+summatori + " , " + window.innerWidth)

    output.height( outputH  )
}