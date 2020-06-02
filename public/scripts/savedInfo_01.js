var username = undefined

sUsername = localStorage.getItem("username")

if( sUsername.length > 3 && sUsername.length < 16 ){
    username = sUsername
    usernameInput.val(sUsername)
}