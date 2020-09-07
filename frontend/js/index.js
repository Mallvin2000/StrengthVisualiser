
function isUserLoggedIn() {
    if (localStorage.getItem("token") === null) {
        return false;
    } else {
        return true;
    }
    
}


function showLoggedInVisualiser() {
    //console.log("IN");
    window.location.href = "visualiser.html";
}

function showNotLoggedInVisualiser() {
    //console.log("OUT");
    window.location.href = "visualiser-noAccount.html";
}


function checkLoginStateForVisualiser() {
        if (isUserLoggedIn()) {
            showLoggedInVisualiser()
        } else {
            showNotLoggedInVisualiser()
        }
}




function registerTryNowLink() {
    $('#try-now-link').click(checkLoginStateForVisualiser);
}


$(document).ready(function () {//run when document is populated
    registerTryNowLink();
});
