function getUserDataFromBackend() {
    //event.preventDefault(); dont need to as no form is being submitted

    var settings = {
        "url": "http://localhost:3000/get/user/data",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + localStorage["token"]
        }
    };

    $.ajax(settings).done(function (response) {
        //console.log(response);
        $('#username').attr("placeholder", response[0].username);
    });
}




function verifyPassword() {
    var password = $("#password").val()
    var confirmPassword = $("#confirm-password").val()
    console.log(password);
    console.log(confirmPassword);
    if (password === confirmPassword) {
        return true;
    } else {
        return false
    }
}


function sendDataToBackend(event) {
    event.preventDefault();



    if (verifyPassword) {
        var username = $("#username").val();
        var password = $("#password").val();

        if (username.length == 0) {
            username = $('#username').attr("placeholder");//send the orignal username
        }

        if (password.length == 0 || password == "") {//get the original password to send back. not the most efficient way
            var settings = {
                "url": "http://localhost:3000/get/user/data",
                "method": "GET",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Bearer " + localStorage["token"]
                }
            };

            $.ajax(settings).done(function (response) {
                //console.log(response);
                password = response[0].password;
                var settings = {
                    "url": "http://localhost:3000/update/user",
                    "method": "PUT",
                    "timeout": 0,
                    "headers": {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": "Bearer " + localStorage["token"]
                    },
                    "data": {
                        "username": username,
                        "password": password
                    }
                };

                $.ajax(settings).done(function (response) {
                    console.log(response);
                    alert("Updated sucessfully")
                })
                    .fail((response) => {
                        alert("ERROR");
                    });
            });

        } else {
            var settings = {
                "url": "http://localhost:3000/update/user",
                "method": "PUT",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Bearer " + localStorage["token"]
                },
                "data": {
                    "username": username,
                    "password": password
                }
            };

            $.ajax(settings).done(function (response) {
                console.log(response);
                alert("Updated sucessfully")
            })
                .fail((response) => {
                    alert("ERROR");
                });
        }

    }


}


function registerUpdateForm() {
    $('#edit-form').submit(sendDataToBackend);
}




$(document).ready(function () {//run when document is populated
    getUserDataFromBackend();
    registerUpdateForm();

});