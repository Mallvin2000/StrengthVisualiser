


function sendDataToBackend(event) {
    event.preventDefault();
    /* console.log($("#txt_name").val(),
    $("#txt_email").val(),
    $("#txt_textArea").val()); */

    var settings = {
        "url": "http://localhost:3000/insert/feedback",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + localStorage["token"]
        },
        "data": {
            "name": $("#txt_name").val(),
            "email": $("#txt_email").val(),
            "feedback": $("#txt_textArea").val()
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        alert("Feedback sent")
    })
        .fail((response) => {
            alert("Error");
        });


}


function registerSubmitFeedbackForm() {
    $('#feedback-form').submit(sendDataToBackend);
}




$(document).ready(function () {//run when document is populated
    registerSubmitFeedbackForm();

});