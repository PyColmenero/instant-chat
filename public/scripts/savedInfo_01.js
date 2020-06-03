var username = undefined
const usernameInput   = $("#usernameInput")

sUsername = localStorage.getItem("username")

if( sUsername.length > 3 && sUsername.length < 16 ){
    usernameInput.val(sUsername)
}