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

    //Current Proportion
    proportion = false;
    if(widthWindow >= heightWindow){
        proportion = true;

    } else {
        
        try{
            closeNav()
        } catch { }
        
    }

    changeOutHeight()

    //Real Proportiion
    if(window.screen.width > window.screen.height){
        realDevide = true;
    } else {
        realDevide = false;
    }

}

function changeOutHeight(){

    bodyH =     window.innerHeight

    navH =      $("nav").outerHeight()
    infoH =     $("#info").outerHeight()
    inputs =    $("#inputs").outerHeight()

    summatori = ((navH + infoH + inputs) + 20)

    outputH = (bodyH - summatori)

    $("body").height( outputH + summatori )

    //output.append( outputH+' , '+summatori + " , " + window.innerWidth)

    output.height( outputH  )
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


