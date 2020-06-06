var copyText = undefined
var currentMSG = undefined

const copy = $("#copy")

output.on("mouseup touchend",".msg", function(){

    clearTimeout(pressTimer);
    msgInput.focus()
    currentMSG.css("background-color","#EBEBEB")

})
output.on("mousedown touchstart",".msg", function(){

    currentMSG = $(this);
    currentMSG.css("background-color","#C0C0C0")

    pressTimer = window.setTimeout(function(event) { 

        copy.css("transform","translate(-50%, 50%)")
        msgInput.focus()

        copyStringToClipboard( currentMSG.children().eq(0).children().eq(1).text() )

    },1000);

})


function copyStringToClipboard (str) {
    // Create new element
    var el = document.createElement('textarea');

    // Set value (string to be copied)
    el.value = str;

    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);

    // Select text inside element
    el.select();

    // Copy text to clipboard
    document.execCommand('copy');

    // Remove temporary element
    document.body.removeChild(el);
    currentMSG.css("background-color","#EBEBEB")
    msgInput.focus()

    setTimeout(function(){

        copy.css("transform","translate(-50%, -150%)")

    },2000)
 }