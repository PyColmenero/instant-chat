var proportion = undefined;
var realDevide;

var chatAppend = $(".chatAppend")
var appendOutput = $("#opSevilla");

var chat = undefined

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

    }

    changeOutHeight()

}

function changeOutHeight(){

    chatAppend = $(".chatAppend")

    bodyH =     window.innerHeight

    navH =      $("nav").outerHeight()
    infoH =     $("#info").outerHeight()
    bottomDivH =    $("#bottomDiv").outerHeight()

    summatori = ((navH + infoH + bottomDivH) + 20)

    outputH = (bodyH - summatori)

    $("#all").height( bodyH )
    var allS = document.getElementById('all');
    allS.scrollTop = 0;


    //output.append( outputH+' , '+summatori + " , " + window.innerWidth)
    if(chat){
        appendOutput = $("#op"+chat)
        appendOutput.height( outputH  )
    }
}